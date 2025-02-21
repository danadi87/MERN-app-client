import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductAdmin.css";
export function ProductAdmin() {
  return (
    <div className="product-admin-container">
      <BackButton />
      <h1>Product</h1>
      <div className="links-product">
        <Link to="/add-product" className="product-buttons">
          Add a Product
        </Link>
        <Link to="/modify-all-products" className="product-buttons">
          Modify a Product
        </Link>
        <Link to="/delete-product" className="product-buttons">
          Delete a Product
        </Link>
      </div>
    </div>
  );
}
