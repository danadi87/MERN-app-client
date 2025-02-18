import React from "react";
import { Link } from "react-router-dom";
//import "../styles/ProductAdmin.css";
import "../styles/test.css";

export function ProductAdmin() {
  return (
    <div className="product-admin-container">
      <h1>Product</h1>
      <div className="links-product">
        <Link to="/add-product" className="product-buttons">
          Add a Product
        </Link>

        <Link to="/modify-product/:productId" className="product-buttons">
          Modify a Product
        </Link>

        <Link to="/delete-product" className="product-buttons">
          Delete a Product
        </Link>
      </div>
    </div>
  );
}
