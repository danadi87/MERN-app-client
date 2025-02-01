import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Navbar } from "./components/Navbar";
import { Carousel } from "./components/Carousel";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Pharmacy } from "./components/Pharmacy";
import { Supermarket } from "./components/Supermarket";
import { Restaurant } from "./components/Restaurant";

import "./App.css";

const api = axios.create({
  baseURL: "http://localhost:5005",
});

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Carousel />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Content />
              </>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/supermarket" element={<Supermarket />} />
          <Route path="/restaurant" element={<Restaurant />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
