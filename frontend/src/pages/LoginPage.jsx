import React, { useState, useEffect } from "react";
import { loginUser } from "../api/userService";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });
  const [formTouched, setFormTouched] = useState({
    email: false,
    password: false,
  });

  // Email validation regex - checks for standard email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Password validation regex - at least 8 characters, containing letters and numbers
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // Validate form when inputs change
  useEffect(() => {
    if (formTouched.email) {
      if (!email) {
        setValidationErrors((prev) => ({
          ...prev,
          email: "Email is required",
        }));
      } else if (!emailRegex.test(email)) {
        setValidationErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
      } else {
        setValidationErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    if (formTouched.password) {
      if (!password) {
        setValidationErrors((prev) => ({
          ...prev,
          password: "Password is required",
        }));
      } else if (!passwordRegex.test(password)) {
        setValidationErrors((prev) => ({
          ...prev,
          password:
            "Password must be at least 8 characters and contain letters and numbers",
        }));
      } else {
        setValidationErrors((prev) => ({ ...prev, password: "" }));
      }
    }
  }, [email, password, formTouched.email, formTouched.password]);

  const handleBlur = (field) => {
    setFormTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isFormValid = () => {
    return emailRegex.test(email) && passwordRegex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Set all fields as touched to show validation errors
    setFormTouched({ email: true, password: true });

    // Only proceed if form is valid
    if (!isFormValid()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await loginUser(email, password);
      console.log("Login successful:", response);

      // Assuming the API returns a token or user data that needs to be stored
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      if (response.user) {
        localStorage.setItem("userId", response.user._id);
      }

      if (response.user.role === "admin") {
        window.location.replace("/admin-dashboard");
      } else {
        window.location.replace("/");
      }
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error);
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
              <h2 className="text-center mb-4">Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
              <div className="mt-3 text-center">
                <p className="mb-0">
                  Don't have an account?{" "}
                  <Link to="/register">Register here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
