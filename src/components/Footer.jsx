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
            <li>
              <Link to="/faq" className="footer-link">
                FAQ
              </Link>
            </li>
          </ul>
        </section>

        <section className="footer-section">
          <h3 className="footer-heading">Follow Us</h3>
          <ul className="footer-links">
            <li>
              <Link to="#" className="footer-link">
                Facebook
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Instagram
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Twitter
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                LinkedIn
              </Link>
            </li>
          </ul>
        </section>

        <section className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <address className="footer-address">
            <p>
              <Link to="mailto:info@ecommerce.com" className="footer-link">
                info@ecommerce.com
              </Link>
            </p>
            <p>
              <Link to="tel:1234567890" className="footer-link">
                (123) 456-7890
              </Link>
            </p>
          </address>
        </section>

        <section className="footer-section">
          <h3 className="footer-heading">Newsletter</h3>
          <form>
            <label htmlFor="email" className="footer-label">
              Sign up for our newsletter:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              className="footer-input"
              aria-label="Enter your email"
            />
            <button type="submit" className="footer-button">
              Subscribe
            </button>
          </form>
        </section>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Ecommerce Site. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
