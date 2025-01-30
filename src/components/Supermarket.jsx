import React from "react";
import mercadonaLogo from "../assets/mercadona.png";
import lidlLogo from "../assets/lidl.png";
import carrefourLogo from "../assets/carrefour.png";

export function Supermarket() {
  return (
    <div className="supermarket-container">
      <h2 className="text-3xl font-bold text-center mb-8">
        Supermarket Brands
      </h2>
      <div className="flex justify-center gap-8">
        <img src={mercadonaLogo} alt="Mercadona" className="h-32 w-auto" />
        <img src={lidlLogo} alt="Lidl" className="h-32 w-auto" />
        <img src={carrefourLogo} alt="Carrefour" className="h-32 w-auto" />
      </div>
    </div>
  );
}
