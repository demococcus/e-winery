import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // DEV ONLY!!!
// const pause = (duration) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, duration);
//   });
// };

const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;


const grapeApi = createApi({
  reducerPath: 'grapeApi',
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
      
      // Edit grape
      updateGrape: builder.mutation({
        invalidatesTags: ["grapes", "grape"],
        // invalidatesTags: (result, error, {id}) => [{ type: "grape", id }],
        query:({id, ...data}) => {
          
          return {
            url: `/grape/${id}`,
            method: 'PATCH',
            body: data
          };          
        },
      }),

      // Add grape
      addGrape: builder.mutation({
        invalidatesTags: ["grapes"],
        query: (grape) => {
          return {
            url: '/grape',
            method: 'POST',
            body: grape
          };          
        },
      }),

      // Fetch grape by id
      fetchGrapeById: builder.query({
        providesTags: ["grape"],
        // providesTags: (result, error, id) => [{ type: "grape", id }],
        query: (id) => {
          return {
            url: `/grape/${id}`,
            // params: {},
            method: 'GET'
          };          
        },
      }),

      // Fetch grapes
      fetchGrapes: builder.query({
        providesTags: ["grapes"],
        // providesTags: (result, error) => {return result.map(grape => ({ type: "grape", id: grape._id }));},
        query: () => {
          return {
            url: '/grapes',
            params: {},
            method: 'GET'
          };          
        },
      }),


    };
  },


});


export const { 
  useFetchGrapesQuery, 
  useFetchGrapeByIdQuery,
  useAddGrapeMutation,
  useUpdateGrapeMutation,
} = grapeApi;

export { grapeApi };