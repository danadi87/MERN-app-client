import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const FavoritesContext = createContext();

const API_URL = "http://localhost:5005";

export const FavoritesProviderWrapper = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (product) => {
    if (!favorites.some((fav) => fav.id === product.id)) {
      axios
        .post(`${API_URL}/auth/favorites`, product)
        .then((response) => {
          setFavorites((prevFavorites) => [...prevFavorites, response.data]);
        })
        .catch((error) => console.log(error));
    }
  };

  const removeFavorite = (productId) => {
    axios
      .delete(`${API_URL}/auth/favorites/${productId}`)
      .then((response) => {
        console.log(response.data);
        const newFavorites = favorites.filter(
          (product) => product.id !== productId
        );
        setFavorites(newFavorites);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/auth/favorites`)
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
