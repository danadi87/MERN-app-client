import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import { BackButton } from "./BackButton";
import { Spinner } from "./Spinner";
import { API_URL } from "../config/config";

const SIGNUP_FORM = {
  email: "",
  password: "",
  name: "",
  admin: "",
  profileImage: "",
};

export function Signup() {
  const [user, setUser] = useState({ ...SIGNUP_FORM });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [profileImage, setProfileImage] = useState([]);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleAdmin = (e) => setAdmin(e.target.checked);
  const handleProfileImage = (e) => setProfileImage(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, name, admin, profileImage };
    console.log("Sending request body", requestBody);

    setSubmitting(true);

    axios
      .post(`${API_URL}/api/signup`, requestBody)
      .then(() => {
        setEmail("");
        setPassword("");
        setName("");
        setAdmin(false);
        setProfileImage([]);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  useEffect(() => {
    setUser({ ...SIGNUP_FORM });
  }, []);

  return (
    <div className="signup">
      <BackButton className="back-button" />
      <form onSubmit={handleSignupSubmit}>
        <h1>Sign in</h1>
        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
          disabled={submitting}
          autoComplete="off"
        />
        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
          disabled={submitting}
          autoComplete="off"
        />
        <label className="label">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleName}
          disabled={submitting}
          autoComplete="off"
        />
        <label className="label">Admin</label>
        <input
          type="checkbox"
          name="admin"
          id="admin"
          checked={admin}
          onChange={(e) => setAdmin(e.target.checked)}
          disabled={submitting}
          autoComplete="off"
        />

        <button
          type="submit"
          className="create-account-button"
          disabled={submitting}
        >
          {submitting ? <Spinner /> : "Create Account"}
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>Already have an account?</p>
      <Link to={"/login"} className="login-button"> Login</Link>
    </div>
  );
}
