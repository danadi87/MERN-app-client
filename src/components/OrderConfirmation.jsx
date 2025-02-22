import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OrderConfirmation.css";

export function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="order-confirmation-container">
      <h1>Thank you for your payment!</h1>
      <p>Your order is on its way. Estimated arrival: 30-40 minutes.</p>
      <button onClick={() => navigate("/payment-selection")}>
        Back to Payment Methods
      </button>
      <button onClick={() => navigate("/")}>Back to Homepage</button>
    </div>
  );
}
