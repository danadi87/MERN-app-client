import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ModifyProduct.css";
import { API_URL } from "../config/config";

export const DeleteProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    console.log("Fetching product details for deletion:", productId);
    axios
      .get(`${API_URL}api/products/${productId}`)
      .then((response) => {
        console.log("Product data fetched:", response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  const handleDelete = () => {
    console.log("Deleting product with ID:", productId);

    axios
      .delete(`${API_URL}api/products/${productId}`)
      .then(() => {
        console.log("Product successfully deleted");
        alert("Product deleted successfully!");
        navigate("/product-admin");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div className="modify-product-container">
      <h2 className="modify-product-title">
        Are you sure you want to delete this product?
      </h2>

      {product && (
        <div className="modify-product-image-container">
          <img
            src={product.image}
            alt="Product"
            className="modify-product-image"
          />
          <p className="modify-product-label">Current Image</p>
          <p className="modify-product-label">{product.title}</p>
        </div>
      )}

      <button onClick={handleDelete} className="delete-product-button">
        Delete Product
      </button>

      {!product && <p>Loading product details...</p>}
    </div>
  );
};
