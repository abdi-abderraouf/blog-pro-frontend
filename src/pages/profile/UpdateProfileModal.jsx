import React,{useState} from "react";
import "../../index.css";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../Redux/apiCalls/profileApiCall";


const UpdateProfileModal = ({ setUpdateProfile,profile}) => {
  const dispatch = useDispatch();
   const [username,setUsername] = useState(profile.username);
   const [bio,setBio] = useState(profile.bio);
    const[password,setPassword]=useState("");
    
  //Form submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const updatedUser={username,bio};
  if (password.trim() !== "") {
    updatedUser.password = password;
  }
  // Dispatch the action to update the profile state in Redux
  dispatch(updateProfile(profile?._id,updatedUser));
  setUpdateProfile(false);

};

  return (
    <div className="update-modal">
      <form onSubmit={formSubmitHandler}  className="update-modal-form">
        <abbr title="close">
          <i
            className="bi bi-x-circle-fill update-modal-form-close"
            onClick={() => setUpdateProfile(false)}
          />
        </abbr>
        <h1 className="update-modal-title">Update your profile</h1>
        <input 
        type="text" 
        className="update-modal-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
         />
        <input 
        type="text" 
        className="update-modal-input"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="bio"
         />

        <input 
        type="password" 
        className="update-modal-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
         />
        <button type="submit"  className="update-modal-btn">
          update profile
          
        </button>
      </form>
    </div>
  );
};


export default UpdateProfileModal;
