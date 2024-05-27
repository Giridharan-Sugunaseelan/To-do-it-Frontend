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
    return <Navigate to="/todolist/login" />;
  }
  return (
    <>
      <Routes>
        <Route path="/todolist/login" Component={LoginComponent} />
        <Route path="/todolist/signup" Component={SignupComponent} />
        <Route
          path="/todolist/:projectTitle"
          element={
            <AuthenticatedRoutes>
              <TodoContainer />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/todolist/profile"
          element={
            <AuthenticatedRoutes>
              <Profile />
            </AuthenticatedRoutes>
          }
        />
        <Route path="/todolist/forgotPassword" Component={ForgotPassword} />
        <Route path="/todolist/resetPassword" Component={ForgotResetPassword} />
      </Routes>
    </>
  );
}

export default App;
