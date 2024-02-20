import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent'
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

function Dashboard() {

    const [selectedComponent, setSelectedComponent] = useState(null);
    const [dataToSend, setDataToSend] = useState(null);
    const [collapseSidebar, setcollapseSidebar] = useState(false);

    const sendDataToTarget = (data) => {
        // Handle the data as needed
        console.log('Data sent to target admin.js:', data);
        if (data) {
            setcollapseSidebar((prevcollapseSidebar) => !prevcollapseSidebar);
        }
        setDataToSend(data);
    };
    const handleComponentSelect = (component) => {
        // debugger;
        setSelectedComponent(component);
    };
    return (
        // <div className="dashboard">
        //     <div className="sidebar" style={{ width: '20%' }}>
        //         <Sidebar />
        //     </div>

        //     <div className="main-content" style={{ width: '80%' }}>

        //         <Routes>
        //             <Route path="/home" element={<Home />} />
        //             <Route path="/about" element={<About />} />
        //             <Route path="/patients" element={<PatientsList />} />
        //             <Route path="/products" element={<Products />} />
        //             <Route path="/contact" element={<Contact />} />
        //             <Route path="/packages" element={<PackagesList />} />
        //             <Route path="/patientDetails/:id/:name" element={<PatientDetails />} />
        //         </Routes>
        //         <Outlet />

        //     </div>
        // </div>

           <div className="row">
        
            <div className='col-12 dashboard-promainContent' >
                <div className={!collapseSidebar ? 'collapse-prosidebar-deskop' : 'collapse-prosidebar-deskop-expand'}>
                    {/* <Sidebar dataReceived={dataToSend} handleComponentSelect={handleComponentSelect} /> */}
                    <Sidebar sendDataToTarget={sendDataToTarget} handleComponentSelect={handleComponentSelect} />
                
                </div>
                <div className={!collapseSidebar ? 'promainContent' : 'promainContent-expand'}>
                <div className='col-12'>
                {/* <AdminHeader sendDataToTarget={sendDataToTarget} /> */}
            </div>
                   <div className='col-12'>
                    <MainContent selectedComponent={selectedComponent} handleComponentSelect={handleComponentSelect}  />

                </div>
                </div>

            </div>
            <ToastContainer limit={1} />
        </div>
    );
}

export default Dashboard;
