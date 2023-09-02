import React,{useEffect}from "react";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import swal from 'sweetalert';
import {useSelector,useDispatch} from 'react-redux';
import { deleteCommentPosted, getAllComments } from "../../Redux/apiCalls/commentApiCall";
import { toast } from "react-toastify";

const CommentsTable = () => {
  const dispatch = useDispatch();
  const {comments} = useSelector(state=>state.comment); 
  useEffect(()=>{
     dispatch(getAllComments());
  },[comments]);
    //Delete post Handler 
    const deleteCommentHandler = (commentId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this comment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((isOk) => {
            if (isOk) {
              dispatch(deleteCommentPosted(commentId));
              swal("comment has been deleted!", {
                icon: "success",
              });
            } else {
              swal("something went wrong!");
            }
          });
    };  

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title"> Comments </h1>
        <table className="table">
          <thead>
            <tr>
              <th> Count </th>
              <th> User </th>
              <th> Comment </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item,index) => (
              <tr key={item._id}>
                <td>{index+1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item?.user?.profilePhoto?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item.username}</span>
                  </div>
                </td>
                <td>{item.text}</td>
                <td>
                  <div className="table-button-group">
                   
                    <button onClick={()=>deleteCommentHandler(item._id)}> Delete Comment </button>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CommentsTable;

