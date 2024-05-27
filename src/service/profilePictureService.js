import axios from "axios";

const BASE_URL = "http://localhost:8080/todoapp/profilePicture";

export async function saveProfilepicture(image) {
  if (!image) {
    return "Set Valid image";
  }

  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await axios.post(BASE_URL, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error uploading image");
  }
}

export async function fetchProfilepicture() {
  try {
    const response = await axios.get(BASE_URL, { responseType: "arraybuffer" });
    const imageData = Buffer.from(response.data, "binary").toString("base64");
    return imageData;
  } catch (error) {
    console.error("Download failed:", error);
  }
}
