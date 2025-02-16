import React, { useState, useEffect } from "react";
import "../styles/Payment.css";
import { API_URL } from "../config/config";

export function Payment() {
  useEffect(() => {
    const button = document.querySelector("button");
    button.addEventListener("click", () => {
      fetch("checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify(),
      })
        .then((res) => {
          if (res.ok) return res.json();
          return res.json().then((json) => Promise.reject(json));
        })
        .then(({ url }) => {
          console.log(url);
          //window.location = url;
        })
        .catch((e) => {
          console.error(e.error);
        });
    });

    fetch(`${API_URL}/payment/create-payment-intent"`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 5000, currency: "usd" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Received clientSecret:", data.clientSecret);
        setClientSecret(data.clientSecret);
      })
      .catch((error) => console.error("Error fetching clientSecret:", error));
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}
