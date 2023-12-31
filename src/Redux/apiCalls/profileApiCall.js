import { profileActions } from "../slices/profileSlice";
import  request from '../../utils/request';
import {toast} from "react-toastify";
import { authActions } from "../slices/authSlice";

// Get User Profile
export function getUserProfile(userId){
    return async(dispatch) => {
    try {
       const {data} = await request.get(`/api/users/profile/${userId}`);
       dispatch(profileActions.setProfile(data));   
    } catch (error) {
        toast.error(error.response.data.message);
    }
   }
}
// Upload  Profile Photo 
export function uploadProfilePhoto(newPhoto){
    return async(dispatch,getState) => {
       // const state = getState();
    try {
       const {data} = await request.post(`/api/users/profile/upload-photo-profile`,newPhoto,{
         headers:{Authorization: 'Bearer ' + getState().auth.user.token,
        "Content-Type":'multipart/form-data'}
        
       });
       dispatch(profileActions.setProfilePhoto(data.profilePhoto)); 
       dispatch(authActions.setUserPhoto(data.profilePhoto));
       toast.success(data.message);
       //localStorage.setItem(data.profilePhoto);
       const user = JSON.parse(localStorage.getItem("userInfo"));
       user.profilePhoto=data?.profilePhoto;
       localStorage.setItem("userInfo",JSON.stringify(user));
        } catch (error) {
        toast.error(error.response.data.msg);
    }
   }
}

// Update   Profile
export function updateProfile(userId, profile){
   return async(dispatch,getState) => {
      // const state = getState();
   try {
      const {data} = await request.put(`/api/users/profile/${userId}`,profile,{
         headers:{Authorization: 'Bearer ' + getState().auth.user.token}
       });
      dispatch(profileActions.updateProfile(data)); 
      dispatch(authActions.setUsername(data.username));
      //toast.success(data.message);
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.username=data?.username;
      localStorage.setItem("userInfo",JSON.stringify(user));
       } catch (error) {
       toast.error(error.response.data.msg);
   }
  }
}

//delete profile (Account)
export function deleteProfile(userId){
   return async(dispatch,getState) => {
   try {
         dispatch(profileActions.setLoading());
         const {data}= await request.delete(`/api/users/profile/${userId}`,{headers:{
        Authorization: 'Bearer ' + getState().auth.user.token,
        }});
        dispatch(profileActions.setIsProfileDeleted(data));
        toast.success(data?.message);
        setTimeout(() => 
        dispatch(profileActions.clearIsProfileDeleted()),2000);
 
   } catch (error) {
       toast.error(error.response.data.message);
       dispatch(profileActions.clearLoading());
   }
  }
}

//get users count (for Admin Dashboars)
export function getUsersCount(){
   return async(dispatch,getState) => {
   try {
         const {data}= await request.get('/api/users/count',{headers:{
        Authorization: 'Bearer ' + getState().auth.user.token,
        }});
        dispatch(profileActions.setUserCount(data));
 
   } catch (error) {
       toast.error(error.response.data.message);
   }
  }
}

//get All users Profiles (for Admin Dashboars)
export function getAllUsersProfile(){
   return async(dispatch,getState) => {
   try {
         const {data}= await request.get('/api/users/profile',{headers:{
        Authorization: 'Bearer ' + getState().auth.user.token,
        }});
        dispatch(profileActions.setProfiles(data));
 
   } catch (error) {
       toast.error(error.response.data.message);
   }
  }
}