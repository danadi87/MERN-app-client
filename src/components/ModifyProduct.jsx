import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ModifyProduct.css";
import { BackButton } from "./BackButton";

export const ModifyProduct = () => {
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
    console.log("Fetching product details for modification:", productId);
    axios
      .get(`http://localhost:5005/api/products/${productId}`)
      .then((response) => {
        console.log("Product data fetched:", response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Updating product with data:", product);

    axios
      .put(`http://localhost:5005/api/products/${productId}`, product)
      .then(() => {
        console.log("Product successfully updated");
        alert("Product updated successfully!");
        navigate(`/product-details/${productId}`);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <div className="modify-product-container">
      <BackButton />
      <h2 className="modify-product-title">Modify Product</h2>

      {product.image && (
        <div className="modify-product-image-container">
          <img
            src={product.image}
            alt="Product"
            className="modify-product-image"
          />
          <p className="modify-product-label">Current Image</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="modify-product-form">
        <label className="modify-product-label">Image URL:</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          className="modify-product-input"
          required
        />

        <label className="modify-product-label">Title:</label>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          className="modify-product-input"
          required
        />

        <label className="modify-product-label">Price (€):</label>
        <input
          type="number"
          name="amount"
          value={product.amount}
          onChange={handleChange}
          className="modify-product-input"
          required
        />

        <label className="modify-product-label">Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="modify-product-input"
          required
        />

        <label className="modify-product-label">Category:</label>
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="modify-product-input"
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Pharmacy">Pharmacy</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Supermarket">Supermarket</option>
        </select>

        <button type="submit" className="modify-product-button">
          Update Product
        </button>
      </form>
    </div>
  );
};
