import React from "react";
import ActionButton from "../Action Button/ActionButton";
import "./resetPassword-module.css";
import { checkPassword, resetPassword } from "../../service/authservice";
function ResetPassword() {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] =
    React.useState(false);

  function validate() {
    if (newPassword.length < 8) {
      setErrorMessage("Password should have atleast of 8 characters.");
      return false;
    } else if (newPassword !== confirmPassword) {
      setErrorMessage("New Password and Confirm Password should match.");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validate()) {
      let changePassword = {
        password: newPassword,
      };
      resetPassword(changePassword)
        .then((response) => {
          setErrorMessage(response.data);
        })
        .catch
        // (error) => console.log(error)
        ();
      handleCancel();
    }
  }

  function handleCancel() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrorMessage("");
  }

  function checkCurrentPassword(currentPassword) {
    setIsCurrentPasswordValid((prev) => !prev);
    if (currentPassword) {
      const pass = {
        password: currentPassword,
      };
      checkPassword(pass)
        .then((response) => {
          if (!response.data) {
            setErrorMessage("Current Password is incorrect!!!");
            if (isCurrentPasswordValid) {
              setIsCurrentPasswordValid((prev) => !prev);
            }
          } else {
            setErrorMessage("");
          }
        })
        .catch
        // (error) => console.log(error.message)
        ();
    }
  }

  return (
    <>
      <h3 className="resetPasswordTitle">Reset Password</h3>
      <hr />
      <div className="resetPasswordInputContainer">
        <form action="post" onSubmit={handleSubmit}>
          <input
            type="password"
            className="currentPassword"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            onBlur={() => checkCurrentPassword(currentPassword)}
          />
          <br />

          <input
            type="password"
            className="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <input
            type="password"
            className="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          {errorMessage && <div className="errorMessage">{errorMessage}</div>}
          <div className="resetPasswordButtonContainer">
            <ActionButton
              buttonClass="resetPasswordButton"
              buttonName="Reset Password"
              type="submit"
            />
            <ActionButton buttonName="Cancel" eventHandler={handleCancel} />
          </div>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
