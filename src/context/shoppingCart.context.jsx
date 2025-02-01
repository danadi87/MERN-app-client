import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const ShoppingCartContext = createContext();

const API_URL = "http://localhost:5005";

export const ShoppingCartProviderWrapper = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    axios
      .post(`${API_URL}/cart`, product)
      .then((response) => {
        setCart((prevCart) => [...prevCart, response.data]);
      })
      .catch((error) => console.log(error));
  };

  const removeCart = (productId) => {
    axios
      .delete(`${API_URL}/cart/${productId}`)
      .then((response) => {
        console.log(response.data);
        const newCart = cart.filter((product) => {
          if (productId != product.id) return true;
        });
        setCart(newCart);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/cart`)
      .then((response) => setCart(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <ShoppingCartContext.Provider value={{ cart, addToCart, removeCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartContext;
