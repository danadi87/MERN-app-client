import React, { useEffect } from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

export function Footer() {
  useEffect(() => {
    const footer = document.querySelector(".footer");
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 10) {
        footer.classList.add("show-footer");
      } else {
        footer.classList.remove("show-footer");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className="footer" id="footer-bottom">
      <div className="footer-content">
        <section className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links-horizontal">
            <li>
              <Link to="/aboutus" className="footer-link">
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
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Ecommerce Site. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
