import React, { useState, useEffect } from "react";
import axios from "axios";

const Content = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-12 px-4">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Featured Products
      </h2>

      {/* Loading :)  */}
      {loading && (
        <div className="text-center">
          <p className="text-lg">Loading products...</p>
        </div>
      )}

      {/* mensaje de error */}
      {error && (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      )}

      {/* Show products or fallback for empty data */}
      {!loading && !error && (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-lg text-gray-600">${product.price}</p>
                    <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>No products available at the moment.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { Content };
