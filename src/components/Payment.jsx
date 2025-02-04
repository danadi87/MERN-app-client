import React from "react";

export function Payment() {
  return (
    <>
      <h1>Add a card</h1>
      <p>
        This card will be set as your default payment method for your future
        orders
      </p>
      <form>
        <label>Name on card</label>
        <input type="text" placeholder="John Smith"></input>
        <label>Card number</label>
        <input type="text" placeholder="4242 4242 4242 4242"></input>
        <label>Expiration date</label>
        <input type="text" placeholder="MM/YY"></input>
        <label>CVC</label>
        <input type="number" placeholder="CVC"></input>
        <label>Country</label>
        <input type="text" placeholder="Country"></input>
        <label>Postal code</label>
        <input type="text" placeholder="10018"></input>
      </form>
      <button>Save</button>
      <p>
        By continuing, you have read and accept the Terms and Conditions and
        Privay Policy
      </p>
    </>
  );
}
