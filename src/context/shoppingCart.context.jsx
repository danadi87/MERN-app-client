import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShoppingCartContext = createContext();

const API_URL = "http://localhost:5005";

export const ShoppingCartProviderWrapper = ({ children }) => {
  const [cart, setCart] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const addToCart = (product) => {
    if (storedToken) {
      axios
        .post(`${API_URL}/auth/cart`, product, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setCart((prevCart) => [...prevCart, response.data]);
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
        .then((response) => {
          console.log(response.data);
          const newCart = cart.filter((product) => {
            if (productId != product.id) return true;
          });
          setCart(newCart);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (storedToken) {
      axios
        .get(`${API_URL}/auth/cart`)
        .then((response) => setCart(response.data))
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <ShoppingCartContext.Provider value={{ cart, addToCart, removeCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartContext;
