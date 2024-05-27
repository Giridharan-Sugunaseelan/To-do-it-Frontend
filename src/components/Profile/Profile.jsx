import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResetPassword from "../ResetPasswordComponent/ResetPassword";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Navbar from "../Navbar/Navbar";
// import ProfilePictureModal from "./ProfilePictureModal/ProfilePictureModal";
import {
  fetchProfilePicture,
  fetchUser,
} from "../../redux/Features/user/Actions/userActions";
import "./profile-module.css";

function Profile() {
  // const profilePicture = useSelector((state) => state.user.profilePicture);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  // const [isProfilePicChange, setIsProfilePicChange] = useState(false);

  // useEffect(() => {
  //   dispatch(fetchProfilePicture());
  // });

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 900);
  };

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  // const handleProfileChange = (e) => {
  //   // e.stopPropagation();
  //   setIsProfilePicChange((prev) => !prev);
  // };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="container">
        {isMobile ? (
          <div className="navBar">
            {isOpen && <Navbar isOpen={handleIsOpen} />}
          </div>
        ) : (
          <div className="sideBar">
            <SideBar />
          </div>
        )}
        <div className="profile">
          <div className="profileContainer">
            <div className="profileDetails">
              <div className="greetings">
                {/* <img
                  src={
                    profilePicture
                      ? profilePicture
                      : "https://picsum.photos/200"
                  }
                  alt="profilePicture"
                  className="profilePicture"
                  // onClick={(e) => handleProfileChange(e)}
                /> */}
                <h2 className="greet">Hi, {user?.firstName || "User"}</h2>
              </div>
              <div className="accountDetailsContainer">
                <h3 className="profileContainerTitle">Account Details</h3>
                <hr />
                <p>First Name: {user?.firstName || "N/A"}</p>
                <p>Last Name: {user?.lastName || "N/A"}</p>
                <p>E-mail: {user?.email || "N/A"}</p>
              </div>
              <div className="resetPasswordContainer">
                <ResetPassword />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
