import React from "react";
import SideBar from "../SideBar/SideBar";
import "./navbar-module.css";
function Navbar({ isOpen }) {
  return (
    <>
      <div className="navbar" onClick={isOpen}>
        <div className="nav">
          <SideBar />
        </div>
      </div>
    </>
  );
}

export default Navbar;
