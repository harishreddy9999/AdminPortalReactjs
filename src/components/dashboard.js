import React, { useState } from 'react';
// import React from 'react';
// import { Link, Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import './dashboard.css';

function Dashboard() {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleComponentSelect = (component) => {
        setSelectedComponent(component);
    };

    return (
        <div className="dashboard">
            <Sidebar handleComponentSelect={handleComponentSelect} />
            <MainContent selectedComponent={selectedComponent} />

        </div>
    );
}

export default Dashboard;
