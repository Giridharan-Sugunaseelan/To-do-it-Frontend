import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../Features/project/projectSlice";
import userReducer from "../Features/user/userSlice";
import loadingReducer from "../Features/Loading/loadingSlice";
const store = configureStore({
  reducer: {
    project: projectReducer,
    user: userReducer,
    loading: loadingReducer,
  },
});

export default store;
