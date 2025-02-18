import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Profile.css";
import { API_URL } from "../config/config";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const { user, setUser } = useContext(AuthContext);
  console.log("User object:", user);
  const [address, setAddress] = useState("");
  const [images, setImages] = useState(null);
  const navigate = useNavigate();
  const [deleteInput, setDeleteInput] = useState("");
  const [showDeleteInput, setShowDeleteInput] = useState(false);

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

  const handleDeleteClick = () => {
    setShowDeleteInput(true);
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (deleteInput !== "DELETE") {
      alert("You must type DELETE to confirm.");
      return;
    }
    try {
      await axios.delete(`${API_URL}/auth/users/:${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      alert("Your account has been deleted.");
      setUser(null);
      console.log("Navigating to signup...");
      navigate("/signup");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="profile-container">
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

          <button className="delete-profile" onClick={handleDeleteClick}>
            Delete my account
          </button>
          {showDeleteInput && (
            <form onSubmit={handleDeleteAccount}>
              <p>
                Type <strong>DELETE</strong> to confirm account deletion:
              </p>
              <input
                type="text"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                placeholder="Type DELETE"
              />
              <button type="submit">Delete</button>
            </form>
          )}
        </div>
      </form>
    </div>
  );
}
