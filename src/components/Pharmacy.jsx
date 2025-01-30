import React from "react";
import "../styles/Pharmacy.css";
import cruzVerdeLogo from "../assets/cruzVerde.png";
import farmaciaAlfaLogo from "../assets/farmaciaAlfa.png";
import sanitasLogo from "../assets/sanitas.png";

export function Pharmacy() {
  return (
    <div className="pharmacy-container">
      <h1>Pharmacy Brands</h1>
      <div className="logo-grid">
        <img src={cruzVerdeLogo} alt="Cruz Verde" />
        <img src={farmaciaAlfaLogo} alt="Farmacia Alfa" />
        <img src={sanitasLogo} alt="Sanitas" />
      </div>
    </div>
  );
}
