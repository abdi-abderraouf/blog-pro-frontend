import React from 'react';
import './add-comment.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../Redux/apiCalls/commentApiCall';

const AddComment = ({postId}) => {
  const dispatch = useDispatch();
  console.log("postid:",postId);
  //const postId = useSelector((state) => state.comment?.postId?.toString());
  const [text, setText] = useState('');
  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text?.trim() === '') return toast.error('Please enter your comment');
    try {
      // Dispatch the createComment action with the required data
      dispatch(createComment({ text, postId }));
    } catch (error) {
      console.log(error);
    }

    setText('');
  };


  return (
    <form onSubmit={formSubmitHandler} className='add-comment'>
      <input
        type='text'
        placeholder='Add a comment'
        className='add-comment-input'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type='submit' className='add-comment-btn'>
        Comment
      </button>
    </form>
  );
};

export default AddComment;
