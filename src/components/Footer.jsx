import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer" id="footer-bottom">
      <div className="footer-content">
        <section className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <Link to="/" className="footer-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="footer-link">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="footer-link">
                Contact
              </Link>
            </li>
          </ul>
        </section>

        <section className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <address className="footer-address">
            <p>
              <Link to="mailto:ecommerce@ironhack.com" className="footer-link">
                ecommerce@ironhack.com
              </Link>
            </p>
            <p>
              <Link to="tel:1234567890" className="footer-link">
                (123) 456-7890
              </Link>
            </p>
          </address>
        </section>
      </div>
    </footer>
  );
}
