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
    <div className="relative w-full h-64 sm:h-80 md:h-96">
      {/* Images */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full">
            <img
              src={image}
              alt={`Carousel Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Text overlay */}
      <div className="absolute inset-0 flex justify-center items-center text-center text-white bg-gradient-to-t from-black to-transparent">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">AllInOneClick</h1>
          <p className="text-lg sm:text-2xl italic">
            Everything you need in just one click
          </p>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-500"
            } cursor-pointer`}
          />
        ))}
      </div>
    </div>
  );
}
