import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Restaurant.css";
import mcdonaldsLogo from "../assets/mcdonalds.png";
import burgerKingLogo from "../assets/burgerKing.png";
import telepizzaLogo from "../assets/telepizza.png";

export function Restaurant() {
  const [products, setProducts] = useState([]);
  const [showContent, setShowContent] = useState(true);

  const handleBrandClick = (brand) => {
    console.log("Brand clicked, fetching products...");
    setShowContent(false); // Hide the content when a brand is clicked
    axios
      .get(
        `http://localhost:5005/api/products?category=Restaurant&brand=${brand}`
      )
      .then((response) => {
        console.log("Products received from API: ", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant products:", error);
      });
  };

  return (
    <div className="restaurant-container">
      <h1 className="text-3xl font-bold text-center mb-8">Restaurant Brands</h1>

      <div className="logo-grid mb-8">
        <div
          className="logo-item"
          onClick={() => handleBrandClick("McDonald's")}
        >
          <img src={mcdonaldsLogo} alt="McDonald's" />
          <p className="logo-text">Click on the logo to see products</p>
        </div>
        <div
          className="logo-item"
          onClick={() => handleBrandClick("Burger King")}
        >
          <img src={burgerKingLogo} alt="Burger King" />
          <p className="logo-text">Click on the logo to see products</p>
        </div>
        <div
          className="logo-item"
          onClick={() => handleBrandClick("Telepizza")}
        >
          <img src={telepizzaLogo} alt="Telepizza" />
          <p className="logo-text">Click on the logo to see products</p>
        </div>
      </div>

      {/* Content under logos */}
      {showContent && (
        <div className="brand-content text-center mb-8">
          <p className="text-lg">
            Choose your preferred brand, anything that you like is here in
            AllInOneClick!
          </p>
          <p className="mt-4 text-md">
            We offer the best deals from top restaurant brands:
          </p>
          <ul className="list-disc mt-4 text-sm">
            <li>
              <strong>McDonald's:</strong> Enjoy fast food with burgers, fries,
              and more!
            </li>
            <li>
              <strong>Burger King:</strong> Have it your way with a variety of
              delicious burgers!
            </li>
            <li>
              <strong>Telepizza:</strong> Satisfy your pizza cravings with hot,
              fresh pizzas!
            </li>
          </ul>
        </div>
      )}

      {/* Display products after clicking a logo */}
      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="product-item">
              <img
                src={product.image}
                alt={product.title}
                className="product-img"
              />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p className="price">{product.amount}€</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
