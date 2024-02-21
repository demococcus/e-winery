import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  periodFilter: '30',
};

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
