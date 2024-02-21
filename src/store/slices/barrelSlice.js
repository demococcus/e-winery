import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  barrelFilter: 'all',
};

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