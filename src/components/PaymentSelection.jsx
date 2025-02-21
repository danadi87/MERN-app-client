import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config";
import "../styles/PaymentSelection.css";

export function PaymentSelection() {
  const [savedPayments, setSavedPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPayments() {
      try {
        const response = await fetch(`${API_URL}/payment/list`);
        const data = await response.json();
        setSavedPayments(data);
      } catch (error) {
        console.error("Error fetching saved payments:", error);
      }
    }
    fetchPayments();
  }, []);

  return (
    <div className="payment-selection-container">
      <h1>Select a payment method</h1>
      {savedPayments.length > 0 ? (
        <div className="saved-payments">
          {savedPayments.map((payment) => (
            <div key={payment._id} className="payment-card">
              <p>Card: **** **** **** {payment.cardNumber.slice(-4)}</p>
              <button onClick={() => navigate("/order-confirmation")}>
                Use This Payment Method
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved payment methods found.</p>
      )}
      <button onClick={() => navigate("/payment")}>
        Add New Payment Method
      </button>
    </div>
  );
}
