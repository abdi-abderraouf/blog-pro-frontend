import { createSlice } from "@reduxjs/toolkit";


const categorySlice = createSlice({
  // ... your auth slice configuration ...
  name: "category",
       initialState:{
                     categories:[],
                    },
        reducers:{
            setCategories(state,action){
                state.categories = action.payload;
            },
            addCategory(state,action){
                state.categories.push(action.payload);
            },
            deleteCat(state,action){
                state.categories=state.categories.filter(cat=>cat._id!== action.payload);      
            },
        }
});

export const categoryReducer = categorySlice.reducer;
export const categoryActions = categorySlice.actions;

export default categorySlice.reducer; 