import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProject,
  deleteproject,
  editProject,
  getAllprojects,
} from "../../../../service/projectService";

export const addProject = createAsyncThunk(
  "project/addProject",
  (projectObject) => {
    return createProject(projectObject).then((response) => response.data);
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  (params) => {
    return editProject(params.id, params.projectObject).then(
      (response) => response.data
    );
  }
);

export const deleteProject = createAsyncThunk("project/deleteProject", (id) => {
  return deleteproject(id).then((response) => response.data);
});

export const getAllProjects = createAsyncThunk("project/allProjects", () => {
  return getAllprojects().then((response) => response.data);
});
