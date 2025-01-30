import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pharmacy from "../assets/pharmacy.png";
import restaurant from "../assets/restaurant.jpg";
import supermarket from "../assets/supermarket.png";

export function Carousel() {
  const images = [
    { src: pharmacy, path: "/pharmacy" },
    { src: restaurant, path: "/restaurant" },
    { src: supermarket, path: "/supermarket" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
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
          </div>
        ))}
      </div>
    </div>
  );
}
