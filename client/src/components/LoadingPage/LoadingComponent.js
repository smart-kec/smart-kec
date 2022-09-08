import React from "react";
import "./LoadingComponent.css";
const LoadingComponent = ({}) => {
  return (
    <div class="loader">
      <span class="dot"></span>
      <div class="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default LoadingComponent;
