import React, { useState, useEffect } from "react";
import { registerUser } from "../api/userService";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formTouched, setFormTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  // Regular expressions for validation
  const nameRegex = /^[A-Za-z]{2,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^.{8,}$/; // At least 6 characters

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
    // First name validation
    if (formTouched.firstName) {
      if (!formData.firstName) {
        setValidationErrors((prev) => ({
          ...prev,
          firstName: "First name is required",
        }));
      } else if (!nameRegex.test(formData.firstName)) {
        setValidationErrors((prev) => ({
          ...prev,
          firstName:
            "First name must contain at least 2 letters and no numbers or special characters",
        }));
      } else {
        setValidationErrors((prev) => ({ ...prev, firstName: "" }));
      }
    }

    // Last name validation
    if (formTouched.lastName) {
      if (!formData.lastName) {
        setValidationErrors((prev) => ({
          ...prev,
          lastName: "Last name is required",
        }));
      } else if (!nameRegex.test(formData.lastName)) {
        setValidationErrors((prev) => ({
          ...prev,
          lastName:
            "Last name must contain at least 2 letters and no numbers or special characters",
        }));
      } else {
        setValidationErrors((prev) => ({ ...prev, lastName: "" }));
      }
    }

    // Email validation
    if (formTouched.email) {
      if (!formData.email) {
        setValidationErrors((prev) => ({
          ...prev,
          email: "Email is required",
        }));
      } else if (!emailRegex.test(formData.email)) {
        setValidationErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
      } else {
        setValidationErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    // Password validation
    if (formTouched.password) {
      if (!formData.password) {
        setValidationErrors((prev) => ({
          ...prev,
          password: "Password is required",
        }));
      } else if (!passwordRegex.test(formData.password)) {
        setValidationErrors((prev) => ({
          ...prev,
          password: "Password must be at least 8 characters",
        }));
      } else {
        setValidationErrors((prev) => ({ ...prev, password: "" }));
      }
    }
  }, [formData, formTouched]);

  // Check if the form is valid
  const isFormValid = () => {
    return (
      nameRegex.test(formData.firstName) &&
      nameRegex.test(formData.lastName) &&
      emailRegex.test(formData.email) &&
      passwordRegex.test(formData.password)
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Mark all fields as touched to show validation errors
    setFormTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    });

    // Only proceed if form is valid
    if (!isFormValid()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await registerUser(formData);
      console.log("Registration successful:", response);
      navigate("/login"); // Redirect to login page after registration
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Register</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formTouched.firstName && validationErrors.firstName
                        ? "is-invalid"
                        : ""
                    }`}
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={() => handleBlur("firstName")}
                    required
                  />
                  {formTouched.firstName && validationErrors.firstName && (
                    <div className="invalid-feedback">
                      {validationErrors.firstName}
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
                      formTouched.lastName && validationErrors.lastName
                        ? "is-invalid"
                        : ""
                    }`}
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={() => handleBlur("lastName")}
                    required
                  />
                  {formTouched.lastName && validationErrors.lastName && (
                    <div className="invalid-feedback">
                      {validationErrors.lastName}
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
                      formTouched.email && validationErrors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    required
                  />
                  {formTouched.email && validationErrors.email && (
                    <div className="invalid-feedback">
                      {validationErrors.email}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      formTouched.password && validationErrors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur("password")}
                    required
                  />
                  {formTouched.password && validationErrors.password && (
                    <div className="invalid-feedback">
                      {validationErrors.password}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
              </form>
              <div className="mt-3 text-center">
                <p className="mb-0">
                  Already have an account? <Link to="/login">Login here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
