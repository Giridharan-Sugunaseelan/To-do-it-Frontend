import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Project from "../Project/Project";
import Navbar from "../Navbar/Navbar";
import "./todoContainer-module.css";

function TodoContainer() {
  const { projectTitle } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  function handleResize() {
    setIsMobile(window.innerWidth <= 900);
  }

  function handleIsOpen() {
    setIsOpen((prev) => !prev);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header isOpen={handleIsOpen} />
      <div className="todoContainer">
        {isMobile ? (
          <div className={`navBar ${isOpen ? "open" : ""}`}>
            {isOpen && <Navbar isOpen={handleIsOpen} />}
          </div>
        ) : (
          <div className="sideBar">
            <SideBar />
          </div>
        )}
        <div className="todoListContainer">
          <div className="todoList">
            <Project projectTitle={projectTitle || ""} />
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoContainer;
