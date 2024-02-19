import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  barrelFilter: 'all',
};

// Define slice
const barrelSlice = createSlice({
  name: 'barrel',
  initialState,
  reducers: {
    setBarrelFilter: (state, action) => {
      state.barrelFilter = action.payload;
    },
  },

});

export const barrelReducer = barrelSlice.reducer;
export const { setBarrelFilter } = barrelSlice.actions;