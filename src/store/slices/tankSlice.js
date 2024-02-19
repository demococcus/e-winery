import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  tankFilter: 'all',
};

// Define slice
const tankSlice = createSlice({
  name: 'tank',
  initialState,
  reducers: {
    setTankFilter: (state, action) => {
      state.tankFilter = action.payload;
    },
  },

});

export const tankReducer = tankSlice.reducer;
export const { setTankFilter } = tankSlice.actions;