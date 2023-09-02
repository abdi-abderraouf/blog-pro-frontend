import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './post-details.css';
import { toast } from 'react-toastify';
import AddComment from '../../components/comments/AddComment';
import CommentList from '../../components/comments/CommentList';
import swal from 'sweetalert';
import UpdatePostModal from './UpdatePostModal';
import {useDispatch,useSelector} from "react-redux";
import {fetchSinglePost,toggleLikePost,updateImageToPost,deletePostDetail} from '../../Redux/apiCalls/postApiCall.js'
import { useNavigate } from 'react-router-dom';



const PostDetails = () => {

  const dispatch = useDispatch();
  const {id} = useParams();
  const [file,setFile]=useState(null);
  const [updatePost,setUpdatePost]=useState(false);
 
  const {user} = useSelector(state=>state.auth);
  useEffect(()=>{
    dispatch(fetchSinglePost(id));
    window.scrollTo(0, 0);// pour ouvrir la page du haut non pas du bas 
  },[dispatch,id])  
    const {post} = useSelector(state=>state.post);
    console.log("post:",post);
    //update image : upload de nouveau une autre image 
    const updateImageSubmitHandler = (e) => {
          e.preventDefault();
          if (!file) return toast.warning('there is no file to upload');
          const formData = new FormData();
          formData.append("image",file);
           dispatch(updateImageToPost(formData,post?._id));    
    };

    const navigate = useNavigate();
    //Delete post Handler 
    const deletePostHandler = (e) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((isOk) => {
            if(isOk) {
              dispatch(deletePostDetail(post?._id))
              navigate(`/profile/${user?._id}`);
              swal("post has been deleted!", {
                icon: "success",
              });
            } else {
              swal("something went wrong!");
            }
          });
    };  
    
    const UpdatePostModalHandler = (e) => {
      setUpdatePost(true);
    }


    return (
        <section className='post-details'>
        {post ?  (
          <>  
            <div className='post-details-image-wrapper'>
                <img src={ file ? URL.createObjectURL(file):post?.image.url} alt="" className='post-details-image'/> 
                {(post?.user?._id===user?._id)&& ( <form onSubmit={updateImageSubmitHandler} className='update-post-image-form'>
                    <label htmlFor='file' className='update-post-label'>
                    <i className='bi bi-image-fill'></i>
                    Select new image 
                    </label>
                    <input 
                    style={{display:'none'}}
                     type='file'
                     name='file' 
                     id='file'
                     onChange={(e) => setFile(e.target.files[0])}
                     /> 
                    <button style={{color:'ActiveCaption'}} type='submit'>Upload</button>
                 </form> ) }
                      </div>
            <h1 className='post-details-title'>{post?.title}</h1>
            <div className='post-details-user-info'>              
              <img src={post?.user.profilePhoto?.url} alt="" className='post-details-user-image'/>
                <div className='post-details-user'>
                    <strong>
                        <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
                    </strong>
                    <span>{new Date(post?.createdAt).toDateString()}</span>
                </div>
            </div>
            <p className='post-details-description'>
                {post?.description}
                lorem ipsum dolor sit amet, consectetur adip
                lorem ipsum dolor sit amet, consectetur adip
                lorem ipsum dolor sit amet, consectetur adip
                lorem ipsum dolor sit amet, consectetur adip
                lorem ipsum dolor sit amet, consectetur adip
                lorem ipsum dolor sit amet, consectetur adip
            </p>
            <div className='post-details-icon-wrapper'>
                <div>
                {
                  user &&( 
                    <i onClick={()=>dispatch(toggleLikePost(post?._id))}
                     className={
                      post?.likes.includes(user?._id)?"bi bi-hand-thumbs-up-fill": "bi bi-hand-thumbs-up"
                     }></i> )
                }
                
                <small>{post?.likes.length} likes</small>    
                </div>
                {(post?.user?._id===user?._id)&& (
                  <div>
                  <i className='bi bi-pencil-square'  onClick={UpdatePostModalHandler}></i>
                  
                  <i className='bi bi-trash-fill' onClick={deletePostHandler}></i>
                </div> )}

            </div>
            { user &&(<><AddComment postId={post?._id}/>
                   </> )
                   }
                   <CommentList comments = {post?.comments}/>
                   
                      {updatePost && <UpdatePostModal post = {post} setUpdatePost={setUpdatePost}/> }

        
       </>
        ): (
          <p>Loading...</p>
        )}
      </section>
    );
            
        }
export default PostDetails; 
