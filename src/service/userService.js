import axios from "axios";

const BASE_URL = "http://localhost:8080/todoapp/user";

export default function getUser() {
  return axios.get(`${BASE_URL}`);
}
