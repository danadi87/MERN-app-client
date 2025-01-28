import React, { useState, useEffect } from "react";
import pharmacy from "../assets/pharmacy.png";
import restaurant from "../assets/restaurant.jpg";
import supermarket from "../assets/supermarket.png";

export function Carousel() {
  const images = [pharmacy, restaurant, supermarket];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
              src={image}
              alt={`Carousel Image ${index + 1}`}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              onClick={() => (window.location.href = "/signup")}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
