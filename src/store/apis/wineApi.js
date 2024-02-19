import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_CONFIG from '../../API_CONFIG';

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const wineApi = createApi({
  reducerPath: 'wineApi',
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
        query: () => {
          return {
            url: '/wines',
            params: {},
            method: 'GET'
          };          
        },
      }),
    };
  },


});


export const { 
  useFetchWinesQuery, 
  useFetchWineByIdQuery,
  useAddWineMutation,
  useUpdateWineMutation,
} = wineApi;

export { wineApi };