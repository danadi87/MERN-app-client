import React, { useContext } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <div className="navbar" id="navbar-top">
      <Link to="/">
        <h3>AllInOneClick</h3>
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
            <Link to="/addproduct">Add a product</Link>
            <button onClick={logOutUser} className="logout-button">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
