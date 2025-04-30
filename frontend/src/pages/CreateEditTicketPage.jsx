import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTicketById,
  createTicket,
  updateTicketById,
} from "../api/ticketService";

const CreateEditTicketPage = () => {
  const { id } = useParams(); // Get the ticket ID from URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    issue: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    title: "",
    issue: "",
  });
  const [formTouched, setFormTouched] = useState({
    title: false,
    issue: false,
  });

  // Regex for validation
  const titleRegex = /^.{5,}$/; // At least 5 characters
  const issueRegex = /^.{10,}$/; // At least 10 characters

  // Fetch ticket data if ID exists (edit mode)
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        setLoading(true);
        setError("");

        try {
          const ticket = await getTicketById(id);
          setFormData({
            title: ticket.title,
            issue: ticket.issue,
          });
        } catch (error) {
          setError("Failed to fetch ticket. Please try again.");
          console.error("Fetch ticket error:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchTicket();
    }
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Mark field as touched when user interacts with it
  const handleBlur = (field) => {
    setFormTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  // Validate fields whenever they change
  useEffect(() => {
    // Title validation
    if (formTouched.title) {
      if (!formData.title) {
        setValidationErrors((prev) => ({
          ...prev,
          title: "Title is required",
        }));
      } else if (!titleRegex.test(formData.title)) {
        setValidationErrors((prev) => ({
          ...prev,
          title: "Title must be at least 5 characters",
        }));
      } else {
        setValidationErrors((prev) => ({ ...prev, title: "" }));
      }
    }

    // Issue validation
    if (formTouched.issue) {
      if (!formData.issue) {
        setValidationErrors((prev) => ({
          ...prev,
          issue: "Issue is required",
        }));
      } else if (!issueRegex.test(formData.issue)) {
        setValidationErrors((prev) => ({
          ...prev,
          issue: "Issue must be at least 10 characters",
        }));
      } else {
        setValidationErrors((prev) => ({ ...prev, issue: "" }));
      }
    }
  }, [formData, formTouched]);

  // Check if the form is valid
  const isFormValid = () => {
    return titleRegex.test(formData.title) && issueRegex.test(formData.issue);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched to show validation errors
    setFormTouched({
      title: true,
      issue: true,
    });

    // Only proceed if form is valid
    if (!isFormValid()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const ticketData = {
        title: formData.title,
        issue: formData.issue,
        ownedBy: localStorage.getItem("userId"), // Add the logged-in user's ID
      };

      if (id) {
        // Update existing ticket
        await updateTicketById(id, ticketData);
        alert("Ticket updated successfully!");
        console.log("Ticket updated successfully");
      } else {
        // Create new ticket
        await createTicket(ticketData);
        alert("Ticket created successfully!");
        console.log("Ticket created successfully");
      }

      navigate("/my-tickets"); // Redirect to the tickets list page
    } catch (error) {
      const errorMessage = id
        ? "Failed to update ticket. Please try again."
        : "Failed to create ticket. Please try again.";
      setError(errorMessage);
      alert(errorMessage);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">
                {id ? "Edit Ticket" : "Create Ticket"}
              </h2>

              {error && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {error}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setError("")}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              {loading && !id && (
                <div className="alert alert-info" role="alert">
                  <div className="d-flex align-items-center">
                    <div
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div>Initializing form...</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formTouched.title && validationErrors.title
                        ? "is-invalid"
                        : formTouched.title && !validationErrors.title
                        ? "is-valid"
                        : ""
                    }`}
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={() => handleBlur("title")}
                    placeholder="Enter a descriptive title (min 5 characters)"
                    required
                  />
                  {formTouched.title && validationErrors.title && (
                    <div className="invalid-feedback">
                      {validationErrors.title}
                    </div>
                  )}
                  <small className="form-text text-muted">
                    A clear title helps us understand your issue quickly.
                  </small>
                </div>

                <div className="mb-3">
                  <label htmlFor="issue" className="form-label">
                    Issue Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-control ${
                      formTouched.issue && validationErrors.issue
                        ? "is-invalid"
                        : formTouched.issue && !validationErrors.issue
                        ? "is-valid"
                        : ""
                    }`}
                    id="issue"
                    rows="5"
                    value={formData.issue}
                    onChange={handleChange}
                    onBlur={() => handleBlur("issue")}
                    placeholder="Describe your issue in detail (min 10 characters)"
                    required
                  />
                  {formTouched.issue && validationErrors.issue && (
                    <div className="invalid-feedback">
                      {validationErrors.issue}
                    </div>
                  )}
                  <small className="form-text text-muted">
                    Please provide as much detail as possible about the issue
                    you're experiencing.
                  </small>
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary py-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        {id ? "Updating..." : "Creating..."}
                      </>
                    ) : id ? (
                      "Update Ticket"
                    ) : (
                      "Create Ticket"
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/my-tickets")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEditTicketPage;
