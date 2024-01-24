import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../components/Admin-User/Admin-login';
import AdminRegistration from '../components/Admin-User/Admin-registration';
import AdminForgetPassword from '../components/Admin-User/Admin-forgetpwd';



function AdminUserRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/register" element={<AdminRegistration />} />
            <Route path="/forget-password" element={<AdminForgetPassword />} />
            <Route path="/" element={<AdminLogin />} />
        </Routes>
    );
}

export default AdminUserRoutes;
