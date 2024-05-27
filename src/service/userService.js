import axios from "axios";

const BASE_URL = "https://to-do-it-i8lc.onrender.com/todoapp/user";

export default function getUser() {
  return axios.get(`${BASE_URL}`);
}
