import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  error: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.data.user;
      state.token = action.payload.meta.token;
      state.isAuthenticated = true;
      state.error = null;
      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.data.user));
      localStorage.setItem("token", action.payload.meta.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    updateProfile: (state, action) => {
      state.user = action.payload.data;
      localStorage.setItem("user", JSON.stringify(action.payload.data));
    },
  },
  extraReducers: (builder) => {
    builder.addCase('auth/logout', (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    });
  },
});


export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
