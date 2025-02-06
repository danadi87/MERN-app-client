import React, { useState } from "react";
import axios from "axios";
import "../styles/Supermarket.css";
import mercadonaLogo from "../assets/mercadona.png";
import lidlLogo from "../assets/lidl.png";
import carrefourLogo from "../assets/carrefour.png";

export function Supermarket() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showContent, setShowContent] = useState(true); // State to toggle content visibility

  const fetchSupermarketProducts = () => {
    axios
      .get("http://localhost:5005/api/products?category=Supermarket")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setShowProducts(true);
      })
      .catch((error) =>
        console.error("Error fetching supermarket products:", error)
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
    <div className="supermarket-container">
      <h2 className="text-3xl font-bold text-center mb-8">
        Supermarket Brands
      </h2>

      {/* Logo Grid with Text */}
      <div className="logo-grid mb-8">
        <div
          className="logo-item"
          onClick={() => {
            fetchSupermarketProducts();
            setShowContent(false);
          }}
        >
          <img src={mercadonaLogo} alt="Mercadona" />
          <p className="logo-text">Click on the logo to see products</p>
        </div>
        <div
          className="logo-item"
          onClick={() => {
            fetchSupermarketProducts();
            setShowContent(false);
          }}
        >
          <img src={lidlLogo} alt="Lidl" />
          <p className="logo-text">Click on the logo to see products</p>
        </div>
        <div
          className="logo-item"
          onClick={() => {
            fetchSupermarketProducts();
            setShowContent(false);
          }}
        >
          <img src={carrefourLogo} alt="Carrefour" />
          <p className="logo-text">Click on the logo to see products</p>
        </div>
      </div>

      {/* Content under the logos */}
      {showContent && (
        <div className="brand-content text-center mb-8">
          <p className="text-lg">
            Choose your preferred supermarket brand, find everything from
            groceries to household items here at AllInOneClick!
          </p>
          <p className="mt-4 text-md">
            We offer the best products from top supermarket chains:
          </p>
          <ul className="list-disc mt-4 text-sm">
            <li>
              <strong>Mercadona:</strong> The leading supermarket in Spain with
              a wide range of fresh and packaged goods.
            </li>
            <li>
              <strong>Lidl:</strong> Affordable supermarket with high-quality
              products, offering everything you need.
            </li>
            <li>
              <strong>Carrefour:</strong> A trusted name in supermarkets,
              offering a wide selection of food and non-food items.
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
