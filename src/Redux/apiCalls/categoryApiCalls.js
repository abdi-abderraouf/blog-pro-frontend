import { categoryActions } from "../slices/categorySlice";
import  request from '../../utils/request';
import {toast} from "react-toastify";


// Fetch All categories
export function fetchCategories(){
    return async(dispatch) => {
    try {
       const {data} = await request.get('/api/categories');
       console.log(data);
       dispatch(categoryActions.setCategories(data));   
    } catch (error) {
        toast.error(error.response.data.message);
    }
   }
}

// create category
export function createCategory(newCategory){
    return async(dispatch,getState) => {
    try {
       const {data} = await request.post('/api/categories',newCategory,{headers:{
        Authorization: 'Bearer ' + getState().auth.user.token,
        }});
       dispatch(categoryActions.addCategory(data)); 
       toast.success('category created successfully');  
    } catch (error) {
        toast.error(error.response.data.message);
    }
   }
}

// delete category
export function deleteCategory(catId){
    return async(dispatch,getState) => {
    try {
       const {data} = await request.delete(`/api/categories/${catId}`,{headers:{
        Authorization: 'Bearer ' + getState().auth.user.token,
        }});
       console.log('data de categoryapicall',data);
       dispatch(categoryActions.deleteCat(data.catId))
       toast.success(data.message);   
    } catch (error) {
        toast.error(error.response.data.message);
    }
   }
}