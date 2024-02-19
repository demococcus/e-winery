// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
? localStorage.getItem('userToken')
: null

// initialize userInfo from local storage

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

// DEV only - use empty strings for production
const formInitialState =  {
  email:  '',
  password: '',
}

const initialState = {
  formInput: formInitialState,
  userInfo,
  userToken,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {


    setUserInfo(state, action) {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },

    setUserToken(state, action) {
      state.userToken = action.payload;
      localStorage.setItem('userToken', action.payload);
    },

    resetUserInfoAndToken(state, action) {
      localStorage.setItem('userToken', null);
      localStorage.setItem('userInfo', null);
      state.userToken = null;
      state.userInfo = null;
    },


  },

})

export const authReducer =  authSlice.reducer
export const { 
  setUserInfo,
  setUserToken,  
  resetUserInfoAndToken,
} = authSlice.actions;