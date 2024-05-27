import { createAsyncThunk } from "@reduxjs/toolkit";
import getUser from "../../../../service/userService";
import { saveProfilepicture } from "../../../../service/profilePictureService";
import axios from "axios";
export const fetchUser = createAsyncThunk("user/fetchUser", () => {
  return getUser().then((response) => response.data);
});

export const saveProfilePicture = createAsyncThunk(
  "user/saveProfilePicture",
  (image) => {
    return saveProfilepicture(image).then((response) => console.log(response));
  }
);

export const fetchProfilePicture = createAsyncThunk(
  "user/fetchProfilePicture",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/todoapp/profilePicture",
        {
          responseType: "arraybuffer",
        }
      );
      const base64Image = Buffer.from(response.data, "binary").toString(
        "base64"
      );
      const contentType = response.headers["content-type"];
      return `data:${contentType};base64,${base64Image}`;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error fetching profile picture"
      );
    }
  }
);
