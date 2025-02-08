import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FavoritesContext = createContext();

const API_URL = "http://localhost:5005";

export const FavoritesProviderWrapper = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    } else if (storedToken) {
      axios
        .get(`${API_URL}/auth/favorites`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setFavorites(response.data);
          localStorage.setItem("favorites", JSON.stringify(response.data));
        })
        .catch((error) => console.log(error));
    }
  }, [storedToken]);

  const addFavorite = (product) => {
    if (storedToken) {
      axios
        .post(`${API_URL}/auth/favorites`, product, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          const updatedFavorites = [...favorites, response.data];
          setFavorites(updatedFavorites);
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          navigate("/favorites");
        })
        .catch((error) => console.log(error));
    }
  };

  const removeFavorite = (productId) => {
    if (storedToken) {
      axios
        .delete(`${API_URL}/auth/favorites/${productId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(() => {
          const newFavorites = favorites.filter(
            (product) => productId !== product.id
          );
          setFavorites(newFavorites);
          localStorage.setItem("favorites", JSON.stringify(newFavorites));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
