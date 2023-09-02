import { authActions } from "../slices/authSlice";
import  request from '../../utils/request';
import {toast} from "react-toastify";


//Login User 
export function loginUser(user){
    return async (dispatch) => {
         try{
             /* ici on utilise fetch mais on vas le remplacer par axios
             const response = await fetch("http://localhost:8000/api/auth/login",{
             method: "POST",
             body: JSON.stringify(user),
             headers:{
                "content-type": "application/json"
             }
             });
             const data = await response.json();
             dispatch(authActions.login(data));*/

             const res = await request.post("/api/auth/login",user);
            console.log(res);
             dispatch(authActions.login(res.data));
             localStorage.setItem('userInfo', JSON.stringify(res.data));
            } catch(error)
            {
               toast.error(error.response.data.message)
            }    
       
    }
}
//Logout User 
export function logoutUser(){
   return (dispatch) => {
            dispatch(authActions.logout());
            localStorage.removeItem('userInfo');  
   }
}

//Register User 
export function registerUser(user){
   return async (dispatch) => {
        try{
            const res = await request.post("/api/auth/register",user);
           toast.success(res.data.message);
            dispatch(authActions.register(res.data));
           } catch(error)
           {
              toast.error(error.response.data.message)
           }    
      
   }
}

//Verify Email 
export function verifyEmail(userId,token){
   return async (dispatch) => {
        try{
             await request.get(`/api/auth/${userId}/verify/${token}`);
             dispatch(authActions.setIsEmailVerified());
           } catch(error)
           {
              console.log(error);
           }    
      
   }
}




