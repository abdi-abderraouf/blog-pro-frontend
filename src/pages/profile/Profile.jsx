import React, { useEffect, useState } from 'react'
import "./profile.css"
import {toast} from "react-toastify";
import swal from 'sweetalert';
import UpdateProfileModal from './UpdateProfileModal';
import { useDispatch,useSelector } from 'react-redux';
import { deleteProfile, getUserProfile, uploadProfilePhoto } from '../../Redux/apiCalls/profileApiCall';
import { useParams, useNavigate } from 'react-router-dom';
import PostItem from '../../components/header/posts/PostItem';
import { logoutUser } from '../../Redux/apiCalls/authApiCall';
import { Vortex } from  'react-loader-spinner'


const Profile  = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const {id} = useParams();
  const {user}=useSelector(state=>state.auth);
  const {profile,loading,isProfileDeleted} = useSelector(state=>state.profile);
  const[updateProfile,setUpdateProfile]=useState(false);
  useEffect(() => {
     dispatch(getUserProfile(id))
     window.scrollTo(0,0);
  },[id]);
  useEffect(() => {
    if(isProfileDeleted){
      navigate('/');
      window.scrollTo(0,0);
    }
 },[navigate,isProfileDeleted]);
  const[file,setFile]=useState(null);
  //form submit handler 
  const formSubmitHandler = (e) => {
      e.preventDefault();
      if(!file) return toast.warning("you must choose profile photo")
      const formData = new FormData(); 
      formData.append("image", file);
      dispatch(uploadProfilePhoto(formData));      
  };

   //Delete account Handler 
   const deleteAccountHandler = (e) => {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this profile!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((isOk) => {
        if (isOk) {   
          dispatch(deleteProfile(user?._id)); 
          dispatch(logoutUser());
         
         
        } 
      });  
};  

if(loading){
  return(
    <div className='profile-loader'>
    <Vortex
      visible={true}
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
   />
</div>
  );
}
      
      return (
        <section className='profile'>
        <div className='profile-header'>
        <div className='profile-image-wrapper'>
          <img src={file ? URL.createObjectURL(file):profile?.profilePhoto.url}
           alt="" className='profile-image'/>
           {
            (profile?._id===user?._id)&&( 
            <form  onSubmit={formSubmitHandler} className='form-profile'>
            <abbr title='choose profile photo'>
                <label htmlFor='file' className='bi bi-camera-fill  upload-profile-photo-icon'>
                </label>
            </abbr>
            <input style={{display:"none"}}
             type='file' 
             name='file' 
             id='file'
              onChange={(e)=>setFile(e.target.files[0])}
             />
            <button type='submit' className='upload-profile-photo-btn'>
               upload 
            </button>
          </form>)
           }

        </div>
             <h1 className='profile-username'>
               {profile?.username}
             </h1>
             <p className='profile-bio'>
                {profile?.bio}
             </p>
             <div className='user-date-joined'>
             <strong>
             Date joined:
            </strong>
            <span>
              {new Date(profile?.createdAt).toDateString()}
            </span>
            </div>
            {
              (profile?._id===user?._id)&&( <button onClick={()=>setUpdateProfile(true)} className='profile-update-btn'>
            <i  className='bi bi-file-person-fill'></i>
             update profile
            </button>)
            }
        </div>
        <div className='profile-posts-list'>
        <h2 className='profile-posts-list-title'> {profile?.username} posts</h2>
        {
          profile?.posts?.map((post)=>
          <PostItem key={post._id}
           post={post} 
            username={profile?.username}
            userId={profile?._id}
           />)
        }
        </div>
        {
          (profile?._id===user?._id)&&( <button onClick={deleteAccountHandler} className='delete-account-btn'> 
        delete your account
        </button> )
        }
        {updateProfile && ( <UpdateProfileModal profile ={profile}  setUpdateProfile={setUpdateProfile}/>)}
        </section>
    )
}

export default Profile;
