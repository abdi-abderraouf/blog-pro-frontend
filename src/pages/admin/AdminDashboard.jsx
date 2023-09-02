import React from 'react'
import AdminSidebar from './AdminSidebar';
import AdminMain from './AdminMain';
import "./admin.css";
const AdminDashboard = ({users}) => {
    return (
        <section className="admin-dashboard">
           <AdminSidebar/>
           <AdminMain user={users}/>
        </section>
    );
}

export default AdminDashboard;
