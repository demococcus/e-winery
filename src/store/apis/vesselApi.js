import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // DEV ONLY!!!
// const pause = (duration) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, duration);
//   });
// };

const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const vesselApi = createApi({
  reducerPath: 'vesselApi',
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
    //   await pause(2000);
    //   return fetch(...args);
    // }


  }),

  endpoints(builder) {
    return {  
      
      // Delete vessel
      deleteVessel: builder.mutation({
        invalidatesTags: ["Vessel"],
        query: (_id) => {
          return {
            url: `/vessel/${_id}`,
            method: 'DELETE'
          }          
        }
      }),

      // Add vessel
      addVessel: builder.mutation({
        invalidatesTags: ["Vessel"],
        query: (tank) => {
          return {
            url: '/vessel',
            method: 'POST',
            body: tank
          }          
        }
      }),

      // TODO need to find a way to invalidate it when a wine is added/removed from a tank
      // Fetch vessels
      fetchVessels: builder.query({ 
        providesTags: ["Vessel"],
        query: (type) => {
          return {
            url: '/vessels',
            params: {type},
            method: 'GET'
          };          
        },
      }),


      // Fetch vessels
      fetchAvailableVessels: builder.query({ 
        providesTags: ["Vessel"],
        query: () => {
          return {
            url: '/vessels',
            params: {status: 'available'},
            method: 'GET'
          };          
        },
      }),

    };
  },
});



export { vesselApi };

export const { 
  useFetchVesselsQuery, 
  useFetchAvailableVesselsQuery, 
  useAddVesselMutation, 
  useDeleteVesselMutation 
} = vesselApi;

