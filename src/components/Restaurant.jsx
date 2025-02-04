import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Restaurant.css";
import mcdonaldsLogo from "../assets/mcdonalds.png";
import burgerKingLogo from "../assets/burgerKing.png";
import telepizzaLogo from "../assets/telepizza.png";

export function Restaurant() {
  const [products, setProducts] = useState([]);

  const handleBrandClick = () => {
    console.log("Brand clicked, fetching products...");
    axios
      .get("http://localhost:5005/api/products")
      .then((response) => {
        console.log("Products received from API: ", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant products:", error);
      });
  };

  useEffect(() => {
    handleBrandClick();
  }, []);

  return (
    <div className="restaurant-container">
      <h1 className="text-3xl font-bold text-center mb-8">Restaurant Brands</h1>
      <div className="logo-grid mb-8">
        <img src={mcdonaldsLogo} alt="McDonald's" onClick={handleBrandClick} />
        <img
          src={burgerKingLogo}
          alt="Burger King"
          onClick={handleBrandClick}
        />
        <img src={telepizzaLogo} alt="Telepizza" onClick={handleBrandClick} />
      </div>

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
