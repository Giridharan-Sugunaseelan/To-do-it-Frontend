import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import "./todoContainer-module.css";
import Project from "../Project/Project";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
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
          <div className="navBar">
            {isOpen && <Navbar isOpen={handleIsOpen} />}
          </div>
        ) : (
          <div className="sideBar">
            <SideBar />
          </div>
        )}

        <div className="todoListContainer">
          <div className="todoList">
            <Project projectTitle={projectTitle ? projectTitle : ""} />
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoContainer;
