import React, { useState, useEffect } from "react";
import { getUserById, updateUserById } from "../api/userService";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Enhanced validation regex patterns
  const validationPatterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    firstName: /^[a-zA-Z\s-]{2,50}$/,
    lastName: /^[a-zA-Z\s-]{2,50}$/,
  };

  // Validation error messages
  const validationMessages = {
    email: "Please enter a valid email address (e.g., user@example.com).",
    firstName:
      "First name should be 2-50 characters and contain only letters, spaces, or hyphens.",
    lastName:
      "Last name should be 2-50 characters and contain only letters, spaces, or hyphens.",
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getUserById(userId);
        setUser(response);
      } catch (error) {
        setError("Failed to load profile data. Please refresh the page.");
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Validate a single field
  const validateField = (name, value) => {
    if (!validationPatterns[name]) return true;
    return validationPatterns[name].test(value);
  };

  // Handle form input changes with inline validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Clear previous errors when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  // Validate all form fields
  const validateForm = () => {
    for (const field in validationPatterns) {
      if (!validateField(field, user[field])) {
        setError(validationMessages[field]);
        return false;
      }
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError("");
    setSuccess("");

    // Validate the form
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await updateUserById(userId, user);
      setSuccess("Profile updated successfully!");
      // Show alert for success
      alert("Profile updated successfully!");
      console.log("Profile updated:", response);
    } catch (error) {
      const errorMessage = "Failed to update profile. Please try again.";
      setError(errorMessage);
      // Show alert for error
      alert(errorMessage);
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete profile
  const handleDeleteProfile = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your profile? This action cannot be undone."
      )
    ) {
      try {
        setLoading(true);
        // Call your backend API to delete the user
        // await deleteUserById(userId);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        alert("Profile deleted successfully");
        navigate("/login");
        console.log("Profile deleted successfully");
      } catch (error) {
        const errorMessage = "Failed to delete profile. Please try again.";
        setError(errorMessage);
        alert(errorMessage);
        console.error("Delete error:", error);
        setLoading(false);
      }
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Profile</h2>
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
              {success && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  {success}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSuccess("")}
                    aria-label="Close"
                  ></button>
                </div>
              )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      user.firstName &&
                      !validateField("firstName", user.firstName)
                        ? "is-invalid"
                        : ""
                    }`}
                    id="firstName"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    required
                  />
                  {user.firstName &&
                    !validateField("firstName", user.firstName) && (
                      <div className="invalid-feedback">
                        {validationMessages.firstName}
                      </div>
                    )}
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      user.lastName && !validateField("lastName", user.lastName)
                        ? "is-invalid"
                        : ""
                    }`}
                    id="lastName"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    required
                  />
                  {user.lastName &&
                    !validateField("lastName", user.lastName) && (
                      <div className="invalid-feedback">
                        {validationMessages.lastName}
                      </div>
                    )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      user.email && !validateField("email", user.email)
                        ? "is-invalid"
                        : ""
                    }`}
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                  {user.email && !validateField("email", user.email) && (
                    <div className="invalid-feedback">
                      {validationMessages.email}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </form>
              <div className="mt-3 d-flex justify-content-center">
                <button
                  className="btn btn-danger me-2"
                  onClick={handleDeleteProfile}
                  disabled={loading}
                >
                  Delete Profile
                </button>
                <button className="btn btn-secondary" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
