import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Restaurant.css";
import mcdonaldsLogo from "../assets/mcdonalds.png";
import burgerKingLogo from "../assets/burgerKing.png";
import telepizzaLogo from "../assets/telepizza.png";

export function Restaurant() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showContent, setShowContent] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showProducts, setShowProducts] = useState(false);

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
        setFilteredProducts(response.data); // Initialize filtered products with all products
        setShowProducts(true); // Show the product grid
      })
      .catch((error) => {
        console.error("Error fetching restaurant products:", error);
      });
  };

  // Filter function for price and search term
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

      {/* Filter Form */}
      {showProducts && (
        <>
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
        </>
      )}
    </div>
  );
}
