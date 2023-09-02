import { postActions } from "../slices/postSlice";
import  request from '../../utils/request';
import {toast} from "react-toastify";
  
// Fetch Posts Based On Page Number
export function fetchPosts(pageNumber){
    return async(dispatch) => {
    try {
       const {data} = await request.get(`/api/posts?pageNumber=${pageNumber}`);
       dispatch(postActions.setPosts(data));   
    } catch (error) {
        toast.error(error.response.data.message);
    }
   }
}
// Get Posts Count
export function getPostsCount(){
    return async(dispatch) => {
    try {
       const {data} = await request.get('/api/posts/count');
       console.log('data de postCount',data);
       dispatch(postActions.setPostsCount(data));   
    } catch (error) {
        toast.error(error.response.data.message);
    }
   }
}

// Fetch Posts Based On Category
export function fetchPostsCategory(category){
    return async(dispatch) => {
    try {
       const {data} = await request.get(`/api/posts?category=${category}`);
       dispatch(postActions.setPostsCat(data));   
    } catch (error) {
        console.log(error.response.data.message);
    }
   }
}

// Create Post
export function createPost(newPost){
    return async(dispatch,getState) => {
    try {
        dispatch(postActions.setLoading());
        await request.post('/api/posts',newPost,{headers:{
         Authorization: 'Bearer ' + getState().auth.user.token,
        'Content-Type': 'multipart/form-data'
    }});
        dispatch(postActions.setIsPostCreated())
       setTimeout(() => 
         dispatch(postActions.clearIsPostCreated()),2000);
    } catch (error) {
        toast.error(error.response.data.message);
        dispatch(postActions.clearLoading());
    }
   }
}
//fetch single post
export function fetchSinglePost(postId){
    return async(dispatch) => {
    try {
       const {data} = await request.get(`/api/posts/${postId}`);
       dispatch(postActions.setPost(data)); 
       console.log('data de fetchsingle',data) ; 
    } catch (error) {
        toast.error(error.response.data.message);
    }
   }
}
/*
//Toggle Like Post
export function toggleLikePost(postId){
    return async(dispatch,getState) => {
    try {
       const{data}= await request.put(`/api/posts/like/${postId}`,{},{headers:{
            Authorization: 'Bearer ' + getState().auth.user.token,
           'Content-Type': 'multipart/form-data'}});
       dispatch(postActions.setLike(data)); 
       console.log('data de like',data) ; 
    } catch (error) {
        toast.error(error.response.data.message);
    }
   }
}
*/
//Toggle Like Post by chat gpt
export function toggleLikePost(postId) {
    return async (dispatch, getState) => {
      try {
        const { data } = await request.put(`/api/posts/like/${postId}`, {}, {
          headers: {
            Authorization: 'Bearer ' + getState().auth.user.token,
            'Content-Type': 'multipart/form-data'
          }
        });
        dispatch(postActions.setLike({ postId, likes: data.likes })); // Update the likes for the specific post
        console.log('data de like', data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
  }
  
//update image post
export function updateImageToPost(newFile,postId){
    return async(dispatch,getState) => {
    try {
      await request.put(`/api/posts/update-image/${postId}`,newFile,{headers:{
         Authorization: 'Bearer ' + getState().auth.user.token,
         'Content-Type': 'multipart/form-data'}});
    toast.success("new post image uploaded successfully");
  
    } catch (error) {
        toast.error(error.response.data.message);
    }
   }
}

//update post 
export function updatePost(newPost,postId){
    return async(dispatch,getState) => {
    try {
          const {data}= await request.put(`/api/posts/${postId}`,newPost,{headers:{
         Authorization: 'Bearer ' + getState().auth.user.token,
         }});
         dispatch(postActions.setPost(data));
    toast.success("new post  updated successfully");
  
    } catch (error) {
        toast.error(error.response.data.message);
    }
   }
}

//delete post 
export function deletePostDetail(postId){
    return async(dispatch,getState) => {
    try {
        
          const {data}= await request.delete(`/api/posts/${postId}`,{headers:{
         Authorization: 'Bearer ' + getState().auth.user.token,
         }});
         dispatch(postActions.deletePost(data.postId));
         console.log(" delete postId",postId);
  
    } catch (error) {
        toast.error(error.response.data.message);
    }
   }
}
//Get All posts 
export function getAllPosts(){
    return async(dispatch) => {
    try {
       const {data} = await request.get(`/api/posts`);
       dispatch(postActions.setPosts(data)); 
       console.log('data All posts',data) ; 
    } catch (error) {
        toast.error(error.response.data.message);
    }
   }
}