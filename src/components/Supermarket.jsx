import React, { useEffect, useState } from "react";
import axios from "axios";
import mercadonaLogo from "../assets/mercadona.png";
import lidlLogo from "../assets/lidl.png";
import carrefourLogo from "../assets/carrefour.png";
import "../styles/Supermarket.css";

export function Supermarket() {
  const [products, setProducts] = useState([]);
  const [initialSupermarketProducts, setInitialSupermarketProducts] = useState(
    []
  );

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/products")
      .then((response) => {
        const supermarketProducts = response.data.filter(
          (product) => product.category === "Supermarket"
        );
        setInitialSupermarketProducts(supermarketProducts);
        setProducts(supermarketProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleBrandClick = () => {
    axios
      .get("http://localhost:5005/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  return (
    <div className="supermarket-container">
      <h2 className="text-3xl font-bold text-center mb-8">
        Supermarket Brands
      </h2>
      <div className="logo-grid mb-8">
        <img src={mercadonaLogo} alt="Mercadona" onClick={handleBrandClick} />
        <img src={lidlLogo} alt="Lidl" onClick={handleBrandClick} />
        <img src={carrefourLogo} alt="Carrefour" onClick={handleBrandClick} />
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img
              src={product.image}
              alt={product.title}
              className="product-img"
            />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p className="price">{product.amount}€</p>
          </div>
        ))}
      </div>
    </div>
  );
}
