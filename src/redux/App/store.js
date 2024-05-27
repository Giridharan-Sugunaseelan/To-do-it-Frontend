import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../Features/project/projectSlice";
import userReducer from "../Features/user/userSlice";

const store = configureStore({
  reducer: {
    project: projectReducer,
    user: userReducer,
  },
});

export default store;
