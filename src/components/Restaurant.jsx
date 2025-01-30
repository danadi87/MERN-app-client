import React from "react";
import "../styles/Restaurant.css";
import mcdonaldsLogo from "../assets/mcdonalds.png";
import burgerKingLogo from "../assets/burgerKing.png";
import telepizzaLogo from "../assets/telepizza.png";

export function Restaurant() {
  return (
    <div className="restaurant-container">
      <h1>Restaurant Brands</h1>
      <div className="logo-grid">
        <img src={mcdonaldsLogo} alt="McDonald's" />
        <img src={burgerKingLogo} alt="Burger King" />
        <img src={telepizzaLogo} alt="Telepizza" />
      </div>
    </div>
  );
}
