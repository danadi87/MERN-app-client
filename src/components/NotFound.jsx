import React from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "../assets/not-found.png";

export const NotFound = () => {
  return (
    <div>
      <div className="notFound">
        <img src={NotFoundImage} alt="notFound" />
        <Link to="/">Homepage</Link>
      </div>
      ;
    </div>
  );
};
