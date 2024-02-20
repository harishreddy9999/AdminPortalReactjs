import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Admin-sidebar.css';

function Sidebar({ handleComponentSelect,sendDataToTarget }) {
    const navigate = useNavigate();
    const [tooltipv, settooltipv] = useState(false);
    const [menuCollapse, setMenuCollapse] = useState(false);

    const handleLogout = () => {
        // Perform logout logic here
        // Redirect to the login form
        navigate('/');
    };
    console.log('Data Received adminsidebar:', tooltipv);
    const handleLinkClick = (component) => {
        handleComponentSelect(component);
    };
    const toggleFunctionality = () => {
        setMenuCollapse((prevMenuCollapse) => !prevMenuCollapse);
        settooltipv((prevMenuCollapse) => !prevMenuCollapse);
        let obj = {
            response: 'desktop',
            collapse: false,
        }

        sendDataToTarget(obj);
    }


    return (
        // <div className="row">
        //     <ul>
        //         <li>
        //             <Link to="/user-dashboard/home" >
        //                 Dashboard
        //             </Link>
        //         </li>
        //         <li>
        //             <Link to="/user-dashboard/about" >
        //                 Profile
        //             </Link>
        //         </li>
        //         <li>
        //             <Link
        //                 to="/user-dashboard/patients"
        //             >
        //                 Patients
        //             </Link>
        //         </li>
        //         <li>
        //             <Link
        //                 to="/user-dashboard/products"
        //             >
        //                 Templates
        //             </Link>
        //         </li>
        //         <li>
        //             <Link
        //                 to="/user-dashboard/contact"
        //             >
        //                 Customer Support
        //             </Link>
        //         </li>
        //         <li>
        //             <button onClick={handleLogout}>Logout</button>
        //         </li>
        //     </ul>
        // </div>

        <div className="sidebarMenu" id="sidemenu"  >

            <ul className="sideMenuList row" id="ul-menu">
                <li>
                    <div id="178" className="ds">
                        <button type="button" id="toggle" className={`toggleIcon ${menuCollapse ? 'open' : ''}`} onClick={toggleFunctionality} >
                            <span className="icon-bar bg3" id="stgl"></span>
                            <span className="icon-bar bg3" id="stogl"></span>
                            <span className="icon-bar bg3" id="stoggle"></span>
                        </button>
                    </div>
                </li>

                <li className="menuRow col-lg-12" id="menu-profile">
                    <Link className="d-block fs1  tduh text-nowrap verfications"
                        id="a-verify" to="/user-dashboard/patients" onClick={() => handleLinkClick('Patients')}>
                        <span className="changepassword">
                            <img id="1501346" src="../images/Admin-sidebar-icons/verifications-icon.svg"
                                className="iconsizeactive" alt='verification' />
                        </span>
                        {
                            tooltipv ? (
                                <span id="span-lbl" className="sidebartext">Patients</span>
                            ) : (
                                <span className="ctooltip" id="s-tverify">Patients</span>
                            )
                        }
                    </Link>
                </li>
                <li className="menuRow col-lg-12" id="menu-profile">
                    <Link className="d-block fs1  tduh text-nowrap verfications"
                        id="a-verify" to="/user-dashboard/Home" onClick={() => handleLinkClick('Home')}>
                        <span className="changepassword">
                            <img id="1501346" src="../images/Admin-sidebar-icons/verifications-icon.svg"
                                className="iconsizeactive" alt='verification' />
                        </span>
                        {
                            tooltipv ? (
                                <span id="span-lbl" className="sidebartext">Dashboard</span>
                            ) : (
                                <span className="ctooltip" id="s-tverify">Dashboard</span>
                            )
                        }
                    </Link>
                </li>
                <li className="menuRow col-lg-12" id="menu-profile">
                    <Link className="d-block fs1  tduh text-nowrap verfications"
                        id="a-verify" to="/user-dashboard/patients" onClick={() => handleLinkClick('Patients')}>
                        <span className="changepassword">
                            <img id="1501346" src="../images/Admin-sidebar-icons/verifications-icon.svg"
                                className="iconsizeactive" alt='verification' />
                        </span>
                        {
                            tooltipv ? (
                                <span id="span-lbl" className="sidebartext">Patients</span>
                            ) : (
                                <span className="ctooltip" id="s-tverify">Patients</span>
                            )
                        }
                    </Link>
                </li>
                <li className="menuRow col-lg-12" id="menu-profile">
                    <Link className="d-block fs1  tduh text-nowrap verfications"
                        id="a-verify" to="/user-dashboard/patients" onClick={() => handleLinkClick('Patients')}>
                        <span className="changepassword">
                            <img id="1501346" src="../images/Admin-sidebar-icons/verifications-icon.svg"
                                className="iconsizeactive" alt='verification' />
                        </span>
                        {
                            tooltipv ? (
                                <span id="span-lbl" className="sidebartext">Patients</span>
                            ) : (
                                <span className="ctooltip" id="s-tverify">Patients</span>
                            )
                        }
                    </Link>
                </li>



            </ul>

        </div>
    );
}

export default Sidebar;
