import React, { createContext, useState } from "react";
import axios from "axios";

const DeleteContext = createContext();

export function DeleteProviderWrapper({ children }) {
  const [products, setProducts] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const API_URL = "http://localhost:5005";

  // Inside delete.context.jsx
  const deleteProduct = (productId) => {
    console.log("Deleting product with id:", productId);
    if (storedToken) {
      axios
        .delete(`${API_URL}/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(() => {
          const updatedProducts = products.filter(
            (product) => product._id !== productId
          );
          setProducts(updatedProducts);
          localStorage.setItem("products", JSON.stringify(updatedProducts));
          console.log("Product deleted, updated products:", updatedProducts);
        })
        .catch((error) => {
          console.log("Error deleting product:", error);
        });
    }
  };

  return (
    <DeleteContext.Provider value={{ deleteProduct, products }}>
      {children}
    </DeleteContext.Provider>
  );
}

export default DeleteContext;
