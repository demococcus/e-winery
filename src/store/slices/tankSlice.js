import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tankFilter: 'all',
};

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