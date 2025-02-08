import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetails.css";
import { useContext } from "react";
import ShoppingCartContext from "../context/shoppingCart.context";

export function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="product-details-container">
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
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
