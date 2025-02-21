import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();
  console.log("BackButton rendered");
  const location = useLocation();

  if (location.pathname === "/") return null;

  return (
    <button onClick={() => navigate(-1)} className="back-button">
      ← Back
    </button>
  );
}
