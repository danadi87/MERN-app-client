import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import FavoritesContext from "../context/favorites.context";
import ShoppingCartContext from "../context/shoppingCart.context";
import heartIcon from "../assets/heart.png";
import cartIcon from "../assets/cart.png";

export function Product() {
  const API_URL = "http://localhost:5005";

  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const { addFavorite } = useContext(FavoritesContext);
  const { addToCart } = useContext(ShoppingCartContext);

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="product">
        <img
          src={product.image}
          alt={product.title}
          className="image-details"
        />
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>{product.category}</p>
        <p>
          <strong>{product.amount}€</strong>
        </p>
        <div className="buttons">
          <Link to={`/favorites`}>
            <button className="favorite" onClick={() => addFavorite(product)}>
              <img src={heartIcon} className="heart" alt="favorite" />
            </button>
          </Link>
          <Link to={`/cart`}>
            <button className="cart" onClick={() => addToCart(product)}>
              <img src={cartIcon} className="cart" alt="cart" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
