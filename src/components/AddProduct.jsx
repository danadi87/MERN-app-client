import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

const ADD_PROD = {
  category: "",
  image: "",
  title: "",
  description: "",
  amount: "",
};

export function AddProduct() {
  const [product, setProduct] = useState({ ...ADD_PROD });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const navigate = useNavigate();

  const handleCategory = (e) => setCategory(e.target.value);
  const handleImage = (e) => setImage(e.target.value);
  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleAmount = (e) => setAmount(e.target.value);

  const handleAddProductSubmit = (e) => {
    e.preventDefault();

    const requestBody = { category, image, title, description, amount };
    console.log("Sending request body", requestBody);

    setSubmitting(true);

    axios
      .post(`${API_URL}/api/products`, requestBody)
      .then(() => {
        setCategory("");
        setImage("");
        setTitle("");
        setDescription("");
        setAmount("");
        setSubmitting(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    setProduct({ ...ADD_PROD });
  }, []);

  return (
    <div className="add-product">
      <form onSubmit={handleAddProductSubmit}>
        <h1>Add a product</h1>
        <label className="label">Category</label>
        <select
          name="category"
          value={category}
          onChange={handleCategory}
          disabled={submitting}
        >
          <option value="">Select a category</option>
          <option value="Supermarket">Supermarket</option>
          <option value="Pharmacy">Pharmacy</option>
          <option value="Restaurant">Restaurant</option>
        </select>
        <label className="label">Image</label>
        <input
          type="text"
          name="image"
          id="image"
          value={image}
          onChange={handleImage}
          disabled={submitting}
          autoComplete="off"
        />
        <label className="label">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleTitle}
          disabled={submitting}
          autoComplete="off"
        />
        <label className="label">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={handleDescription}
          disabled={submitting}
          autoComplete="off"
          style={{ width: "15%", height: "50px" }}
        />
        <label className="label">Amount</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={amount}
          onChange={handleAmount}
          disabled={submitting}
          autoComplete="off"
        />
        <button type="submit">Create Product</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>Product already created? </p>
      <Link to={"/"}> </Link>
    </div>
  );
}
