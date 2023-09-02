import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import {useSelector,useDispatch} from 'react-redux';
import {getAllUsersProfile,deleteProfile} from '../../Redux/apiCalls/profileApiCall';


const UsersTable = () => {
  const dispatch = useDispatch();
  const {profiles,isProfileDeleted} = useSelector(state=>state.profile); 
  console.log('users de usersTables:',profiles);
  useEffect(()=>{
    dispatch(getAllUsersProfile());
  },[isProfileDeleted]);
    //Delete post Handler 
    const deleteUserHandler = (userId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((isOk) => {
            if (isOk) {
             dispatch(deleteProfile(userId));
              swal("user has been deleted!", {
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
        <h1 className="table-title"> Users </h1>
        <table className="table">
          <thead>
            <tr>
              <th> Count </th>
              <th> User </th>
              <th> Email </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {profiles?.map((item,index) => (
              <tr key={item._id}>
                <td>{index+1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item?.profilePhoto?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item?.username}</span>
                  </div>
                </td>
                <td>{item?.email}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/${item?._id}`}>View Profile</Link>
                    </button>
                    <button onClick={(e)=>deleteUserHandler(item?._id)}> Delete User </button>
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

export default UsersTable;
