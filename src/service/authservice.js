import axios from "axios";

const BASE_URL = "http://localhost:8080/todoapp/auth";

export function login(loginObject) {
  return axios.post(`${BASE_URL}/login`, loginObject);
}

export function register(registerObject) {
  return axios.post(`${BASE_URL}/signup`, registerObject);
}

export const setToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (userName) => {
  sessionStorage.setItem("authenticatedUser", userName);
};

export const getLoggedInUser = () => {
  sessionStorage.getItem("authenticatedUser");
};

export const isUserLoggedIn = () => {
  let user = getLoggedInUser();
  if (user === null) {
    return false;
  } else {
    return true;
  }
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.reload(false);
};

export function checkPassword(password) {
  return axios.post(`${BASE_URL}/checkPassword`, password);
}

export function resetPassword(password) {
  return axios.post(`${BASE_URL}/resetPassword`, password);
}

export function forgotPassword(email) {
  return axios.get(`${BASE_URL}/forgotPassword/${email}`);
}

export function forgotResetPassword(token, password) {
  return axios.put(`${BASE_URL}/resetPassword/${token}`, password);
}
