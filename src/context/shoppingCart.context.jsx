import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config";

const ShoppingCartContext = createContext();

export const ShoppingCartProviderWrapper = ({ children }) => {
  const [cart, setCart] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    } else if (storedToken) {
      axios
        .get(`${API_URL}/auth/cart`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setCart(response.data);
          localStorage.setItem("cart", JSON.stringify(response.data));
        })
        .catch((error) => console.log(error));
    }
  }, [storedToken]);

  const addToCart = (product) => {
    if (storedToken) {
      axios
        .post(`${API_URL}/auth/cart`, product, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          const updatedCart = [...cart, response.data];
          setCart(updatedCart);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          navigate("/cart");
        })
        .catch((error) => console.log(error));
    }
  };

  const removeCart = (productId) => {
    if (storedToken) {
      axios
        .delete(`${API_URL}/auth/cart/${productId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(() => {
          const newCart = cart.filter((product) => productId !== product.id);
          setCart(newCart);
          localStorage.setItem("cart", JSON.stringify(newCart));
        })
        .catch((error) => console.log(error));
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cart, addToCart, removeCart, clearCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
export default ShoppingCartContext;
