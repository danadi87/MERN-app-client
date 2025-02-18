import React, { useState } from "react";
import { API_URL } from "../config/config";

export function Payment() {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
    country: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/payment/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Payment details added successfully!");
      } else {
        alert("Error:" + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add payment details");
    }
  };
  return (
    <>
      <h1>Add a card</h1>
      <p>
        This card will be set as your default payment method for your future
        orders
      </p>
      <form onSubmit={handleSubmit}>
        <label>Name on card</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Smith"
          required
        ></input>
        <label>Card number</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="4242 4242 4242 4242"
          required
        ></input>
        <label>Expiration date</label>
        <input
          type="text"
          name="expirationDate"
          value={formData.expirationDate}
          onChange={handleChange}
          placeholder="MM/YY"
          required
        ></input>
        <label>CVC</label>
        <input
          type="text"
          name="cvc"
          value={formData.cvc}
          onChange={handleChange}
          placeholder="CVC"
          required
        ></input>
        <label>Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          required
        ></input>
        <label>Postal code</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          placeholder="10018"
          required
        ></input>
        <button type="submit">Save and pay</button>
      </form>

      <p>
        By continuing, you have read and accept the Terms and Conditions and
        Privay Policy
      </p>
    </>
  );
}
