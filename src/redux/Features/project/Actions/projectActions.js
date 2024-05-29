import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProject,
  deleteproject,
  editProject,
  getAllprojects,
} from "../../../../service/projectService";

import { startLoading, endLoading } from "../../Loading/loadingSlice";

export const addProject = createAsyncThunk(
  "project/addProject",
  async (projectObject, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await createProject(projectObject);
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (params, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await editProject(params.id, params.projectObject);
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (id, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await deleteproject(id);
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);

export const getAllProjects = createAsyncThunk(
  "project/allProjects",
  async (_, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await getAllprojects();
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);
