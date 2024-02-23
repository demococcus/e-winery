import { createSlice } from "@reduxjs/toolkit";
import { getCurrentDate } from "../../utils";

const initialTask = {
  category: 'manipulation',
  type: null,
  date: null,
  note: null,

  wine: null,
  wineQuantity: null,
  wineVesselCapacity: null,
  wineVesselType: null,

  nextVessel: null,
  nextVesselAvailableCapacity: null,
  nextVesselType: null,

  nextQuantity: null,

  subWines: {
    'A': {id: null, quantityBefore: null, quantity: null},
    'B': {id: null, quantityBefore: null, quantity: null},
    'C': {id: null, quantityBefore: null, quantity: null},
    'D': {id: null, quantityBefore: null, quantity: null},
  },

  additives: {
    'A': {id: null, quantity: null},
    'B': {id: null, quantity: null},
    'C': {id: null, quantity: null},
    'D': {id: null, quantity: null},
  },

  
}

const initialState = {
  periodFilter: '30',
  task: initialTask,  
};

const worksheetSlice = createSlice({
  name: 'worksheet',
  initialState,
  reducers: {

    setPeriodFilter(state, action) {
      state.periodFilter = action.payload;
    },

    updateField(state, action) {
      state.task[action.payload.field] = action.payload.value;
    },

    setTaskTargetWine(state, action) {    
      const value = action.payload
      
      try {
        state.task.wine = value._id;
        state.task.wineQuantity = value.quantity; 
        state.task.wineVesselCapacity = value.vessel.capacity; 
        state.task.wineVesselType = value.vessel.type; 
        state.task.nextQuantity = value.quantity;
            
      } catch (error) {
        state.task.wine = null;
        state.task.wineQuantity = null;     
        state.task.wineVesselCapacity = null;   
        // console.log("setTaskTargetWine", error);  
      }
    },

    setTaskNextVessel(state, action) {

      const value = action.payload;

      try {  
        state.task.nextVessel = value._id;
        state.task.nextVesselAvailableCapacity = value.availableCapacity;
        state.task.nextVesselType = value.type;
      } catch (error) {
        state.task.nextVessel = null;
        state.task.nextVesselAvailableCapacity = null;
        state.task.nextVesselType = null;
        // console.log("error", error);
      }

      // state.task.nextVessel = action.payload;
    },

    setTaskWineIngredients(state, action) { 

      const name = action.payload.name;
      const value = action.payload.value;    
       
      try {
        state.task.subWines[name].id = value._id;    
        state.task.subWines[name].quantityBefore = value.quantity;  
        state.task.subWines[name].quantity = value.quantity;  
      } catch (error) {

        state.task.subWines[name].id = null;
        state.task.subWines[name].quantityBefore = null;  
        state.task.subWines[name].quantity = null;  
      }
    },

    setTaskWineIngredientsQuantity(state, action) { 
      
      const target = action.payload 
      // console.log("setTaskWineIngredientsQuantity", target);

      try {
        state.task.subWines[target.name].quantity = parseInt(target.value);  
      } catch {
        state.task.subWines[target.name].quantity = null;
      }
    },

    setTaskWineAdditives(state, action) { 
      
      const name = action.payload.name;
      const value = action.payload.value;

      try {
        state.task.additives[name].id = value._id; 
      } catch (error) {
        state.task.additives[name].id = null; 
      }
    },

    setTaskWineAdditivesQuantity(state, action) { 
      
      const target = action.payload 
      // console.log("setTaskWineAdditivesQuantity", target);

      try {
        state.task.additives[target.name].quantity = parseFloat(target.value);
      } catch {
        state.task.additives[target.name].quantity = null;
      }
    },

    resetTask(state) {
      state.task = {
        ...initialTask, 
        date: getCurrentDate()
      };
    },

  },

});



export const worksheetReducer = worksheetSlice.reducer;
export const { 
  setPeriodFilter,
  updateField: updateTaskFormField,
  resetTask,

  setTaskTargetWine, 
  setTaskWineIngredients, 
  setTaskWineIngredientsQuantity,
  setTaskNextVessel,
  setTaskWineAdditives,
  setTaskWineAdditivesQuantity,

 } = worksheetSlice.actions;