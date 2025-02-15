import React, { useContext } from "react";
import FavoritesContext from "../context/favorites.context";
import ShoppingCartContext from "../context/shoppingCart.context";
import "../styles/Favorites.css";
import cartIcon from "../assets/cart.png";

const FavoritesList = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const { addToCart } = useContext(ShoppingCartContext);
  return (
    <div className="favorites">
      <h1 className="title-cart">My Favorites</h1>
      <button className="homepage" onClick={() => navigate("/")}>
        Home
      </button>
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <div className="list">
          {favorites.map((product) => {
            return (
              <div className="favoriteItemCard" key={product._id}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="image-favorites"
                />
                <p>
                  <strong>{product.title}</strong>
                </p>
                <p>{product.description}</p>
                <p>
                  <strong>{product.amount}€</strong>
                </p>
                <div className="buttons-favorites-list">
                  <button
                    className="favorites-list"
                    onClick={() => addToCart(product)}
                  >
                    <img src={cartIcon} className="cart" alt="cart" />
                  </button>
                  <button
                    className="favorites-list"
                    onClick={() => removeFavorite(product._id)}
                  >
                    ❌
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default FavoritesList;
