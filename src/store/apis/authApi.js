import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // DEV ONLY!!!
// const pause = (duration) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, duration);
//   });
// };

const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: backendURL,

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken
      if (token) {
       // include token in req header
        headers.set('authorization', `Bearer ${token}`)  
        return headers
      }
    },

    // fetchFn: async(...args) => {
    //   // REMOVE FOR PRODUCTION
    //   pause(2000);
    //   return fetch(...args);
    // }  

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
        query: () => {
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