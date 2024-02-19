import { createSlice } from "@reduxjs/toolkit";
import { getCurrentDate } from "../../utils";

const initialTask = {
  category: 'manipulation',
  type: null,
  date: getCurrentDate(),
  note: null,
    
  targetWine: null,
  wine: null,
  quantity: null,

  nextQuantity: null,

  nextVessel: null,

  sources: {
    'A': {dropDown: null, wine: null, quantity: null},
    'B': {dropDown: null, wine: null, quantity: null},
    'C': {dropDown: null, wine: null, quantity: null},
    'D': {dropDown: null, wine: null, quantity: null},
  },

  additives: {
    'A': {dropDown: null, additive: null, quantity: null},
    'B': {dropDown: null, additive: null, quantity: null},
    'C': {dropDown: null, additive: null, quantity: null},
    'D': {dropDown: null, additive: null, quantity: null},
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
      const targetWine = action.payload
      state.task.targetWine  = targetWine;

      // deserialize the targetWine

      try {
        const targetWineObj = JSON.parse(targetWine);        
        state.task.wine = targetWineObj.wine;
        state.task.quantity = targetWineObj.quantity; 
        state.task.nextQuantity = targetWineObj.quantity;    
      } catch (error) {
        state.task.wine = null;
        state.task.quantity = null;     
      }
    },

    setTaskWineIngredients(state, action) { 
      
      const target = action.payload 

      try {
        const wineObj = JSON.parse(target.value);
        state.task.sources[target.name].dropDown = target.value;    
        state.task.sources[target.name].wine = wineObj.wine;    
        state.task.sources[target.name].quantity = wineObj.quantity;  
      } catch {

        state.task.sources[target.name].dropDown = null;    
        state.task.sources[target.name].wine = null;
        state.task.sources[target.name].quantity = null;  
      }
    },

    setTaskWineIngredientsQuantity(state, action) { 
      
      const target = action.payload 
      // console.log("setTaskWineIngredientsQuantity", target);

      try {
        state.task.sources[target.name].quantity = parseInt(target.value);  
      } catch {
        state.task.sources[target.name].quantity = null;
      }
    },


    setTaskWineAdditives(state, action) { 
      
      const target = action.payload 

      try {
        const additiveObj = JSON.parse(target.value);
        state.task.additives[target.name].dropDown = target.value;    
        state.task.additives[target.name].id = additiveObj.id;    
        state.task.additives[target.name].quantity = additiveObj.quantity;  
      } catch {

        state.task.additives[target.name].dropDown = null;    
        state.task.additives[target.name].additive = null;
        state.task.additives[target.name].quantity = null;  
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

    setTaskNextVessel(state, action) {
      state.task.nextVessel = action.payload;
    },

    setTaskNextQuantity(state, action) {
      state.task.nextQuantity = action.payload;
    },

    resetTask(state, action) {
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