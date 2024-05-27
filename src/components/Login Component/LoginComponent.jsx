import React from "react";
import { login, saveLoggedInUser, setToken } from "../../service/authservice";
import logo from "../../assets/todolist-logo.png";
import "./loginComponent-module.css";
import { useNavigate } from "react-router-dom";
function LoginComponent() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const navigator = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Enter email");
      return;
    } else if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Enter a valid email");
      return;
    } else if (!password && password.trim() === "") {
      setErrorMessage("Enter password");
      return;
    } else if (password.length < 8) {
      setErrorMessage("Password must have length of atleast 8 characters");
      return;
    } else {
      setErrorMessage("");
    }

    const loginObject = {
      email: email,
      password: password,
    };
    console.log(loginObject);
    login(loginObject)
      .then((response) => {
        const token = response.data.tokenType + response.data.token;
        saveLoggedInUser(email);
        setToken(token);
        navigator("/today");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        console.log(error.response.data.message);
      });
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
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a className="forgotPassword" href="/forgotPassword">
              Forgot Password
            </a>
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            <div className="loginButtonContainer">
              <button type="submit" className="loginButton">
                Log in
              </button>
            </div>
          </form>
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
