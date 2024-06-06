import "./App.css";
import LoginComponent from "./components/Login Component/LoginComponent";
import SignupComponent from "./components/SignupComponent/SignupComponent";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import { Navigate, Route, Routes } from "react-router-dom";
import { isUserLoggedIn, keepAlive } from "./service/authservice";
import Profile from "./components/Profile/Profile";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ForgotResetPassword from "./components/ResetPassword/ForgotResetPassword";
import { useEffect } from "react";
function App() {
  function AuthenticatedRoutes({ children }) {
    const isAuth = isUserLoggedIn();
    if (isAuth) {
      return children;
    }
    return <Navigate to="/login" />;
  }

  const sendKeepAliveRequest = () => {
    keepAlive("/auth/alive")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to keep the service alive");
        }
        setTimeout(sendKeepAliveRequest, 180000);
      })
      .catch((error) => {
        console.error("Error keeping service alive:", error.message);
        setTimeout(sendKeepAliveRequest, 180000);
      });
  };

  useEffect(() => {
    sendKeepAliveRequest();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route
          path="/:projectTitle"
          element={
            <AuthenticatedRoutes>
              <TodoContainer />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthenticatedRoutes>
              <Profile />
            </AuthenticatedRoutes>
          }
        />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ForgotResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
