import React from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "../assets/not-found.png";
import { BackButton } from "./BackButton";
export const NotFound = () => {
  return (
    <div>
      <div className="notFound">
        <BackButton />
        <img src={NotFoundImage} alt="notFound" />
        <Link to="/">Homepage</Link>
      </div>
      ;
    </div>
  );
};
