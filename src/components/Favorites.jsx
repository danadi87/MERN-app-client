import React, { useContext } from "react";
import FavoritesContext from "../context/favorites.context";
import ShoppingCartContext from "../context/shoppingCart.context";

const FavoritesList = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const { addToCart } = useContext(ShoppingCartContext);

  return (
    <div className="favorites">
      <h1 className="title-cart">My Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <div className="list">
          {favorites.map((product) => {
            return (
              <div className="favoriteItemCard" key={product.id}>
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
                    Add to Cart
                  </button>
                  <button
                    className="favorites-list"
                    onClick={() => removeFavorite(product.id)}
                  >
                    Remove
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
