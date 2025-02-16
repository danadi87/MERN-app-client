import React from "react";
import { Link, useNavigate } from "react-router-dom";

export function ProductAdmin() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Product</h1>
      <div className="links-product">
        <ul>
          <li>
            <Link to="/add-product">Add a Product</Link>
          </li>
          <li>
            <Link to="/modify-product/:productId">Modify a Product</Link>
          </li>
          <li>
            <Link to="/delete-product">Delete a Product</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
