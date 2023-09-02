import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  // ... your auth slice configuration ...
  name: "auth",
       initialState:{
        user:localStorage.getItem('userInfo')?
        JSON.parse(localStorage.getItem('userInfo')):null,
        registerMessage:null,
        isEmailVerified:false,
    },
        reducers:{
            login(state,action){
                state.user = action.payload;
                state.registerMessage = null;
            },
            logout(state){
                state.user = null;
            },
            register(state,action){
                state.registerMessage = action.payload;
            },
            setUserPhoto(state,action){
                 state.user.profilePhoto = action.payload;
            },
            setUsername(state,action){
                state.user.username = action.payload;
           },
           getUsers(state,action){
                state.user = action.payload;
           },
           deleteUser(state,action){
                state.user=state.user.filter(state.user._id!==action.payload)
           },
           setIsEmailVerified(state){
            state.isEmailVerified = true;
            state.registerMessage = null; 
           },
        }
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;

export default authSlice.reducer; // Export the entire slice

//const authSlice = createSlice({
       
//const authReducer = authSlice.reducer;
//const authActions = authSlice.actions;

//export { authActions, authReducer} 