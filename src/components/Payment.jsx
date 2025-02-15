import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../styles/Payment.css";

const stripePromise = loadStripe(
  "pk_test_51Qs8GxCB5CgnDcFykjHzarxMbUgsSafOCgnJhs5GjW2pMgwzInDa1hk1Ka6UXIlrxajEFl50QMNaGS6n0vbynaNM00FvZFDH17"
);

export function Payment() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:5005/payment/create-payment-intent", {
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
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
}

function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      console.log("Payment successful!", result.paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}
