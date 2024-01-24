import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import LoginForm from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import AdminUserRoutes from './Routing/AdminUserRoutes';
import AdminDashboard from './components/Admin/Admin';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/Admin/*" element={<AdminUserRoutes />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
