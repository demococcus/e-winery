import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_CONFIG from '../../API_CONFIG';

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};


const historyApi = createApi({
  reducerPath: 'historyApi',
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

      // Fetch wine history
      fetchWineHistory: builder.query({ 
        providesTags: ["Wine History"],
        query: (wine) => {
          return {
            url: `/history/wine/${wine._id}`,
            method: 'GET'
          };          
        },
      }),

      // Fetch tasks
      fetchWineTasks: builder.query({ 
        providesTags: ["Tasks"],
        query: (resultsNumber) => {
          return {
            url: '/wineTasks',
            params: {resultsNumber},
            method: 'GET'
          };          
        },
      }),

      // Fetch labs
      fetchWineLabs: builder.query({ 
        providesTags: ["Labs"],
        query: (resultsNumber) => {
          return {
            url: '/wineLabs',
            params: {resultsNumber},
            method: 'GET'
          };          
        },
      }),

      // Add wineTask event
      addWineTask: builder.mutation({
        invalidatesTags: ["Tasks", "Wine History"],
        query: (task) => {

          return {
            url: '/wineTask',
            method: 'POST',
            body: task
          }          
        }
      }),


      // Add wineLab event
      addWineLab: builder.mutation({
        invalidatesTags: ["Labs", "Wine History"],
        query: (lab) => {

          return {
            url: '/wineLab',
            method: 'POST',
            body: lab
          }          
        }
      }),


    };
  },

});


export { historyApi };
export const { 
  useFetchWineTasksQuery, 
  useFetchWineLabsQuery,
  useFetchWineHistoryQuery,
  useAddWineTaskMutation,
  useAddWineLabMutation,

} = historyApi;