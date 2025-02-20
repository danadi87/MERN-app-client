import React, { useState, useContext } from "react";
import axios from "axios";
import "../styles/Supermarket.css";
import mercadonaLogo from "../assets/mercadona.png";
import lidlLogo from "../assets/lidl.png";
import carrefourLogo from "../assets/carrefour.png";
import heartIcon from "../assets/heart.png";
import ShoppingCartContext from "../context/shoppingCart.context";
import FavoritesContext from "../context/favorites.context";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config";
import { BackButton } from "./BackButton";

export function Supermarket() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showContent, setShowContent] = useState(true);
  const { addToCart } = useContext(ShoppingCartContext);
  const { addFavorite } = useContext(FavoritesContext);
  const navigate = useNavigate();

  const fetchSupermarketProducts = (brand) => {
    axios
      .get(`${API_URL}/api/products?category=Supermarket`)
      .then((response) => {
        console.log("All products:", response.data);
        const allProducts = response.data;
        const filtered = allProducts.filter((product) => {
          console.log(`Product: ${product.title}, Brand: ${product.brand}`);
          return product.brand === brand;
        });
        console.log(`Filtered products for ${brand}:`, filtered);
        setProducts(allProducts);
        setFilteredProducts(filtered);
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

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  const handleDelete = (product) => {
    console.log("Deleted product:", product);
    setFilteredProducts((prevProducts) =>
      prevProducts.filter((p) => p._id !== product._id)
    );
  };

  const handleProductClick = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  return (
    <div className="supermarket-container">
      <BackButton />
      <h2 className="text-3xl font-bold text-center mb-8">
        Supermarket Brands
      </h2>

      <div className="logo-grid mb-8">
        <div
          className="logo-item"
          onClick={() => {
            fetchSupermarketProducts("Mercadona");
            setShowContent(false);
          }}
        >
          <img src={mercadonaLogo} alt="Mercadona" />
          <p className="logo-text">Click on the logo to see products</p>
        </div>
        <div
          className="logo-item"
          onClick={() => {
            fetchSupermarketProducts("Lidl");
            setShowContent(false);
          }}
        >
          <img src={lidlLogo} alt="Lidl" />
          <p className="logo-text">Click on the logo to see products</p>
        </div>
        <div
          className="logo-item"
          onClick={() => {
            fetchSupermarketProducts("Carrefour");
            setShowContent(false);
          }}
        >
          <img src={carrefourLogo} alt="Carrefour" />
          <p className="logo-text">Click on the logo to see products</p>
        </div>
      </div>

      {showContent && (
        <div className="brand-content text-center mb-8">
          <p className="text-lg">
            Choose your preferred supermarket brand, find everything from
            groceries to household items here at AllInOneClick!
          </p>
        </div>
      )}

      {showProducts && (
        <>
          <div className="filter-form">
            {/* Filter products form */}
            <h2 className="text-xl font-bold mt-8 mb-4">Filter Products</h2>
            <div className="filter-controls">
              <input
                type="number"
                placeholder="Min Price (>= 1)"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="filter-input"
                min="1"
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
                    onClick={() => handleProductClick(product._id)}
                  />
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p className="price">{product.amount}€</p>
                  <div className="button-container">
                    <button
                      onClick={() => addFavorite(product)}
                      className="favorite-button"
                    >
                      <img
                        src={heartIcon}
                        alt="Add to favorites"
                        className="favorite-icon"
                      />
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="cart-button"
                    >
                      🛒
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="delete-button"
                    >
                      ❌
                    </button>
                    <button
                      onClick={() => navigate(`/modify-product/${product._id}`)}
                      className="modify-button"
                    >
                      🖊
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
