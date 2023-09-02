import { postActions } from "../slices/postSlice";
import {commentActions} from '../slices/commentSlice';
import  request from '../../utils/request';
import {toast} from "react-toastify";
//create comment
export function createComment(newComment){
    return async(dispatch,getState) => {
    try {
     const {data}= await request.post('/api/comments',newComment,{headers:{
         Authorization: 'Bearer ' + getState().auth.user.token,  
    }});
    dispatch(postActions.addCommentToPost(data));
    } catch (error) {
        toast.error(error.response.data.message);
    }
   }
}

//get All comment
export function getAllComments(){
    return async(dispatch,getState) => {
    try {
     const {data}= await request.get('/api/comments',{headers:{
         Authorization: 'Bearer ' + getState().auth.user.token,
         
    }});
    console.log('comments de api call:',data);
    dispatch(commentActions.setComments(data));
    } catch (error) {
        toast.error(error);
    }
   }
}

//delete comment
export function deleteCommentPosted(commentId){
    return async(dispatch,getState) => {
    try {
          console.log(commentId);
           await request.delete(`/api/comments/${commentId}`,{headers:{
         Authorization: 'Bearer ' + getState().auth.user.token,
         
    }});
    dispatch(postActions.deleteCommentFromPost(commentId));
    dispatch(commentActions.deleteComment(commentId));
    
    } catch (error) {
        toast.error(error);
    }
   }
}

//update comment
export function updateComment(commentId, { text, postId }) {
  return async (dispatch, getState) => {
    try {
      console.log('commentId ds apicall', commentId);
      console.log('text ds apicall', text);
      const { data } = await request.put(
        `/api/comments/${commentId}`,
        { text, postId }, // Send the correct payload
        {
          headers: {
            Authorization: 'Bearer ' + getState().auth.user.token,
          },
        }
      );

      console.log('data ds updateComment', data);
      dispatch(postActions.updateCommentPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}










  