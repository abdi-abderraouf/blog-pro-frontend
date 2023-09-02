import {passwordActions  } from "../slices/passwordSlice";
import  request from '../../utils/request';
import {toast} from "react-toastify";


//Forgot Password 
export function forgotPassword(email){
    return async () => {
         try{
             const {data} = await request.post("/api/password/reset-password-link ",{email});
            toast.success(data.message);
            } catch(error)
            {
               toast.error(error.response.data.message)
            }      
    }
}

//Get Reset Password ( userId and token)
export function getResetPassword(userId,token){
    return async (dispatch) => {
         try{
             const res= await request.get(`/api/password/reset-password/${userId}/${token}`);
              console.log(res);
              console.log(res.data.message);
              if(res.data.message==='invalid link'){
                dispatch(passwordActions.setError(true));
                console.log(passwordActions.setError(true));
              }
            
            } catch(error){
               console.log(error); 
               dispatch(passwordActions.setError());
            }      
    }
}
// Reset Password (change the password and tape new password)
export function resetPassword(newPassword, user) {
    return async () => {
        try {
            const url = `/api/password/reset-password/${user.userId}/${user.token}`;
            const { data } = await request.post(url, { password: newPassword });
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        
        }
    }
}
