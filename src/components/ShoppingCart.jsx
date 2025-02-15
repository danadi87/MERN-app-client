import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartContext from "../context/shoppingCart.context";
import FavoritesContext from "../context/favorites.context";
import "../styles/ShoppingCart.css";

const ShoppingCart = () => {
  const { cart, removeCart } = useContext(ShoppingCartContext);
  const { addFavorite } = useContext(FavoritesContext);
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <h1 className="title-cart">My Shopping Cart</h1>
      <button className="homepage" onClick={() => navigate("/")}>
        Home
      </button>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="list">
          {cart.map((product) => {
            return (
              <div className="cartItem" key={product.id}>
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
                <div className="buttons-favorites-list"></div>
              </div>
            );
          })}
          <button
            className="favorites-list"
            onClick={() => addFavorite(product)}
          >
            Add to Favorites
          </button>
          <button
            className="favorites-list"
            onClick={() => removeCart(product.id)}
          >
            Remove
          </button>
          <button
            className="payment-button"
            onClick={() => navigate("/payment")}
          >
            Continue and Pay
          </button>
        </div>
      )}
    </div>
  );
};
export default ShoppingCart;
