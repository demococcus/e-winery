import { createSlice } from "@reduxjs/toolkit";


// Define initial state
const initialState = {
  name: 'abc',
  email: '',
  message: '',
};

// Define slice
const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    
    updateField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },

    resetForm: state => {
      state.name = '';
      state.email = '';
      state.message = '';
    },


  },

});



export const { 
  updateField: updateContactFormField, 
  resetForm: resetContactForm 
} = contactFormSlice.actions;
export const contactFormReducer = contactFormSlice.reducer;
