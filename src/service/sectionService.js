import axios from "axios";

const BASE_URL = "https://to-do-it-i8lc.onrender.com/todoapp/section";

export function addsection(sectionObject) {
  return axios.post(`${BASE_URL}`, sectionObject);
}

export function editsection(id, sectionObject) {
  return axios.put(`${BASE_URL}/${id}`, sectionObject);
}

export function deletesection(id) {
  return axios.delete(`${BASE_URL}/${id}`);
}
