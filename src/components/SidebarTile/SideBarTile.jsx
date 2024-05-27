import React from "react";
import "./sidebarTile-module.css";
import { useDispatch } from "react-redux";
import {
  getTodayTasks,
  getUpcomingTasks,
} from "../../redux/Features/Tasks/Actions/taskActions";
import { useNavigate } from "react-router-dom";
function SideBarTile({ iconClassName, buttonName }) {
  const dispatcher = useDispatch();
  const navigator = useNavigate();
  function handleClick(buttonName) {
    buttonName = buttonName.toLowerCase();
    if (buttonName === "today" || buttonName === "upcoming") {
      dispatcher(getTodayTasks());
    }
    // else if (buttonName === "upcoming") {
    //   dispatcher(getUpcomingTasks());
    // }
    navigator(`/${buttonName}`);
  }
  return (
    <>
      <div className="buttonTitle">
        <button
          className="sideBarTileButton"
          onClick={() => handleClick(buttonName)}
        >
          <i className={iconClassName}></i>
          {buttonName}
        </button>
      </div>
    </>
  );
}

export default SideBarTile;
