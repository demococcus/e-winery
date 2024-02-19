import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_CONFIG from '../../API_CONFIG';

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};


const vesselApi = createApi({
  reducerPath: 'vesselApi',
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

