import React, { useEffect } from "react";
import "./header-module.css";
import { useNavigate } from "react-router-dom";
import ActionIconButton from "../Action Button/ActionIconButton";
import logo from "../../assets/todolist-logo.png";
function Header({ isOpen }) {
  const navigator = useNavigate();

  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 900);

  function handleResize() {
    setIsMobile(window.innerWidth <= 900);
  }

  function navbarToggle(e) {
    isOpen();
    e.stopPropagation();
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="header" onClick={() => navigator("/todolist/today")}>
        {isMobile && (
          <ActionIconButton
            iconClass="fa-solid fa-bars"
            buttonClass="navButton"
            eventHandler={(e) => navbarToggle(e)}
          />
        )}
        <img src={logo} alt="logo" />
        To-Do-It
      </div>
    </>
  );
}

export default Header;
