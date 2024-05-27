import React from "react";
import "./accountDetails-module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../redux/Features/user/Actions/userActions";
import ActionIconButton from "../Action Button/ActionIconButton";
import { useNavigate } from "react-router-dom";
function AccountDetails() {
  const dispatcher = useDispatch();
  const navigator = useNavigate();
  const user = useSelector((state) => state.user.user);
  React.useEffect(() => {
    dispatcher(fetchUser());
  }, []);

  function profile() {
    navigator("/todolist/profile");
  }

  function logout(e) {
    e.stopPropagation();
    localStorage.clear();
    sessionStorage.clear();
    navigator("/todolist/login");
  }
  return (
    <>
      <div className="accountDetails" onClick={profile}>
        <div className="detailsContainer">
          {/* <img src="https://picsum.photos/200" alt="profile picture" /> */}
          <p>{user?.firstName}</p>
        </div>
        <div className="logoutButtonContainer">
          <ActionIconButton
            iconClass="fa-solid fa-arrow-right-from-bracket"
            buttonClass="logoutButton"
            eventHandler={(e) => logout(e)}
          />
        </div>
      </div>
    </>
  );
}

export default AccountDetails;
