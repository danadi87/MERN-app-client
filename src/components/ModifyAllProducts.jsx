import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ModifyProduct.css"; // Assuming you have the appropriate styling

export const ModifyAllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [product, setProduct] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    image: "",
    brand: "",
  });

  useEffect(() => {
    // Fetch all products to populate the dropdown list
    axios
      .get("http://localhost:5005/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products: ", error);
      });
  }, []);

  const handleProductSelect = (event) => {
    const productId = event.target.value;
    setSelectedProductId(productId);

    // Fetch the selected product details for editing
    if (productId) {
      axios
        .get(`http://localhost:5005/api/products/${productId}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product details: ", error);
        });
    }
  };

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make sure a product is selected
    if (!selectedProductId) {
      return alert("Please select a product first.");
    }

    // PUT request to update the selected product
    axios
      .put(`http://localhost:5005/api/products/${selectedProductId}`, product)
      .then((response) => {
        console.log("Product updated:", response.data);
        alert("Product updated successfully!");
        navigate(`/product-details/${response.data._id}`); // Redirect to the product details page
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Failed to update the product.");
      });
  };

  return (
    <div className="modify-product-container">
      <BackButton />
      <h2 className="modify-product-title">Modify Product</h2>

      {/* Dropdown list to select a product */}
      <select onChange={handleProductSelect} value={selectedProductId}>
        <option value="">Select a product</option>
        {products.map((prod) => (
          <option key={prod._id} value={prod._id}>
            {prod.title}
          </option>
        ))}
      </select>

      {selectedProductId && (
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
      )}
    </div>
  );
};
