import React from "react";
import "./actionButton-module.css";
function ActionButton({ buttonClass, eventHandler, buttonName, type }) {
  return (
    <>
      <button
        className={`actionButton ${buttonClass}`}
        onClick={eventHandler}
        type={type ? type : "button"}
      >
        {buttonName}
      </button>
    </>
  );
}

export default ActionButton;
