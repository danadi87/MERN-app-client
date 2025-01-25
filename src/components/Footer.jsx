import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links */}
          <section aria-label="Quick Links">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li>
                <a href="/" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-gray-400">
                  FAQ
                </a>
              </li>
            </ul>
          </section>

          {/* Follow Us */}
          <section aria-label="Follow Us">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-400"
                  aria-label="Visit our Facebook"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-400"
                  aria-label="Visit our Instagram"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-400"
                  aria-label="Visit our Twitter"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-400"
                  aria-label="Visit our LinkedIn"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </section>

          {/* Contact Us */}
          <section aria-label="Contact Information">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p>
                <a
                  href="mailto:info@ecommerce.com"
                  className="hover:text-gray-400"
                >
                  info@ecommerce.com
                </a>
              </p>
              <p>
                <a href="tel:1234567890" className="hover:text-gray-400">
                  (123) 456-7890
                </a>
              </p>
            </address>
          </section>

          {/* Newsletter */}
          <section aria-label="Newsletter Signup">
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <form>
              <label
                htmlFor="email"
                className="block text-sm mb-2 text-gray-300"
              >
                Sign up for our newsletter:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                className="p-2 text-black rounded-md w-full mb-4"
                aria-label="Enter your email"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Subscribe
              </button>
            </form>
          </section>
        </div>
      </div>

      {/*  hasta abajo */}
      <div className="text-center mt-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Ecommerce Site. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export { Footer };
