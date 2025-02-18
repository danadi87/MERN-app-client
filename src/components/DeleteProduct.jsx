import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ModifyProduct.css";
import { API_URL } from "../config/config";
import { BackButton } from "./BackButton";

export const DeleteProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(productId);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategory = (e) => setCategory(e.target.value);

  useEffect(() => {
    console.log("Fetching all products:");
    console.log("API_URL:", API_URL);

    axios
      .get(`${API_URL}/api/products`)
      .then((response) => {
        console.log("Products data fetched:", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(
        products.filter((prod) => prod.category === selectedCategory)
      );
    } else {
      setFilteredProducts([]);
    }
    setSelectedProductId("");
    setProduct(null);
  }, [selectedCategory, products]);

  useEffect(() => {
    if (selectedProductId)
      axios
        .get(`${API_URL}/api/products/${selectedProductId}`)
        .then((response) => {
          console.log("Product data fetched:", response.data);
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
  }, [selectedProductId]);

  const handleDelete = () => {
    if (!selectedProductId) {
      alert("Please select a product to delete");
      return;
    }
    console.log("Deleting product with ID:", selectedProductId);
    setSubmitting(true);

    axios
      .delete(`${API_URL}/api/products/${selectedProductId}`)
      .then((response) => {
        console.log("Product successfully deleted");
        alert("Product deleted successfully!");
        return axios.get(`${API_URL}/api/products`);
      })
      .then((response) => {
        console.log("Updated product list fetched:", response.data);

        setProducts(response.data);
        setSelectedCategory("");
        setSelectedProductId(null);
        setFilteredProducts([]);
        setProduct(null);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="modify-product-container">
      <BackButton />
      <h2 className="modify-product-title">Select product to delete:</h2>
      <form>
        <label className="label">Category</label>
        <select
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={submitting}
        >
          <option value="">Select a category</option>
          <option value="Supermarket">Supermarket</option>
          <option value="Pharmacy">Pharmacy</option>
          <option value="Restaurant">Restaurant</option>
        </select>

        <label className="label">Select Product</label>
        <select
          name="product"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          disabled={!selectedCategory}
        >
          <option value="">Select a product</option>
          {filteredProducts.map((prod) => (
            <option key={prod._id} value={prod._id}>
              {prod.title}
            </option>
          ))}
        </select>
      </form>

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

      <button
        onClick={handleDelete}
        className="delete-product-button"
        disabled={!selectedProductId || submitting}
      >
        {submitting ? "Deleting..." : "Delete Product"}
      </button>

      {!product && selectedProductId && <p>Loading product details...</p>}
    </div>
  );
};
