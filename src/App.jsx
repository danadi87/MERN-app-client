import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Navbar } from "./components/Navbar";
import { Carousel } from "./components/Carousel";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile";
import Favorites from "./components/Favorites";
import ShoppingCart from "./components/ShoppingCart";
import { Pharmacy } from "./components/Pharmacy";
import { Supermarket } from "./components/Supermarket";
import { Restaurant } from "./components/Restaurant";
import { Product } from "./components/Product";
import IsPrivate from "./components/IsPrivate";

import "./App.css";
import IsAnon from "./components/IsAnon";
import { AddProduct } from "./components/AddProduct";

const api = axios.create({
  baseURL: "http://localhost:5005",
});

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Carousel />
                <Content />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <IsAnon>
                <Signup />
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                <Login />
              </IsAnon>
            }
          />
          <Route
            path="/profile"
            element={
              <IsPrivate>
                <Profile />
              </IsPrivate>
            }
          />
          <Route
            path="/favorites"
            element={
              <IsPrivate>
                <Favorites />
              </IsPrivate>
            }
          />
          <Route
            path="/cart"
            element={
              <IsPrivate>
                <ShoppingCart />
              </IsPrivate>
            }
          />
          <Route
            path="/add-product"
            element={
              <IsPrivate>
                <AddProduct />
              </IsPrivate>
            }
          />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/supermarket" element={<Supermarket />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
