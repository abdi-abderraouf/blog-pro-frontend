import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
       name: "comment",
       initialState:{
                      comments: [],
                      comment:null,
                    },
        reducers:{
            setComments(state,action){
                state.comments = action.payload;
            },
            
            setComment(state,action){
                state.comment = action.payload;
            },
            deleteComment(state,action){
                state.comments = state.comments.filter(c=>c._id !== action.payload);
            },
        },
});
export const commentReducer = commentSlice.reducer;
export const commentActions = commentSlice.actions;

export default commentSlice.reducer;