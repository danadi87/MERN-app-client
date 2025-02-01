import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pharmacy from "../assets/pharmacy.png";
import restaurant from "../assets/restaurant.jpg";
import supermarket from "../assets/supermarket.png";

export function Carousel() {
  const images = [
    { src: pharmacy, path: "/pharmacy", title: "Pharmacy" },
    { src: restaurant, path: "/restaurant", title: "Restaurant" },
    { src: supermarket, path: "/supermarket", title: "Supermarket" },
  ];

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("userToken");

  const handleImageClick = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <div style={{ backgroundColor: "#ffecd1", paddingBottom: "40px" }}>
      {/* "What is AllInOneClick?" text */}
      <div
        className="hero-section"
        style={{ textAlign: "center", padding: "20px" }}
      >
        <h2 className="section-title">What is AllInOneClick?</h2>
        <p className="section-text">
          AllInOneClick is your go-to platform for ordering products from your
          favorite supermarkets, pharmacies, and restaurants—all without leaving
          the comfort of your home.
        </p>
      </div>

      {/* Carousel images */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          {images.map((image, index) => (
            <div key={index} style={{ flex: "0 0 auto", width: "33%" }}>
              {/* Title above each image */}
              <h3
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  color: "black",
                }}
              >
                {image.title}
              </h3>
              <img
                src={image.src}
                alt={`Carousel Image ${index + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => handleImageClick(image.path)}
              />
              {/* Click Here Text */}
              <p style={{ textAlign: "center", color: "#555" }}>
                Click here to choose the store
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
