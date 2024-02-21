import { createSlice } from '@reduxjs/toolkit'

// initialize userInfo, language and userToken from local storage
const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  language: localStorage.getItem('language') || 'en',
  userToken: localStorage.getItem('userToken') || null,
  userInfo,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setUserInfo(state, action) {
      state.userInfo = action.payload;
      const userInfoString = JSON.stringify(action.payload);
      localStorage.setItem('userInfo', userInfoString);
      localStorage.setItem('language', state.userInfo.language);
    },

    setUserToken(state, action) {
      state.userToken = action.payload;
      localStorage.setItem('userToken', action.payload);
    },

    resetUserInfoAndToken(state) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userInfo');
      state.userToken = null;
      state.userInfo = null;
      // keep the language
    },


  },

})

export const authReducer =  authSlice.reducer
export const { 
  setUserInfo,
  setUserToken,  
  resetUserInfoAndToken,
} = authSlice.actions;