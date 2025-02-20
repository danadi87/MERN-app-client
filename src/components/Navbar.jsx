import React, { useContext } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/logo.jpg";
export function Navbar() {
  const { isLoggedIn, logOutUser, isAdmin } = useContext(AuthContext);
  return (
    <div className="navbar" id="navbar-top">
      <Link to="/">
        <img src={logo} alt="logo" className="navbar-logo" />
      </Link>
      <div className="links">
        {!isLoggedIn ? (
          <>
            <Link to="/signup">Sign up</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/profile">My profile</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/cart">Shopping cart</Link>
            {isAdmin && <Link to="/product-admin">Product</Link>}
            <button onClick={logOutUser} className="logout-button">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
