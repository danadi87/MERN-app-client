import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { FavoritesProviderWrapper } from "./context/favorites.context.jsx";
import { ShoppingCartProviderWrapper } from "./context/shoppingCart.context.jsx";
import { DeleteProviderWrapper } from "./context/delete.context.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProviderWrapper>
        <DeleteProviderWrapper>
          <ShoppingCartProviderWrapper>
            <FavoritesProviderWrapper>
              <App />
            </FavoritesProviderWrapper>
          </ShoppingCartProviderWrapper>
        </DeleteProviderWrapper>
      </AuthProviderWrapper>
    </Router>
  </StrictMode>
);
