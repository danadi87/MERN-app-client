import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Pharmacy.css";
import cruzVerdeLogo from "../assets/cruzVerde.png";
import farmaciaAlfaLogo from "../assets/farmaciaAlfa.png";
import sanitasLogo from "../assets/sanitas.png";

export function Pharmacy() {
  const [products, setProducts] = useState([]);

  const handleBrandClick = () => {
    axios
      .get("http://localhost:5005/api/products")
      .then((response) => {
        const pharmacyProducts = response.data.filter(
          (product) => product.category === "Pharmacy"
        );
        setProducts(pharmacyProducts);
      })
      .catch((error) =>
        console.error("Error fetching pharmacy products:", error)
      );
  };

  useEffect(() => {
    handleBrandClick();
  }, []);

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-center mb-8">Pharmacy Brands</h1>
      <div className="logo-grid">
        <img src={cruzVerdeLogo} alt="Cruz Verde" onClick={handleBrandClick} />
        <img
          src={farmaciaAlfaLogo}
          alt="Farmacia Alfa"
          onClick={handleBrandClick}
        />
        <img src={sanitasLogo} alt="Sanitas" onClick={handleBrandClick} />
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p className="price">{product.amount}€</p>
          </div>
        ))}
      </div>
    </div>
  );
}
