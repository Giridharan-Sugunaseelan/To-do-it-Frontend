import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProfilePicture,
  fetchUser,
  saveProfilePicture,
} from "./Actions/userActions";

const initialState = {
  loading: false,
  user: null,
  profilePicture: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });

    builder.addCase(saveProfilePicture.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveProfilePicture.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(saveProfilePicture.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchProfilePicture.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProfilePicture.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchProfilePicture.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      // console.log(action.error);
    });
  },
});

export default userSlice.reducer;
