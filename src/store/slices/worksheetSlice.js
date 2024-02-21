import { createSlice } from "@reduxjs/toolkit";
import { getCurrentDate } from "../../utils";

const initialTask = {
  category: 'manipulation',
  type: null,
  date: getCurrentDate(),
  note: null,
    
  targetWineOption: null,
  targetWineId: null,
  targetWineQuantity: null,
  targetWineVesselCapacity: null,
  targetWineVesselType: null,

  
  nextVesselOption: null,
  nextVesselId: null,
  nextVesselAvailableCapacity: null,
  nextVesselType: null,

  nextQuantity: null,

  sources: {
    'A': {option: null, wineId: null, wineQuantity: null, usedQuantity: null},
    'B': {option: null, wineId: null, wineQuantity: null, usedQuantity: null},
    'C': {option: null, wineId: null, wineQuantity: null, usedQuantity: null},
    'D': {option: null, wineId: null, wineQuantity: null, usedQuantity: null},
  },

  additives: {
    'A': {id: null, quantity: null},
    'B': {id: null, quantity: null},
    'C': {id: null, quantity: null},
    'D': {id: null, quantity: null},
  },

  
}

// Define initial state
const initialState = {
  periodFilter: '30',
  task: initialTask
  
};

// Define slice
const worksheetSlice = createSlice({
  name: 'worksheet',
  initialState,
  reducers: {
    setPeriodFilter(state, action) {
      state.periodFilter = action.payload;
    },

    setTaskCategory(state, action) {
      state.task.category = action.payload;
    },

    setTaskType(state, action) {
      state.task.type = action.payload;
    },

    setTaskTargetWine(state, action) {    
      const targetWineOption = action.payload
      state.task.targetWineOption  = targetWineOption;

      
      try {
        // deserialize the targetWineOption
        const targetWineObj = JSON.parse(targetWineOption);  
        // console.log("targetWineObj", targetWineObj);      

        state.task.targetWineId = targetWineObj.targetWineId;
        state.task.targetWineQuantity = targetWineObj.targetWineQuantity; 
        state.task.targetWineVesselCapacity = targetWineObj.targetWineVesselCapacity; 
        state.task.targetWineVesselType = targetWineObj.targetWineVesselType; 
        state.task.nextQuantity = targetWineObj.targetWineQuantity;
            
      } catch (error) {
        state.task.targetWineId = null;
        state.task.targetWineQuantity = null;     
        state.task.targetWineVesselCapacity = null;   
        // console.log("setTaskTargetWine", error);  
      }
    },

    setTaskNextVessel(state, action) {

      const nextVesselOption = action.payload
      state.task.nextVesselOption  = nextVesselOption;

      try {
        // deserialize
        // console.log("nextVesselOption", nextVesselOption);
        const nextVesselObj = JSON.parse(nextVesselOption);      
        state.task.nextVesselId = nextVesselObj.nextVesselId;
        state.task.nextVesselAvailableCapacity = nextVesselObj.nextVesselAvailableCapacity;
        state.task.nextVesselType = nextVesselObj.nextVesselType;
      } catch (error) {
        state.task.nextVesselId = null;
        state.task.nextVesselAvailableCapacity = null;
        state.task.nextVesselType = null;
        // console.log("error", error);
      }

      // state.task.nextVessel = action.payload;
    },

    setTaskWineIngredients(state, action) { 
      
      const target = action.payload;
      
      try {
        const wineObj = JSON.parse(target.value);
        state.task.sources[target.name].option = target.value;    
        state.task.sources[target.name].wineId = wineObj.wineId;    
        state.task.sources[target.name].wineQuantity = wineObj.wineQuantity;  
        state.task.sources[target.name].usedQuantity = wineObj.usedQuantity;  
      } catch {

        state.task.sources[target.name].option = null;    
        state.task.sources[target.name].wineId = null;
        state.task.sources[target.name].wineQuantity = null;  
        state.task.sources[target.name].usedQuantity = null;  
      }
    },

    setTaskWineIngredientsQuantity(state, action) { 
      
      const target = action.payload 
      // console.log("setTaskWineIngredientsQuantity", target);

      try {
        state.task.sources[target.name].usedQuantity = parseInt(target.value);  
      } catch {
        state.task.sources[target.name].usedQuantity = null;
      }
    },

    setTaskWineAdditives(state, action) { 
      
      const name = action.payload.name;
      const value = action.payload.value;

      try {
        state.task.additives[name].id = value._id; 
      } catch {
        state.task.additives[name].id = null; 
      }
    },

    setTaskWineAdditivesQuantity(state, action) { 
      
      const target = action.payload 
      // console.log("setTaskWineAdditivesQuantity", target);

      try {
        state.task.additives[target.name].quantity = parseInt(target.value);  
      } catch {
        state.task.additives[target.name].quantity = null;
      }
    },

    setTaskNote(state, action) {
      state.task.note = action.payload;
    },

    setTaskDate(state, action) {
      state.task.date = action.payload;
    }, 

    setTaskNextQuantity(state, action) {
      state.task.nextQuantity = action.payload;
    },

    resetTask(state) {
      state.task = initialTask;
    },

  },

});



export const worksheetReducer = worksheetSlice.reducer;
export const { 
  setPeriodFilter,
  resetTask,
  setTaskCategory,
  setTaskType,
  setTaskTargetWine, 
  setTaskWineIngredients, 
  setTaskWineIngredientsQuantity,
  setTaskNextVessel,
  setTaskNextQuantity,
  setTaskNote,
  setTaskDate,
  setTaskWineAdditives,
  setTaskWineAdditivesQuantity,

 } = worksheetSlice.actions;