import { createSlice } from "@reduxjs/toolkit";

const likeSlice = createSlice({
  name: "like",
  initialState: {
    likes: [],
  },
  reducers: {
    addLike(state, action) {
      state.likes.push(action.payload);
    },
    removeLike(state, action) {
      state.likes = state.likes.filter(like => like.id !== action.payload);
    },
    clearLikes(state) {
      state.likes = [];
    },
  },
});

export const likeReducer = likeSlice.reducer;
export const likeActions = likeSlice.actions;

export default likeSlice.reducer;
