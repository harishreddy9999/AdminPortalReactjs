import React from 'react';
import Sidebar from './Sidebar';
import './dashboard.css';
import { Route, Routes } from 'react-router-dom'; // Update import to use 'Route' and 'Routes' instead of 'BrowserRouter'
import Home from './Home';
import About from './About';
import Products from './Products';
import Contact from './Contact';
import PackagesList from './Packages';
import { Outlet } from 'react-router-dom';
import PatientsList from './PatientsList';
import PatientDetails from './PatientDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoaderProvider } from '../../services/LoaderContext';

function Dashboard() {
    return (
        // <LoaderProvider>
        <div className="dashboard">
            <div className="sidebar" style={{ width: '20%' }}>
                <Sidebar />
            </div>

            <div className="main-content" style={{ width: '80%' }}>

                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/patients" element={<PatientsList />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/packages" element={<PackagesList />} />
                    <Route path="/patientDetails/:id/:name" element={<PatientDetails />} />
                </Routes>
                <Outlet />

            </div>
            <ToastContainer limit={1} />
        </div>
        // </LoaderProvider>
    );
}

export default Dashboard;
