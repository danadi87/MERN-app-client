import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { FavoritesProviderWrapper } from "./context/favorites.context.jsx";
import { ShoppingCartProviderWrapper } from "./context/shoppingCart.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProviderWrapper>
        <ShoppingCartProviderWrapper>
          <FavoritesProviderWrapper>
            <App />
          </FavoritesProviderWrapper>
        </ShoppingCartProviderWrapper>
      </AuthProviderWrapper>
    </Router>
  </StrictMode>
);
