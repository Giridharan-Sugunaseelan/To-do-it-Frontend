import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addprojectTask,
  addsectionTask,
  deleteprojectTask,
  deletesectionTask,
  deletetask,
  getProjecttasks,
  getSectiontasks,
  getTodaytasks,
  getUpcomingtasks,
  updateTaskStatus,
  updateprojectTask,
  updatesectionTask,
} from "../../../../service/taskservice";

export const updateProjectTaskStatus = createAsyncThunk(
  "task/updateProjectTaskStatus",
  (id) => {
    return updateTaskStatus(id).then((response) => response.data);
  }
);

export const updateSectionTaskStatus = createAsyncThunk(
  "task/updateSectionTaskStatus",
  (id) => {
    return updateTaskStatus(id).then((response) => response.data);
  }
);

export const deleteProjectTask = createAsyncThunk(
  "tasks/deleteProjectTask",
  (id) => {
    return deleteprojectTask(id).then((response) => response.data);
  }
);

export const deleteSectionTask = createAsyncThunk(
  "tasks/deleteSectionTask",
  (id) => {
    return deletesectionTask(id).then((response) => response.data);
  }
);

export const deleteTask = createAsyncThunk("tasks/deleteTask", (id) => {
  return deletetask(id).then((response) => response.data);
});

export const addProjectTask = createAsyncThunk(
  "tasks/addProjectTask",
  (taskObject) => {
    return addprojectTask(taskObject).then((response) => response.data);
  }
);

export const addSectionTask = createAsyncThunk(
  "tasks/addSectionTask",
  (taskObject) => {
    return addsectionTask(taskObject).then((response) => response.data);
  }
);

export const updateProjectTask = createAsyncThunk(
  "tasks/updateProjectTask",
  (params) => {
    return updateprojectTask(params.id, params.task).then(
      (response) => response.data
    );
  }
);

export const updateSectionTask = createAsyncThunk(
  "tasks/updateSectionTask",
  (params) => {
    return updatesectionTask(params.id, params.task).then(
      (response) => response.data
    );
  }
);

export const getTodayTasks = createAsyncThunk("tasks/todayTasks", () => {
  return getTodaytasks().then((response) => response.data);
});

export const getUpcomingTasks = createAsyncThunk("task/upcomingTasks", () => {
  return getUpcomingtasks().then((response) => response.data);
});

export const getSectionTasks = createAsyncThunk(
  "tasks/getSectionTasks",
  (id) => {
    return getSectiontasks(id).then((response) => response.data);
  }
);

export const getProjectTasks = createAsyncThunk(
  "tasks/getProjectTasks",
  (id) => {
    return getProjecttasks(id).then((response) => response.data);
  }
);
