import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

export function Profile() {
  const { user } = useContext(AuthContext);
  console.log("User object:", user);
  const [address, setAddress] = useState("");
   const [profileImage, setProfileImage] = useState(null);

  const handleAddress = (e) => setAddress(e.target.value);
  const handleImageChange = (e) => setProfileImage(e.target.files[0]); 

  
  return (
    <>
      <h1>Welcome {user.name}!</h1>
      <h2>Account details</h2>
      <form>
        <label>Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={address}
          onChange={handleAddress}
          autoComplete="off"
        ></input>
        <label>Payment method</label>
        <button className="payment">
          <Link to={"/payment"}>Add a payment method</Link>
        </button>
      </form>
    </>
  );
}
