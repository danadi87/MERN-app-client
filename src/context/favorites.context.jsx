import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const FavoritesContext = createContext();

const API_URL = "http://localhost:5005";

export const FavoritesProviderWrapper = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (product) => {
    axios
      .post(`${API_URL}/favorites`, product)
      .then((response) => {
        setFavorites((prevFavorites) => [...prevFavorites, response.data]);
      })
      .catch((error) => console.log(error));
  };

  const removeFavorite = (productId) => {
    axios
      .delete(`${API_URL}/favorites/${productId}`)
      .then((response) => {
        console.log(response.data);
        const newFavorites = favorites.filter((product) => {
          if (productId != product.id) return true;
        });
        setFavorites(newFavorites);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/favorites`)
      .then((response) => setFavorites(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
