import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import swal from 'sweetalert';
import { useDispatch,useSelector } from "react-redux";
import { deleteCategory } from "../../Redux/apiCalls/categoryApiCalls";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../Redux/apiCalls/categoryApiCalls";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(state=>state.category);
  useEffect(()=>{
    dispatch(fetchCategories());
  },[categories]);
    //Delete category Handler 
    const deleteCategoryHandler = (categoryId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this category!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((isOk) => {
            if (isOk) {
              dispatch(deleteCategory(categoryId));
              swal("category has been deleted!", {
                icon: "success",
              });
            }
          });
    };  

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title"> Categories </h1>
        <table className="table">
          <thead>
            <tr>
              <th> Count </th>
              <th> Category Title </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item,index) => (
              <tr key={item._id}>
                <td>{index+1}</td>
                <td>
                  <div className="table-image">
                    <span className="table-username">{item.title}</span>
                  </div>
                </td>
                
                <td>
                  <div className="table-button-group">
                    <button onClick={()=>deleteCategoryHandler(item._id)}> Delete Category </button>
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

export default CategoriesTable;

