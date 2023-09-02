import { createSlice } from "@reduxjs/toolkit";


const passwordSlice = createSlice({
  // ... your auth slice configuration ...
  name: "password",
       initialState:{
                 isError: false,
                    },
        reducers:{
           setError(state){
            state.isError = true;
           },
        }
});
 const passwordReducer = passwordSlice.reducer;
 const passwordActions = passwordSlice.actions;

export { passwordActions,passwordReducer}; 