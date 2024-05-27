import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProject } from "../../../service/projectService";
import {
  addProjectTask,
  addSectionTask,
  deleteProjectTask,
  deleteSectionTask,
  updateProjectTaskStatus,
  updateSectionTaskStatus,
  updateProjectTask,
  updateSectionTask,
  getTodayTasks,
  getUpcomingTasks,
  deleteTask,
  getSectionTasks,
  getProjectTasks,
} from "../Tasks/Actions/taskActions";
import {
  addSection,
  deleteSection,
  updateSection,
} from "../section/Actions/sectionActions";
import {
  addProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from "./Actions/projectActions";

const initialState = {
  loading: false,
  project_id: null,
  title: null,
  tasks: null,
  sections: null,
  projects: null,
  error: null,
};

export const fetchProject = createAsyncThunk(
  "project/fetchProject",
  async (id) => {
    const response = await getProject(id);
    return response.data;
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      state.loading = false;
      state.project_id = action.payload.project_id;
      state.title = action.payload.title;
      state.tasks = action.payload.tasks;
      state.sections = action.payload.sections;
      state.projects = action.payload.projects;
      state.error = null;
    });
    builder.addCase(fetchProject.rejected, (state, action) => {
      state.loading = false;
      state.project_id = null;
      state.title = null;
      state.tasks = null;
      state.sections = null;
      state.projects = null;
      state.error = action.error.message;
    });

    builder.addCase(updateProjectTaskStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProjectTaskStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.map((task) =>
        task.task_id === action.payload.task_id ? action.payload : task
      );
    });
    builder.addCase(updateProjectTaskStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateSectionTaskStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSectionTaskStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.sections = state.sections.map((section) => ({
        ...section,
        tasks: section.tasks.map((task) =>
          task.task_id === action.payload.task_id ? action.payload : task
        ),
      }));
      state.error = null;
    });

    builder.addCase(updateSectionTaskStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteProjectTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProjectTask.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteProjectTask.rejected, (state, action) => {
      state.loading = false;
      state.tasks = null;
      state.error = action.error.message;
    });

    builder.addCase(deleteSectionTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSectionTask.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteSectionTask.rejected, (state, action) => {
      state.loading = false;
      state.tasks = null;
      state.error = action.error.message;
    });

    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.filter(
        (task) => task.task_id !== action.payload
      );
      state.error = null;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addProjectTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProjectTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = [...state.tasks, action.payload];
      state.error = null;
    });
    builder.addCase(addProjectTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addSectionTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addSectionTask.fulfilled, (state, action) => {
      state.loading = false;
      state.sections = state.sections.map((section) =>
        section.section_id === action.payload.section_id
          ? {
              ...section,
              tasks: [...section.tasks, action.payload],
            }
          : section
      );
      state.error = null;
    });
    builder.addCase(addSectionTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateProjectTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProjectTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.map((task) =>
        task.task_id === action.payload.task_id ? action.payload : task
      );
      state.error = null;
    });
    builder.addCase(updateProjectTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateSectionTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSectionTask.fulfilled, (state, action) => {
      state.loading = false;
      state.sections = state.sections.map((section) => ({
        ...section,
        tasks: section.tasks.map((task) =>
          task.task_id === action.payload.task_id ? action.payload : task
        ),
      }));
      state.error = null;
    });
    builder.addCase(updateSectionTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addSection.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addSection.fulfilled, (state, action) => {
      state.loading = false;
      state.sections = [...state.sections, action.payload];
      state.error = null;
    });
    builder.addCase(addSection.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateSection.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSection.fulfilled, (state, action) => {
      state.loading = false;
      state.sections = state.sections.map((section) =>
        section.section_id === action.payload.section_id
          ? action.payload
          : section
      );
      state.error = null;
    });
    builder.addCase(updateSection.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteSection.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSection.fulfilled, (state, action) => {
      state.loading = false;
      state.sections = action.payload;
      state.error = null;
    });
    builder.addCase(deleteSection.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProject.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = [...state.projects, action.payload];
      state.error = null;
    });
    builder.addCase(addProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = state.projects.map((project) =>
        project.project_id === action.payload.project_id
          ? action.payload
          : project
      );
      state.error = null;
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action.payload;
      state.error = null;
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getAllProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action.payload;
      state.error = null;
    });
    builder.addCase(getAllProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getTodayTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTodayTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
      state.error = null;
    });
    builder.addCase(getTodayTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getUpcomingTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUpcomingTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
      state.error = null;
    });
    builder.addCase(getUpcomingTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getSectionTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSectionTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.sections = state.sections.map((section) =>
        section.section_id === action.payload.section_id
          ? { ...section, tasks: action.payload.tasks }
          : section
      );
      state.error = null;
    });
    builder.addCase(getSectionTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getProjectTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProjectTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
      state.error = null;
    });
    builder.addCase(getProjectTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default projectSlice.reducer;
