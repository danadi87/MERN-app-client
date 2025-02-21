import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/config";

export const ProductContext = createContext();

export const ProductProviderWrapper = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/products`).then((response) => {
      setProducts(response.data);
    });
  }, []);

  const refreshProducts = () => {
    axios.get(`${API_URL}/api/products`).then((response) => {
      setProducts(response.data);
    });
  };

  return (
    <ProductContext.Provider value={{ products, refreshProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
