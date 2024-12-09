import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// import api reducers
import { authApi } from './apis/authApi';
import { historyApi } from './apis/historyApi';
import { vesselApi } from './apis/vesselApi';
import { wineApi } from './apis/wineApi';
import { grapeApi } from './apis/grapeApi';
import { additiveApi } from './apis/additiveApi';


// import slice reducers
import { authReducer } from './slices/authSlice';
import { barrelReducer } from './slices/barrelSlice'; 
import { labReducer } from './slices/labSlice';
import { tankReducer } from './slices/tankSlice'; 
import { wineReducer } from './slices/wineSlice';
import { grapeReducer } from './slices/grapeSlice';
import { worksheetReducer } from './slices/worksheetSlice';


// configure store with api and slice reducers
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
    [vesselApi.reducerPath]: vesselApi.reducer,
    [wineApi.reducerPath]: wineApi.reducer,
    [grapeApi.reducerPath]: grapeApi.reducer,
    [additiveApi.reducerPath]: additiveApi.reducer,
    auth: authReducer,
    barrel: barrelReducer,
    lab: labReducer,
    tank: tankReducer,
    wine: wineReducer,
    grape: grapeReducer,
    worksheet: worksheetReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
    .concat(authApi.middleware)   
    .concat(historyApi.middleware)     
    .concat(vesselApi.middleware)
    .concat(wineApi.middleware)
    .concat(grapeApi.middleware)
    .concat(additiveApi.middleware)
  }
});

setupListeners(store.dispatch);


// export slice methods
export { setTankFilter } from './slices/tankSlice';
export { setBarrelFilter } from './slices/barrelSlice';
export { setPeriodFilter as labSetPeriodFilter } from './slices/labSlice';

export { 
  setVintageFilter, 
  setFormInput as setWineFormInput, 
  resetFormInput as resetWineFormInput,
} from './slices/wineSlice';

export { 
  setFormInput as setGrapeFormInput, 
  resetFormInput as resetGrapeFormInput,
} from './slices/grapeSlice';

export { 
  setPeriodFilter as setWorksheetPeriodFilter,
  updateTaskFormField,
  resetTask,
  setTaskTargetWine,
  setTaskWineIngredients,
  setTaskWineIngredientsQuantity,
  setTaskNextVessel,
  setTaskWineAdditives,
  setTaskWineAdditivesQuantity,  
  setTaskVinificationIngredients,
  setTaskVinificationQuantity,
 } from './slices/worksheetSlice';

export { 
  setUserInfo,
  setUserToken,
  resetUserInfoAndToken,
} from './slices/authSlice';


// export api methods
export { 
  useFetchWinesQuery, 
  useFetchWinesBottledQuery,
  useFetchWineByIdQuery, 
  useAddWineMutation, 
  useUpdateWineMutation,
 } from './apis/wineApi';

 export { 
  useFetchGrapesQuery, 
  useFetchGrapeByIdQuery,
  useAddGrapeMutation,
  useUpdateGrapeMutation,
 } from './apis/grapeApi';

export { 
  useFetchVesselsQuery, 
  useFetchAvailableVesselsQuery,
  useAddVesselMutation, 
  useDeleteVesselMutation,
 } from './apis/vesselApi';

export { 
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
  useFetchAdditiveReportQuery,
} from './apis/historyApi';

export { 
  useLoginUserMutation, 
  useLogoutUserQuery,
  useGetUserDetailsQuery,
  useRegisterUserMutation,
} from './apis/authApi';

export { 
  useFetchAdditivesQuery, 
  useAddAdditiveMutation, 
  useDeleteAdditiveMutation,
  useFetchAdditiveByIdQuery,
  useReceiveAdditiveMutation,
} from './apis/additiveApi';

