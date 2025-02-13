import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../styles/Restaurant.css";
import mcdonaldsLogo from "../assets/mcdonalds.png";
import burgerKingLogo from "../assets/burgerKing.png";
import telepizzaLogo from "../assets/telepizza.png";
import heartIcon from "../assets/heart.png";
import FavoritesContext from "../context/favorites.context";
import ShoppingCartContext from "../context/shoppingCart.context";
import { useNavigate } from "react-router-dom";
import DeleteContext from "../context/delete.context";
import { AuthContext } from "../context/auth.context";

export function Restaurant() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showContent, setShowContent] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showProducts, setShowProducts] = useState(false);

  const { addFavorite } = useContext(FavoritesContext);
  const { addToCart } = useContext(ShoppingCartContext);
  const { deleteProduct } = useContext(DeleteContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);
  const handleBrandClick = (brand) => {
    console.log("Brand clicked, fetching products...");
    setShowContent(false);
    axios
      .get(
        `http://localhost:5005/api/products?category=Restaurant&brand=${brand}`
      )
      .then((response) => {
        console.log("Products received from API: ", response.data);
        setProducts(response.data);
        setFilteredProducts(response.data);
        setShowProducts(true);
      })
      .catch((error) => {
        console.error("Error fetching restaurant products:", error);
      });
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

  const handleDelete = (product) => {
    console.log("Deleting product:", product);
    deleteProduct(product._id); // Call the delete function from context
    // After deleting, we need to update the product list in the state
    setProducts((prevProducts) =>
      prevProducts.filter((item) => item._id !== product._id)
    );
    setFilteredProducts((prevFilteredProducts) =>
      prevFilteredProducts.filter((item) => item._id !== product._id)
    );
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const handleProductClick = (productId) => {
    navigate(`/product-details/${productId}`);
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
              filteredProducts.map((product) => (
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
                      onClick={(e) => {
                        e.stopPropagation();
                        addFavorite(product);
                      }}
                      className="favorite-button"
                    >
                      <img
                        src={heartIcon}
                        alt="Add to favorites"
                        className="favorite-icon"
                      />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="cart-button"
                    >
                      🛒
                    </button>
                    {user.admin ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(product);
                        }}
                        className="delete-button"
                      >
                        ❌
                      </button>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      <div className="go-to-cart-container text-center mt-8">
        <button
          onClick={handleGoToCart}
          className="go-to-cart-button bg-green-500 text-white px-6 py-2 rounded"
        >
          Go to Cart
        </button>
      </div>
    </div>
  );
}
