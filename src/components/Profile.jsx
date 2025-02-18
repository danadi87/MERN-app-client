import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Profile.css";
import { API_URL } from "../config/config";
import { BackButton } from "./BackButton";
export function Profile() {
  const { user, setUser } = useContext(AuthContext);
  console.log("User object:", user);
  const [address, setAddress] = useState("");
  const [images, setImages] = useState(null);

  const handleAddress = (e) => setAddress(e.target.value);
  async function handleImages(e) {
    e.preventDefault();
    const myFormData = new FormData();
    Array.from(images).forEach((image) => {
      myFormData.append("imageUrl", image);
    });
    console.log(user);
    myFormData.append("userId", user._id);
    try {
      const { data } = await axios.post(
        `${API_URL}/api/multiple-uploads`,
        myFormData
      );
      console.log("image uploaded successfully", data);
      if (user) {
        setUser((prevUser) => ({
          ...prevUser,
          profileImage: data.user.profileImage,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <BackButton />
      <h1>Welcome {user.name}!</h1>
      <h3>Account details</h3>
      {user?.profileImage && (
        <img
          src={user.profileImage}
          alt="profile"
          style={{ width: "150px", borderRadius: "50%" }}
        />
      )}
      <form onSubmit={handleImages}>
        <div className="image-upload">
          <label>
            Add a Profile Image:
            <input
              type="file"
              name="image"
              multiple
              onChange={(e) => setImages(e.target.files)}
            />
          </label>
          <button>Submit</button>
        </div>
        <div className="profile-details">
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
        </div>
      </form>
    </div>
  );
}
