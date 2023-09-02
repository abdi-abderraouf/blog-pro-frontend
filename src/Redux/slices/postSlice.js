import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    postsCount: null,
    postsCat: [],
    loading: false,
    isPostCreated: false,
    post: null,
    categories: [],
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setPostsCount(state, action) {
      state.postsCount = action.payload;
    },
    setPostsCat(state, action) {
      state.postsCat = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsPostCreated(state) {
      state.isPostCreated = true;
      state.loading = false;
    },
    clearIsPostCreated(state) {
      state.isPostCreated = false;
    },
    setPost(state, action) {
      state.post = action.payload;
    },
    setLike(state, action) {
      state.post.likes = action.payload.likes;
    },
    addCommentToPost(state, action) {
      state.post.comments.push(action.payload);
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((p) => p._id !== action.payload);
    },
    deleteCommentFromPost(state, action) {
      state.posts = state.posts.filter((p) => p._id !== action.payload);
      state.comments = state.comments.filter((c) => c._id !== action.payload);
    },
    updateCommentPost(state, action) {
       state.post.comments = state.post.comments.map((comment)=>
       comment.id === action.payload._id ? action.payload : comment)
    },
    deleteCommentFromPost(state, action) {
      const comment = state.post.comments.find((comment) => comment.id === action.payload._id);
      const commentIndex = state.post.comments.indexOf(comment);
      state.post.comments.splice(commentIndex, 1);
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export const postReducer = postSlice.reducer;
export const postActions = postSlice.actions;

export default postReducer;
