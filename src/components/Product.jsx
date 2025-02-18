import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import FavoritesContext from "../context/favorites.context";
import ShoppingCartContext from "../context/shoppingCart.context";
import DeleteContext from "../context/delete.context";
import heartIcon from "../assets/heart.png";
import cartIcon from "../assets/cart.png";
import { API_URL } from "../config/config";
import { BackButton } from "./BackButton";
export function Product() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { addFavorite } = useContext(FavoritesContext);
  const { addToCart } = useContext(ShoppingCartContext);
  const { deleteProduct } = useContext(DeleteContext);

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  const getProduct = () => {
    axios
      .get(`${API_URL}/api/products/${id}`)
      .then((response) => {
        console.log("Fetched product:", response.data);
        setProduct(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    if (product) {
      console.log("Deleting product:", product);
      deleteProduct(product._id);
      setProduct(null);
    }
  };

  return (
    <>
      {product ? (
        <div className="product">
          <BackButton />
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

            <button className="delete" onClick={handleDelete}>
              ❌
            </button>
          </div>
        </div>
      ) : (
        <p>Product has been deleted.</p>
      )}
    </>
  );
}
