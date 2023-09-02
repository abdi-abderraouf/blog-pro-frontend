





import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateComment } from "../../Redux/apiCalls/commentApiCall";
import { fetchSinglePost } from "../../Redux/apiCalls/postApiCall";

const UpdateCommentModal = ({ setUpdateComment, commentForUpdate, postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(commentForUpdate?.text);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      return toast.error("Please write your comment");
    }
    dispatch(updateComment(commentForUpdate?._id, { text, postId }))
      .then(() => {
        toast.success("Comment updated successfully");
        setUpdateComment(false);
        dispatch(fetchSinglePost(postId))
      })
      .catch((error) => {
        toast.error("Error updating comment");
      });
  };
return (
    <div className="update-modal">
      <form onSubmit={formSubmitHandler}  className="update-modal-form">
        <abbr title="close">
          <i
            className="bi bi-x-circle-fill update-modal-form-close"
            onClick={() => setUpdateComment(false)}
          />
        </abbr>
        <h1 className="update-modal-title">Edit comment</h1>
        <input 
        type="text" 
        className="update-modal-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
         />
       
        <button type="submit"  className="update-modal-btn">
          update comment 
        </button>
      </form>
    </div>
  );
};

export default UpdateCommentModal;
