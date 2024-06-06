import axios from "axios";

const TASK_BASE_URL = "https://to-do-it-i8lc.onrender.com/todoapp/task";

const PROJECT_TASK_BASE_URL =
  "https://to-do-it-i8lc.onrender.com/todoapp/projectTask";

const SECTION_TASK_BASE_URL =
  "https://to-do-it-i8lc.onrender.com/todoapp/sectionTask";

// const TASK_BASE_URL = "https://localhost:8080/todoapp/task";

// const PROJECT_TASK_BASE_URL = "https://localhost:8080/todoapp/projectTask";

// const SECTION_TASK_BASE_URL = "https://localhost:8080/todoapp/sectionTask";

export function updateTaskStatus(id) {
  return axios.put(`${TASK_BASE_URL}/${id}`);
}

export function deleteprojectTask(id) {
  return axios.delete(`${PROJECT_TASK_BASE_URL}/${id}`);
}

export function deletesectionTask(id) {
  return axios.delete(`${SECTION_TASK_BASE_URL}/${id}`);
}

export function deletetask(id) {
  return axios.delete(`${TASK_BASE_URL}/${id}`);
}

export function addprojectTask(taskObject) {
  return axios.post(`${PROJECT_TASK_BASE_URL}`, taskObject);
}

export function addsectionTask(taskObject) {
  return axios.post(`${SECTION_TASK_BASE_URL}`, taskObject);
}

export function updateprojectTask(id, taskObject) {
  return axios.put(`${PROJECT_TASK_BASE_URL}/${id}`, taskObject);
}

export function updatesectionTask(id, taskObject) {
  return axios.put(`${SECTION_TASK_BASE_URL}/${id}`, taskObject);
}

export function getTodaytasks() {
  return axios.get(`${TASK_BASE_URL}/today`);
}

export function getUpcomingtasks() {
  return axios.get(`${TASK_BASE_URL}/upcoming`);
}

export function getSectiontasks(id) {
  return axios.get(`${SECTION_TASK_BASE_URL}/${id}`);
}

export function getProjecttasks(id) {
  return axios.get(`${PROJECT_TASK_BASE_URL}/${id}`);
}
