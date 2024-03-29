import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import LoginForm from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/dashboard';
import AdminUserRoutes from './Routing/AdminUserRoutes';
import AdminDashboard from './components/Admin/Admin';
import Screening from './components/Screening/screening';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminUserRoutes />} />
        <Route path="/user-dashboard/*" element={<Dashboard />} />
        <Route path="/Admin/*" element={<AdminUserRoutes />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
        <Route path="/screening" element={<Screening />} />
      </Routes>
    </Router>

  );
}

export default App;
