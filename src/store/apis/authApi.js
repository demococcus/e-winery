import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_CONFIG from '../../API_CONFIG';

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken
      if (token) {
       // include token in req header
        headers.set('authorization', `Bearer ${token}`)  
        return headers
      }
    },

    fetchFn: async(...args) => {
      // REMOVE FOR PRODUCTION
      pause(API_CONFIG.DELAY);
      return fetch(...args);
    }  
  }),
  endpoints(builder) {
    return {

      // Register user
      registerUser: builder.mutation({
        invalidatesTags: ["User"],
        query:(data) => {
          
          return {
            url: '/users/signup',
            method: 'POST',
            body: data
          };          
        },
      }),
      
      // Log in user
      loginUser: builder.mutation({
        invalidatesTags: ["User"],
        query:(data) => {
          
          return {
            url: '/users/login',
            method: 'POST',
            body: data
          };          
        },
      }),

      // Log out user
      logoutUser: builder.query({
        providesTags: [],
        query: (a) => {
          return {
            url: 'users/logout',
            // params: {},
            method: 'GET'
          };          
        },
      }),


      // Get user details
      getUserDetails: builder.query({
        providesTags: ["User"],
        query:() => {          
          return {
            url: '/users/me',
            method: 'GET',
          };          
        },
      }),



    };
  },


});


export const { 
  useLoginUserMutation,
  useLogoutUserQuery,
  useGetUserDetailsQuery,
  useRegisterUserMutation,
} = authApi;

export { authApi };