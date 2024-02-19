import { createSlice } from "@reduxjs/toolkit";


// Define initial state
const initialState = {
  periodFilter: '30',
};

// Define slice
const labSlice = createSlice({
  name: 'lab',
  initialState,
  reducers: {
    setPeriodFilter(state, action) {
      state.periodFilter = action.payload;
    }
  },

});



export const { setPeriodFilter } = labSlice.actions;
export const labReducer = labSlice.reducer;
