import React from "react";
import { forgotPassword } from "../../service/authservice";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/todolist-logo.png";
function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const navigator = useNavigate();

  function validate() {
    if (!email) {
      setErrorMessage("Enter Email");
    } else if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Enter Valid Email");
    } else {
      setErrorMessage("");
      return true;
    }
  }

  function handleCancel() {
    setEmail("");
    setErrorMessage("");
    navigator("/todolist/login");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      forgotPassword(email)
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
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {email && errorMessage && (
              <p className="errorMessage" style={{ padding: "0", margin: "0" }}>
                {errorMessage}
              </p>
            )}
            <div className="loginButtonContainer">
              <button type="submit" className="loginButton">
                Send Reset Password Link
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

export default ForgotPassword;
