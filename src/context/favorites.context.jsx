import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FavoritesContext = createContext();

const API_URL = "http://localhost:5005";

export const FavoritesProviderWrapper = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const addFavorite = (product) => {
    if (storedToken) {
      axios
        .post(`${API_URL}/auth/favorites`, product, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setFavorites((prevFavorites) => [...prevFavorites, response.data]);
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
        .then((response) => {
          console.log(response.data);
          const newFavorites = favorites.filter((product) => {
            if (productId != product.id) return true;
          });
          setFavorites(newFavorites);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (storedToken) {
      axios
        .get(`${API_URL}/auth/favorites`)
        .then((response) => setFavorites(response.data))
        .catch((error) => console.log(error));
    }
  }, [storedToken]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
