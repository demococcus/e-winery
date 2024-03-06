import { createSlice } from "@reduxjs/toolkit";


const formInitialState = {
  parcel: '',
  variety: '',
  area: '',
  status: ''
  }

const initialState = {
  formInput: formInitialState,
};

const grapeSlice = createSlice({
  name: 'grape',
  initialState,
  reducers: {

    setFormInput(state, action) {
      state.formInput = action.payload;
    },

    resetFormInput(state) {
      state.formInput = formInitialState;
    }
  },

});

export const grapeReducer = grapeSlice.reducer;
export const { 
  setFormInput,
  resetFormInput,
 } = grapeSlice.actions;
