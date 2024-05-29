import React from "react";
import "./loading-module.css";
function Loading() {
  return (
    <>
      <div className="loadingContainer">
        <div className="loadingIcon">
          <iframe
            src="https://lottie.host/embed/4cc22d0f-0aa9-46ce-8938-6e5561ea7366/82s9EFtqXe.json"
            className="gif"
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default Loading;
