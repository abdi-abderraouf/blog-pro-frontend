import { postActions } from "../slices/postSlice";
import  request from '../../utils/request';
import {toast} from "react-toastify";
//create comment
export function createLike(newLike){
    return async(dispatch,getState) => {
    try {
     const {data}= await request.post('/api/comments',newLike,{headers:{
         Authorization: 'Bearer ' + getState().auth.user.token,
         
    }});
    console.log('data:',data);
    dispatch(postActions.addLikeToPost(data));
    } catch (error) {
        toast.error(error.response.data.message);
    }
   }
}