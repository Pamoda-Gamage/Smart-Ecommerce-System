import React, { useState, useEffect } from "react";
import { User, Ticket, LogIn, ShoppingCart } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if userId exists in localStorage
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);

    // Bootstrap requires these scripts for dropdowns and other components
    const loadBootstrapJS = async () => {
      if (typeof document !== "undefined") {
        // This is a safer way to use Bootstrap JS in React
        await import("bootstrap/dist/js/bootstrap.bundle.min.js");
      }
    };

    loadBootstrapJS();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand fw-bold" href="/">
          Jayagama
        </a>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Main navigation links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="shopDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Shop
              </a>
              <ul className="dropdown-menu" aria-labelledby="shopDropdown">
                <li>
                  <a className="dropdown-item" href="/category1">
                    Category 1
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/category2">
                    Category 2
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/category3">
                    Category 3
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/blog">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/pages">
                Pages
              </a>
            </li>
          </ul>

          {/* Auth & Cart Section */}
          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <div className="d-flex me-3">
                <a
                  className="nav-link d-flex align-items-center me-3"
                  href="/profile"
                >
                  <User size={18} className="me-1" />
                  <span>Profile</span>
                </a>
                <a
                  className="nav-link d-flex align-items-center"
                  href="/my-tickets"
                >
                  <Ticket size={18} className="me-1" />
                  <span>My Tickets</span>
                </a>
              </div>
            ) : (
              <a
                className="nav-link d-flex align-items-center me-3"
                href="/login"
              >
                <LogIn size={18} className="me-1" />
                <span>Login / Register</span>
              </a>
            )}

            {/* Cart */}
            <a className="nav-link position-relative" href="/cart">
              <ShoppingCart size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                1<span className="visually-hidden">items in cart</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
