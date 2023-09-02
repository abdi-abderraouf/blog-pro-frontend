import React, {useState,useEffect } from "react";
import './create-post.css';

import {toast} from "react-toastify";
import { useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
import { createPost } from "../../Redux/apiCalls/postApiCall";
import {RotatingLines} from "react-loader-spinner";
import { fetchCategories } from './../../Redux/apiCalls/categoryApiCalls';


const CreatePost = () => {
  const dispatch = useDispatch();
  const {categories}=useSelector(state=>state.category);
  const {loading,isPostCreated} = useSelector(state=>state.post);
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [category,setCategory]=useState("");
  const [file,setFile]=useState(null);  
  //const [form,setForm]=useState({});
      /*setForm({
        ...form,
        [e.target.name]: e.target.value
      })ceci est utiliser pour envoyer form sous forme de objet json*/

    // on utilise formdata puis quon a une image et on ajoute les donnees aux form avec append 
   
  //@ to do send form to server  
  const onsubmitHandler=(e)=>{
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
    if (!file) {
      return toast.error("Post image is required"); 
    }
    const formData = new FormData();
    formData.append("image",file); 
    formData.append("title",title); 
    formData.append("category",category); 
    formData.append("description",description);
    dispatch(createPost(formData));
  };
  const navigate = useNavigate();
useEffect(()=>{
   if (isPostCreated){
    navigate("/");
   }
},[isPostCreated,navigate]);

useEffect(()=>{
   dispatch(fetchCategories());
},[]);
  return (
    <section className="create-post">
      <h1 className="create-post-title">Create New Post</h1>
      <form onSubmit={onsubmitHandler} className="create-post-form">
        <input
        name="title"     
          type="text"
          placeholder="Post Title"
          className="create-post-input"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <select value={category} onChange={(e)=>{setCategory(e.target.value)}}
         className="create-post-input">
          <option disabled value="">
            Select A Category
          </option>
          {
            categories.map((cat,key)=>
              <option key={category._id} value={cat.title} >{cat.title}</option>
            )
          }  
        </select>
        <textarea className="create-post-textarea" rows="5" placeholder="description"
         value={description}
        onChange={(e)=>setDescription(e.target.value)}
       
        ></textarea>
        <input
          type="file"
          name="file"
          onChange={(e)=>setFile(e.target.files[0])}
          id="file"
          className="create-post-upload"
        />
        <div className="create-post-btn-container">
        <button type="submit" className="create-post-btn">
        {
          loading ? (
            <RotatingLines
             strokeColor="black"
             strokeWidth="5"
             animationDuration="0.75"
             width="40"
             visible={true}
                            />) : "Create"
        }
        </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
