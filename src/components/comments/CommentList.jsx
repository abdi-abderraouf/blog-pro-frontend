import React, { useState } from 'react';
import './comment-list.css';
import swal from 'sweetalert';
import UpdateCommentModal from './UpdateCommentModal';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentPosted } from '../../Redux/apiCalls/commentApiCall';


const CommentList = ({ comments }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

  // Update Comment Handler
  const updateCommentHandler = comment => {
    console.log('comment ds commentList', comment);
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };

  // Delete comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(isOk => {
      if (isOk) {
        dispatch(deleteCommentPosted(commentId));
        swal('comment has been deleted!', {
          icon: 'success',
        });
      }
    });
  };

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} comments</h4>
      {comments?.map(comment => (
        <div key={comment._id} className="comment-item">
          <div className="comment-item-info">
            <div className="comment-item-username">{comment.username}</div>
            <div className="comment-item-time">
              <Moment fromNow ago>
                {comment.createdAt}
              </Moment>{' '}
              ago
            </div>
          </div>
          <p className="comment-item-text">{comment.text}</p>
          {user?._id === comment.user && (
            <div className="comment-item-icon-wrapper">
              <i
                onClick={() => updateCommentHandler(comment)}
                className="bi bi bi-pencil-square"
              ></i>
              <i
                onClick={() => deleteCommentHandler(comment?._id)}
                className="bi bi bi-trash-fill"
              ></i>
            </div>
          )}
          {updateComment && (
            <UpdateCommentModal
              commentForUpdate={commentForUpdate}
              postId={comment.postId}
              setUpdateComment={setUpdateComment}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
