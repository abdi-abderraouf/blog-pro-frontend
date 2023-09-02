import React,{useState,useEffect} from "react";
import "../../index.css";
import {toast} from "react-toastify";
import { useDispatch,useSelector } from 'react-redux';
import {updatePost} from '../../Redux/apiCalls/postApiCall';
import {fetchCategories} from '../../Redux/apiCalls/categoryApiCalls';

const UpdatePostModal = ({ setUpdatePost, post }) => {
  const {categories}=useSelector(state=>state.category);
  const dispatch = useDispatch();
  const[title,setTitle]=useState(post.title);
  const[description,setDescription]=useState(post.description);
  const[category,setCategory]=useState(post.category);
  //Form submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      return toast.error("Post title is required");  
    }
    if (category.trim() === "") {
      return toast.error("Post category is required"); 
    }
    if (description.trim() === "") {
      return toast.error("Post description is required");
    }
    dispatch(updatePost({title,category,description},post?._id));
    toast.success('post updated successfully');
    setUpdatePost(false);
  }
  useEffect(()=>{
    dispatch(fetchCategories());
 },[]);

  return (
    <div className="update-modal">
      <form onSubmit={formSubmitHandler}  className="update-modal-form">
        <abbr title="close">
          <i
            className="bi bi-x-circle-fill update-modal-form-close"
            onClick={() => setUpdatePost(false)}
          />
        </abbr>
        <h1 className="update-modal-title">Update post</h1>
        <input 
        type="text" 
        className="update-modal-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
         />
        <select  
        className="update-modal-input"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        >
            <option value="" disabled>
                Select A Category
            </option>
            
                {
                  categories.map((cat,key)=> 
                  <option key={cat._id} value={cat.title}>
                    {cat.title}
                  </option>)
                }
            
            
        </select>
        <textarea className="update-modal-textarea" rows="5"
          value={description}
        onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit"  className="update-modal-btn">
          update

        </button>
        
      </form>
    </div>
  );
};

export default UpdatePostModal;
