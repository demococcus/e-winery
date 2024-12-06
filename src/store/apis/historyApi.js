import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // DEV ONLY!!!
// const pause = (duration) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, duration);
//   });
// };

const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;


const historyApi = createApi({
  reducerPath: 'historyApi',
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

      // Fetch grape history
      fetchGrapeHistory: builder.query({ 
        providesTags: ["Grape History"],
        query: (grape) => {
          return {
            url: `/history/grape/${grape._id}`,
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

      // Fetch wineTask by id
      fetchTaskById: builder.query({
        providesTags: ["Task"],
        query: (_id) => {
          return {
            url: `/wineTask/${_id}`,
            // params: {},
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

      // Add wineLab event
      addGrapeLab: builder.mutation({
        invalidatesTags: ["Labs", "Grape History"],
        query: (lab) => {

          return {
            url: '/grapeLab',
            method: 'POST',
            body: lab
          }          
        }
      }),

      // Delete wineTask event
      deleteWineTask: builder.mutation({
        invalidatesTags: ["Labs", "Wine History"],
        query: (_id) => {

          return {
            url: `/wineTask/${_id}`,
            method: 'DELETE',
          }          
        }
      }),

      // Delete wineLab event
      deleteWineLab: builder.mutation({
        invalidatesTags: ["Labs", "Wine History"],
        query: (_id) => {

          return {
            url: `/wineLab/${_id}`,
            method: 'DELETE',
          }          
        }
      }),

      // Delete grape event
      deleteGrapeLab: builder.mutation({
        invalidatesTags: ["Labs", "Grape History"],
        query: (_id) => {

          return {
            url: `/grapeLab/${_id}`,
            method: 'DELETE',
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
  useFetchGrapeHistoryQuery,
  useFetchTaskByIdQuery,
  useAddWineTaskMutation,
  useAddWineLabMutation,
  useAddGrapeLabMutation,
  useDeleteWineTaskMutation,
  useDeleteWineLabMutation,
  useDeleteGrapeLabMutation,

} = historyApi;