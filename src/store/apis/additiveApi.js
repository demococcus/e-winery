import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_CONFIG from '../../API_CONFIG';

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};


const additiveApi = createApi({
  reducerPath: 'additiveApi',
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
      await pause(API_CONFIG.DELAY);
      return fetch(...args);
    }
  }),

  endpoints(builder) {
    return {  
      
      // Delete additive
      deleteAdditive: builder.mutation({
        invalidatesTags: ["Additive"],
        query: (_id) => {
          return {
            url: `/additive/${_id}`,
            method: 'DELETE'
          }          
        }
      }),

      // Add additive
      addAdditive: builder.mutation({
        invalidatesTags: ["Additive"],
        query: (additive) => {
          return {
            url: '/additive',
            method: 'POST',
            body: additive
          }          
        }
      }),

      // Fetch additives
      fetchAdditives: builder.query({ 
        providesTags: ["Additive"],
        query: () => {
          return {
            url: '/additives',
            method: 'GET'
          };          
        },
      }),

      
    };
  },
});



export { additiveApi };

export const { 
  useFetchAdditivesQuery, 
  useAddAdditiveMutation, 
  useDeleteAdditiveMutation 
} = additiveApi;

