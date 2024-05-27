import axios from "axios";
import { getToken } from "./authservice";
const BASE_URL = "https://to-do-it-i8lc.onrender.com/todoapp/projects";

axios.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = getToken("token");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export function getProject(id) {
  return axios.get(`${BASE_URL}/${id}`);
}

export function createProject(projectObject) {
  return axios.post(`${BASE_URL}`, projectObject);
}

export function editProject(id, projectObject) {
  return axios.put(`${BASE_URL}/${id}`, projectObject);
}

export function deleteproject(id) {
  return axios.delete(`${BASE_URL}/${id}`);
}

export function getAllprojects() {
  return axios.get(`${BASE_URL}/`);
}
