import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AddProduct } from "./AddProduct";
import { ModifyProduct } from "./ModifyProduct";
import { DeleteProduct } from "./DeleteProduct";

export function ProductAdmin() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Product</h1>
      <div className="links-product">
        <ul>
          <li>
            <Link to={AddProduct}>Add a Product</Link>
          </li>
          <li>
            <Link to={ModifyProduct}>Modify a Product</Link>
          </li>
          <li>
            <Link to={DeleteProduct}>Delete a Product</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
