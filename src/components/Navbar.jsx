import React, { useContext, useState } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/logo.jpg";
import { FaBars, FaTimes } from "react-icons/fa";

export function Navbar() {
  const { isLoggedIn, logOutUser, isAdmin } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar" id="navbar-top">
      <Link to="/" onClick={() => setMenuOpen(false)}>
        <img src={logo} alt="logo" className="navbar-logo" />
      </Link>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`links ${menuOpen ? "active" : ""}`}>
        {!isLoggedIn ? (
          <>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>
              Sign up
            </Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              My profile
            </Link>
            <Link to="/favorites" onClick={() => setMenuOpen(false)}>
              Favorites
            </Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              Shopping cart
            </Link>
            {isAdmin && (
              <Link to="/product-admin" onClick={() => setMenuOpen(false)}>
                Product
              </Link>
            )}
            <button
              onClick={() => {
                logOutUser();
                setMenuOpen(false);
              }}
              className="logout-button"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
