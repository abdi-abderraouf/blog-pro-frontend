import React, { useState } from 'react'
import {toast} from "react-toastify";
import { createCategory } from '../../Redux/apiCalls/categoryApiCalls';
import {useDispatch} from 'react-redux';

const AddCategoryForm = ({categories}) => {
    const dispatch = useDispatch();
    const [title,setTitle]=useState("")
    //Form submit Handler
    const formSubmitHandler = (e) => {
          e.preventDefault();
          if(title.trim()==="") return toast.error("category title is required");
          dispatch(createCategory({title}));
          setTitle("")
    };
    return (
        <div className="add-category">
           <h6 className='add-category-title'>Add New Category</h6>
           <form onSubmit={formSubmitHandler} >
           <div className='add-category-form-group'>
            <label htmlFor='title'>Category Title</label>
            <input 
            type='text' 
            id='title'
            placeholder='Enter Category Title'
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
            />
            <button type='submit' className='add-category-btn'>Add</button>
           </div>
           </form>
        </div>
    )
}

export default AddCategoryForm;
