import React, { useState, useContext } from "react";
import axios from "axios";
import "../styles/Pharmacy.css";
import cruzVerdeLogo from "../assets/cruzVerde.png";
import farmaciaAlfaLogo from "../assets/farmaciaAlfa.png";
import sanitasLogo from "../assets/sanitas.png";
import heartIcon from "../assets/heart.png";
import ShoppingCartContext from "../context/shoppingCart.context";
import FavoritesContext from "../context/favorites.context";
import DeleteContext from "../context/delete.context";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config";
import { BackButton } from "./BackButton";
export function Pharmacy() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showContent, setShowContent] = useState(true);
  const { addToCart } = useContext(ShoppingCartContext);
  const { favorites, addFavorite } = useContext(FavoritesContext);
  const { deleteProduct } = useContext(DeleteContext);
  const navigate = useNavigate();

  const fetchPharmacyProducts = () => {
    console.log("Fetching pharmacy products...");
    axios
      .get(`${API_URL}/api/products?category=Pharmacy`)
      .then((response) => {
        console.log("Products fetched:", response.data);
        setProducts(response.data);
        setFilteredProducts(response.data);
        setShowProducts(true);
      })
      .catch((error) => {
        console.error("Error fetching pharmacy products:", error);
      });
  };

  const handleFilter = () => {
    console.log("Filtering products...");
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

    console.log("Filtered products:", filtered);
    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    addToCart(product);
    navigate("/cart");
  };

  const handleDelete = (e, product) => {
    e.stopPropagation();
    console.log("Deleting product:", product._id);
    deleteProduct(product._id);

    setFilteredProducts((prevProducts) =>
      prevProducts.filter((p) => p._id !== product._id)
    );
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p._id !== product._id)
    );
    console.log("Updated filteredProducts:", filteredProducts);
  };

  const handleProductClick = (productId) => {
    console.log("Product clicked, navigating to:", productId);
    navigate(`/product-details/${productId}`);
  };

  return (
    <div className="container">
      <BackButton />
      <h1 className="text-3xl font-bold text-center mb-8">Pharmacy Brands</h1>

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

      {showContent && (
        <div className="brand-content text-center mb-8">
          <p className="text-lg">
            Choose your preferred pharmacy brand, find all your essential
            products here at AllInOneClick!
          </p>
        </div>
      )}

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

          <div className="product-grid">
            {filteredProducts.length === 0 ? (
              <p>No products match the filter criteria.</p>
            ) : (
              filteredProducts.map((product) => {
                const isFavorite = favorites.some(
                  (fav) => fav._id === product._id
                );
                return (
                  <div
                    key={product._id}
                    className="product-item"
                    onClick={() => handleProductClick(product._id)}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="product-img"
                    />
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <p className="price">{product.amount}€</p>
                    <div className="button-container">
                      <button
                        onClick={() => addFavorite(product)}
                        className="favorite-button"
                      >
                        {isFavorite ? (
                          <img
                            src={heartIcon}
                            alt="Added to favorites"
                            className="favorite-icon"
                          />
                        ) : (
                          <img
                            src={heartIcon}
                            alt="Add to favorites"
                            className="favorite-icon"
                          />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="cart-button"
                      >
                        🛒
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, product)}
                        className="delete-button"
                      >
                        ❌
                      </button>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          navigate(`/modify-product/${product._id}`);
                        }}
                        className="modify-button"
                      >
                        🖊
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}
