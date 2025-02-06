import React, { useState } from "react";
import axios from "axios";
import "../styles/Pharmacy.css";
import cruzVerdeLogo from "../assets/cruzVerde.png";
import farmaciaAlfaLogo from "../assets/farmaciaAlfa.png";
import sanitasLogo from "../assets/sanitas.png";

export function Pharmacy() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showContent, setShowContent] = useState(true); // State to toggle content visibility

  const fetchPharmacyProducts = () => {
    axios
      .get("http://localhost:5005/api/products?category=Pharmacy")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setShowProducts(true);
      })
      .catch((error) =>
        console.error("Error fetching pharmacy products:", error)
      );
  };

  const handleFilter = () => {
    let filtered = products;

    if (minPrice) {
      filtered = filtered.filter(
        (product) => parseFloat(product.amount) >= parseFloat(minPrice)
      );
    }

    if (maxPrice) {
      filtered = filtered.filter(
        (product) => parseFloat(product.amount) <= parseFloat(maxPrice)
      );
    }

    if (searchTerm.trim()) {
      const lowerCaseTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerCaseTerm) ||
          product.description.toLowerCase().includes(lowerCaseTerm)
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-center mb-8">Pharmacy Brands</h1>

      {/* Logo Grid with Text */}
      <div className="logo-grid">
        <div
          className="logo-item"
          onClick={() => {
            fetchPharmacyProducts();
            setShowContent(false);
          }}
        >
          <img src={cruzVerdeLogo} alt="Cruz Verde" />
          <p className="logo-text">Click on the logo to see products</p>
        </div>
        <div
          className="logo-item"
          onClick={() => {
            fetchPharmacyProducts();
            setShowContent(false);
          }}
        >
          <img src={farmaciaAlfaLogo} alt="Farmacia Alfa" />
          <p className="logo-text">Click on the logo to see products</p>
        </div>
        <div
          className="logo-item"
          onClick={() => {
            fetchPharmacyProducts();
            setShowContent(false);
          }}
        >
          <img src={sanitasLogo} alt="Sanitas" />
          <p className="logo-text">Click on the logo to see products</p>
        </div>
      </div>

      {/* Content under the logos */}
      {showContent && (
        <div className="brand-content text-center mb-8">
          <p className="text-lg">
            Choose your preferred pharmacy brand, find all your essential
            products here at AllInOneClick!
          </p>
          <p className="mt-4 text-md">
            We offer a wide range of pharmacy products from trusted brands:
          </p>
          <ul className="list-disc mt-4 text-sm">
            <li>
              <strong>Cruz Verde:</strong> A reliable pharmacy offering
              healthcare products, cosmetics, and more.
            </li>
            <li>
              <strong>Farmacia Alfa:</strong> Your trusted pharmacy for
              medication, vitamins, and wellness products.
            </li>
            <li>
              <strong>Sanitas:</strong> A pharmacy committed to your health with
              high-quality medications and products.
            </li>
          </ul>
        </div>
      )}

      {showProducts && (
        <>
          {/* Filter Form */}
          <div className="filter-form">
            <h2 className="text-xl font-bold mt-8 mb-4">Filter Products</h2>
            <div className="filter-controls">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="filter-input"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="filter-input"
              />
              <input
                type="text"
                placeholder="Search by Title or Description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input"
              />
              <button
                onClick={handleFilter}
                className="filter-button bg-blue-500 text-white px-4 py-2 rounded"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {filteredProducts.length === 0 ? (
              <p>No products match the filter criteria.</p>
            ) : (
              filteredProducts.map((product) => (
                <div key={product._id} className="product-item">
                  <img src={product.image} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p className="price">{product.amount}€</p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
