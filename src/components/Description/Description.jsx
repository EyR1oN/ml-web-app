import React from "react";
import { description } from "../../constants/constants";
import "./Description.css";

export default function Description() {
  return (
    <div>
      <p className="description-text">{description}</p>
    </div>
  );
}
