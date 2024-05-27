import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { forgotResetPassword } from "../../service/authservice";
import logo from "../../assets/todolist-logo.png";
function ForgotResetPassword() {
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const [searchParam, setSearchParam] = useSearchParams();
  const token = searchParam.get("token");

  const navigator = useNavigate();

  function validate() {
    if (!newPassword) {
      setErrorMessage("Enter New Password");
    } else if (newPassword.length < 8) {
      setErrorMessage("Password must have atleast 8 characters");
    } else if (!confirmPassword || newPassword !== confirmPassword) {
      setErrorMessage("Both Passwords should match!");
    } else {
      setErrorMessage("");
      return true;
    }
  }

  function handleCancel() {
    setNewPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    navigator("/todolist/login");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      let changedPassword = {
        password: newPassword,
      };
      forgotResetPassword(token, changedPassword)
        .then((response) => {
          setErrorMessage(response.data);
          setTimeout(() => {
            navigator("/todolist/login");
          }, 3000);
        })
        .catch((error) => setErrorMessage(error.response.data.message));
    }
  }
  return (
    <>
      <div className="loginContainer">
        <div className="loginSection">
          <div className="logo">
            <img src={logo} alt="TodoList Logo" />
            To-Do-It
          </div>
          <form className="inputContainer" onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errorMessage && (
              <p className="errorMessage" style={{ padding: "0", margin: "0" }}>
                {errorMessage}
              </p>
            )}
            <div className="loginButtonContainer">
              <button type="submit" className="loginButton">
                Reset Password
              </button>
              <button onClick={handleCancel} className="cancelButton">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotResetPassword;
