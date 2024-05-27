import "./App.css";
import LoginComponent from "./components/Login Component/LoginComponent";
import SignupComponent from "./components/SignupComponent/SignupComponent";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import { Navigate, Route, Routes } from "react-router-dom";
import { isUserLoggedIn } from "./service/authservice";
import Profile from "./components/Profile/Profile";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ForgotResetPassword from "./components/ResetPassword/ForgotResetPassword";
// import ProfilePictureModal from "./components/Profile/ProfilePictureModal/ProfilePictureModal";
function App() {
  function AuthenticatedRoutes({ children }) {
    const isAuth = isUserLoggedIn();
    if (isAuth) {
      return children;
    }
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" Component={LoginComponent} />
        <Route path="/signup" Component={SignupComponent} />
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
        <Route path="/forgotPassword" Component={ForgotPassword} />
        <Route path="/resetPassword" Component={ForgotResetPassword} />
      </Routes>
    </>
  );
}

export default App;
