import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function Sidebar({ handleComponentSelect }) {
    const navigate = useNavigate();
    const handleLinkClick = (component) => {
        handleComponentSelect(component);
    };
    const handleLogout = () => {
        // Perform logout logic here

        // Redirect to the login form
        navigate('/');
    };
    return (
        <div className="sidebar" style={{ width: '20%' }}>
            <ul>
                <li>
                    <Link to="/dashboard/home" onClick={() => handleLinkClick('Home')}>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/about" onClick={() => handleLinkClick('About')}>
                        Profile
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard/services"
                        onClick={() => handleLinkClick('Services')}
                    >
                        Settings
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard/products"
                        onClick={() => handleLinkClick('Products')}
                    >
                        Templates
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard/contact"
                        onClick={() => handleLinkClick('Contact')}
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
