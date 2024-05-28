import React from "react";
import "./signupComponent-module.css";
import { useDispatch } from "react-redux";
import logo from "../../assets/todolist-logo.png";
import { register } from "../../service/authservice";
import { useNavigate } from "react-router-dom";

function SignupComponent() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const navigator = useNavigate();

  function validation() {
    if (!firstName) {
      setErrorMessage("Enter First Name");
      return false;
    } else if (!lastName) {
      setErrorMessage("Enter Last Name");
      return false;
    } else if (!email) {
      setErrorMessage("Enter email");
      return false;
    } else if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Enter a valid email");
      return false;
    } else if (!password) {
      setErrorMessage("Enter password");
      return false;
    } else if (!confirmPassword) {
      setErrorMessage("Confirm password");
      return false;
    } else if (password.length < 8) {
      setErrorMessage("Password must have length of at least 8 characters");
      return false;
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords should match");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validation()) {
      const user = {
        id: null,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      register(user)
        .then((response) => {
          console.log(response);
          navigator("/login");
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
        });
    }
  }

  return (
    <div className="signupContainer">
      <div className="signupSection">
        <div className="logo">
          <img src={logo} alt="TodoList Logo" />
          To-Do-It
        </div>
        <form className="inputContainer" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          <div className="signupButtonContainer">
            <button type="submit" className="signupButton">
              Sign up
            </button>
          </div>
        </form>
        <p>
          Already have an account?
          <a href="/login"> Log in</a>
        </p>
      </div>
    </div>
  );
}

export default SignupComponent;
