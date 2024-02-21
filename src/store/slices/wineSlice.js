import { createSlice } from "@reduxjs/toolkit";
import { getCurrentVintage } from "../../utils";

const formInitialState = {
    vintage:  getCurrentVintage(),
    lot: '',
    vessel: '',
    quantity: '',
    status: ''
  }

const initialState = {
  vintageFilter: 'current',
  formInput: formInitialState,
};

const wineSlice = createSlice({
  name: 'wine',
  initialState,
  reducers: {
    setVintageFilter(state, action) {
      state.vintageFilter = action.payload;
    },

    setFormInput(state, action) {
      state.formInput = action.payload;
    },

    resetFormInput(state) {
      state.formInput = formInitialState;
    }
  },

});

export const wineReducer = wineSlice.reducer;
export const { 
  setVintageFilter, 
  setFormInput,
  resetFormInput,
 } = wineSlice.actions;
