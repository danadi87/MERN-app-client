// Contact.jsx
import React from "react";
import "../styles/Contact.css"; // Ensure this matches your folder structure

export function Contact() {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>
        We'd love to hear from you! You can reach us through the following
        channels:
      </p>
      <section className="contact-info">
        <div className="contact-item">
          <h2>Email</h2>
          <p>
            <a href="mailto:ecommerce@ironhack.com">ecommerce@ironhack.com</a>
          </p>
        </div>

        <div className="contact-item">
          <h2>Phone</h2>
          <p>
            <a href="tel:1234567890">(123) 456-7890</a>
          </p>
        </div>
      </section>
    </div>
  );
}
