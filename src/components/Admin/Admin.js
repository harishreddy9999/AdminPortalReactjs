import React, { useState } from 'react';
import { AdminMainContent } from './Admin-routing';
import { AdminSidebar } from './Admin-sidebar';
import AdminHeader from './Admin-header';
import '../../App.css';
import '../../Styles/Admin-dashboard.css';


function AdminDashboard() {
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
        setSelectedComponent(component);
    };

    return (
        <div className="row">
            <div className='col-12'>
                <AdminHeader sendDataToTarget={sendDataToTarget} />
            </div>
            <div className='col-12 dashboard-mainContent' >
                <div className={!collapseSidebar ? 'collapse-sidebar-deskop' : 'collapse-sidebar-deskop-expand'}>
                    <AdminSidebar dataReceived={dataToSend} handleComponentSelect={handleComponentSelect} />
                </div>
                <div className={!collapseSidebar ? 'mainContent' : 'mainContent-expand'}>
                    <AdminMainContent selectedComponent={selectedComponent} />
                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;
