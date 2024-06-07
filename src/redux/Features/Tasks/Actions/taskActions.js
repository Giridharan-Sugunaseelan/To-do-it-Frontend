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
  updatesectionTaskStatus,
} from "../../../../service/taskservice";

import { startLoading, endLoading } from "../../Loading/loadingSlice";

export const updateProjectTaskStatus = createAsyncThunk(
  "task/updateProjectTaskStatus",
  async (id, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await updateTaskStatus(id);
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);

export const updateSectionTaskStatus = createAsyncThunk(
  "task/updateSectionTaskStatus",
  async ({ task_id, section_id }, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await updatesectionTaskStatus(section_id, task_id);
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);

export const deleteProjectTask = createAsyncThunk(
  "tasks/deleteProjectTask",
  async (id, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await deleteprojectTask(id);
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);

export const deleteSectionTask = createAsyncThunk(
  "tasks/deleteSectionTask",
  async (id, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await deletesectionTask(id);
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await deletetask(id);
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);

export const addProjectTask = createAsyncThunk(
  "tasks/addProjectTask",
  async (taskObject, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await addprojectTask(taskObject);
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);

export const addSectionTask = createAsyncThunk(
  "tasks/addSectionTask",
  async (taskObject, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await addsectionTask(taskObject);
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);

export const updateProjectTask = createAsyncThunk(
  "tasks/updateProjectTask",
  async (params, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await updateprojectTask(params.id, params.task);
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);

export const updateSectionTask = createAsyncThunk(
  "tasks/updateSectionTask",
  async (params, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await updatesectionTask(params.id, params.task);
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);

export const getTodayTasks = createAsyncThunk(
  "tasks/todayTasks",
  async (_, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await getTodaytasks();
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);

export const getUpcomingTasks = createAsyncThunk(
  "task/upcomingTasks",
  async (_, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await getUpcomingtasks();
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);

export const getSectionTasks = createAsyncThunk(
  "tasks/getSectionTasks",
  async (id, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await getSectiontasks(id);
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);

export const getProjectTasks = createAsyncThunk(
  "tasks/getProjectTasks",
  async (id, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await getProjecttasks(id);
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);
