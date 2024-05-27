// import { useState } from "react";
// import "./profilePictureModal-module.css";
// import ActionButton from "../../Action Button/ActionButton";
// import { useDispatch } from "react-redux";
// import {
//   fetchProfilePicture,
//   saveProfilePicture,
// } from "../../../redux/Features/user/Actions/userActions";

// function ProfilePictureModal({ toggleHandler }) {
//   const dispatch = useDispatch();
//   const [image, setImage] = useState("");
//   const [error, setError] = useState(null);

//   function handleImageChange(e) {
//     setImage(e.target.files[0]);
//   }

//   async function handleSave() {
//     try {
//       if (!image) {
//         console.error("Set a valid image");
//         return;
//       }
//       await dispatch(saveProfilePicture(image)).unwrap();
//       await dispatch(fetchProfilePicture()).unwrap();
//       toggleHandler();
//     } catch (error) {
//       console.error("Error saving or fetching profile picture:", error);
//       setError(error.message);
//     }
//   }

//   return (
//     <>
//       <div className="profilePictureOverlay" onClick={toggleHandler}>
//         <div
//           className="profilePictureModalContainer"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <input type="file" onChange={handleImageChange} />
//           <p>Max. image size: 50KB</p>
//           <div className="profilePictureButtonContainer">
//             <div className="profilePictureButtons">
//               <ActionButton
//                 buttonName="Save"
//                 buttonClass="addTask"
//                 eventHandler={handleSave}
//               />
//               <ActionButton
//                 buttonName="Cancel"
//                 buttonClass="cancel"
//                 eventHandler={toggleHandler}
//               />
//             </div>
//           </div>
//           {error && <p className="error">{error}</p>}
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProfilePictureModal;
