import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="navbar" id="navbar-top">
      <h1>This is my Navbar</h1>
      <div className="links">
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/myprofile">My profile</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/cart">Shopping cart</Link>
      </div>
    </div>
  );
}
