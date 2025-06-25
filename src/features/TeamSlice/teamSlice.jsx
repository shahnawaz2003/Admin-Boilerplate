// src/features/TeamSlice/teamSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  team: [], // Array to store team members
  error: null, // To store errors
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTeam, setError } = teamSlice.actions;

export default teamSlice.reducer;
