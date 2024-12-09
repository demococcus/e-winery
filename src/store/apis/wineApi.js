import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // DEV ONLY!!!
// const pause = (duration) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, duration);
//   });
// };

const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;


const wineApi = createApi({
  reducerPath: 'wineApi',
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
      
      // Edit wine
      updateWine: builder.mutation({
        invalidatesTags: ["Wines", "Wine"],
        // invalidatesTags: (result, error, {id}) => [{ type: "Wine", id }],
        query:({id, ...data}) => {
          
          return {
            url: `/wine/${id}`,
            method: 'PATCH',
            body: data
          };          
        },
      }),

      // Add wine
      addWine: builder.mutation({
        invalidatesTags: ["Wines", "Vessel"],
        query: (wine) => {
          return {
            url: '/wine',
            method: 'POST',
            body: wine
          };          
        },
      }),

      // Fetch wine by id
      fetchWineById: builder.query({
        providesTags: ["Wine"],
        // providesTags: (result, error, id) => [{ type: "Wine", id }],
        query: (id) => {
          return {
            url: `/wine/${id}`,
            // params: {},
            method: 'GET'
          };          
        },
      }),

      // Fetch wines
      fetchWines: builder.query({
        providesTags: ["Wines"],
        // providesTags: (result, error) => {return result.map(wine => ({ type: "Wine", id: wine._id }));},
        query: (params) => {
          return {
            url: '/wines',
            params,
            method: 'GET'
          };          
        },
      }),

      // Fetch bottled wines
      fetchWinesBottled: builder.query({
        providesTags: ["Wines"],
        // providesTags: (result, error) => {return result.map(wine => ({ type: "Wine", id: wine._id }));},
        query: (params) => {
          return {
            url: '/wines/bottled',
            params,
            method: 'GET'
          };          
        },
      }),



    };
  },


});


export const { 
  useFetchWinesQuery, 
  useFetchWinesBottledQuery, 
  useFetchWineByIdQuery,
  useAddWineMutation,
  useUpdateWineMutation,
} = wineApi;

export { wineApi };