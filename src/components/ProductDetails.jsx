import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetails.css";
import ShoppingCartContext from "../context/shoppingCart.context";
import { API_URL } from "../config/config";
import { BackButton } from "./BackButton";
export function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Fetching product details for ID:", productId);
    axios
      .get(`${API_URL}/api/products/${productId}`)
      .then((response) => {
        console.log("Product details fetched:", response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);
  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    addToCart(product);
    navigate("/cart");
  };
  const handleModifyProduct = (event) => {
    event.stopPropagation();
    console.log("Navigating to modify product page for ID:", productId);
    navigate(`/modify-product/${productId}`);
  };
  return (
    <div className="product-details-container">
      <BackButton />
      {product ? (
        <>
          <div className="product-details">
            <img
              src={product.image}
              alt={product.title}
              className="product-img"
            />
            <div className="product-info">
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p className="price">{product.amount}€</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
              <button
                onClick={handleModifyProduct}
                className="modify-product-btn"
              >
                Modify
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
