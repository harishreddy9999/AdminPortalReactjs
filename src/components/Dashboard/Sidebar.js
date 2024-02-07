import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout logic here

        // Redirect to the login form
        navigate('/');
    };
    return (
        <div className="row">
            <ul>
                <li>
                    <Link to="/user-dashboard/home" >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/user-dashboard/about" >
                        Profile
                    </Link>
                </li>
                <li>
                    <Link
                        to="/user-dashboard/patients"
                    >
                        Patients
                    </Link>
                </li>
                <li>
                    <Link
                        to="/user-dashboard/products"
                    >
                        Templates
                    </Link>
                </li>
                <li>
                    <Link
                        to="/user-dashboard/contact"
                    >
                        Customer Support
                    </Link>
                </li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
