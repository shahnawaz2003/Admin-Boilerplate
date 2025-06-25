import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [], // Stores the list of projects
  error: null, // Stores any errors related to fetching or updating projects
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
      state.error = null; // Clear any previous errors
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload); // Add a new project
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex(
        (project) => project?.slug === action.payload?.slug
      );
      if (index !== -1) {
        state.projects[index] = action.payload; // Update the project
      }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project?.slug !== action.payload
      );
    },
  },
});

export const {
  setProjects,
  setError,
  addProject,
  updateProject,
  deleteProject,
} = projectSlice.actions;

export default projectSlice.reducer;
