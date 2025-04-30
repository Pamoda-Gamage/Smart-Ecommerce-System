import React from "react";
import { Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-4 mb-4 mb-md-0">
            <h3 className="mb-3 h5">Jayagama Smart e-commerce</h3>
            <p className="text-muted">The quick fox jumps over the lazy dog</p>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4 text-md-end">
            <a href="/contact" className="btn btn-primary px-4">
              Contact Us
            </a>
          </div>
        </div>

        <div className="row">
          {/* Company Info Column */}
          <div className="col-md-2 mb-4 mb-md-0">
            <h6 className="text-uppercase mb-4">Company Info</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/about" className="text-white text-decoration-none">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/carrier" className="text-white text-decoration-none">
                  Carrier
                </a>
              </li>
              <li className="mb-2">
                <a href="/hiring" className="text-white text-decoration-none">
                  We are Hiring
                </a>
              </li>
              <li className="mb-2">
                <a href="/blog" className="text-white text-decoration-none">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="col-md-2 mb-4 mb-md-0">
            <h6 className="text-uppercase mb-4">Legal</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/about" className="text-white text-decoration-none">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/carrier" className="text-white text-decoration-none">
                  Carrier
                </a>
              </li>
              <li className="mb-2">
                <a href="/hiring" className="text-white text-decoration-none">
                  We are Hiring
                </a>
              </li>
              <li className="mb-2">
                <a href="/blog" className="text-white text-decoration-none">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Features Column */}
          <div className="col-md-2 mb-4 mb-md-0">
            <h6 className="text-uppercase mb-4">Features</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="/business-marketing"
                  className="text-white text-decoration-none"
                >
                  Business Marketing
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/user-analytics"
                  className="text-white text-decoration-none"
                >
                  User Analytics
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/live-chat"
                  className="text-white text-decoration-none"
                >
                  Live Chat
                </a>
              </li>
              <li className="mb-2">
                <a href="/support" className="text-white text-decoration-none">
                  Unlimited Support
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="col-md-2 mb-4 mb-md-0">
            <h6 className="text-uppercase mb-4">Resources</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="/ios-android"
                  className="text-white text-decoration-none"
                >
                  iOS & Android
                </a>
              </li>
              <li className="mb-2">
                <a href="/demo" className="text-white text-decoration-none">
                  Watch a Demo
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/customers"
                  className="text-white text-decoration-none"
                >
                  Customers
                </a>
              </li>
              <li className="mb-2">
                <a href="/api" className="text-white text-decoration-none">
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Get In Touch Column */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h6 className="text-uppercase mb-4">Get In Touch</h6>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center">
                <Phone size={18} className="me-2" />
                <span>(480) 555-0103</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <MapPin size={18} className="me-2" />
                <span>4517 Washington Ave</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <Mail size={18} className="me-2" />
                <span>debra.holt@example.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4 bg-secondary" />

        <div className="row align-items-center">
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="mb-0">© 2025 Jayagama. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-inline-flex gap-3">
              <a href="https://facebook.com" className="text-white">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-white">
                <Twitter size={24} />
              </a>
              <a href="mailto:contact@example.com" className="text-white">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
