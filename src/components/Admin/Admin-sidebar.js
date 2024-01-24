import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../../Styles/Admin-sidebar.css';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export function AdminSidebar({ handleComponentSelect, dataReceived }) {
    // const navigate = useNavigate();
    const [tooltipv, settooltipv] = useState(false);
    useEffect(() => {

        if (dataReceived) {
            settooltipv((prevMenuCollapse) => !prevMenuCollapse);
            console.log('Data Received adminsidebar:', dataReceived);
        }
        // debugger;
    }, [dataReceived]);
    console.log('Data Received adminsidebar:', tooltipv);
    const handleLinkClick = (component) => {
        handleComponentSelect(component);
    };
    // const handleLogout = () => {

    //     navigate('/Admin');
    // };
    return (

        <div className="sidebarMenu" id="sidemenu" style={{ paddingTop: '50px', paddingInline: '0px' }} >

            <ul className="sideMenuList row" id="ul-menu">


                <li className="menuRow col-lg-12" id="menu-profile">
                    <Link className="d-block fs1  tduh text-nowrap verfications"
                        id="a-verify" to="/admin-dashboard/Verifications" onClick={() => handleLinkClick('Verifications')}>
                        <span className="changepassword">
                            <img id="1501346" src="../images/Admin-sidebar-icons/verifications-icon.svg"
                                className="iconsizeactive" alt='verification' />
                        </span>
                        {
                            tooltipv ? (
                                <span id="span-lbl" className="sidebartext">Verifications</span>
                            ) : (
                                <span className="ctooltip" id="s-tverify">Verifications</span>
                            )
                        }
                    </Link>
                </li>
                <li className="menuRow col-lg-12" id="menu-profile" >
                    <Link className="d-block fs1  tduh text-nowrap complaints"
                        id="a-verify" to="/admin-dashboard/Complaints" onClick={() => handleLinkClick('Complaints')}>
                        <span className="changepassword"> <img id="1501347" src="../images/Admin-sidebar-icons/complaints-icon.svg"
                            className="iconsize" alt='complaints' /></span>
                        {
                            tooltipv ? (
                                <span id="span-lbl" className="sidebartext">Complaints</span>
                            ) : (
                                <span className="ctooltip" id="s-tverify">Complaints</span>
                            )
                        }
                    </Link>

                </li>

                <li className="menuRow col-lg-12" id="menu-panels" onClick={() => handleLinkClick('Verifications')}>
                    <a href='/admin-dashboard/Verifications' className="d-block fs1  tduh text-nowrap panels" id="a-panels" >
                        <span className="changepassword"> <img id="1501346" src="../images/Admin-sidebar-icons/panels-icon.svg"
                            className="iconsizeactive" alt='panels' /></span>
                        {
                            tooltipv ? (
                                <span id="span-lbl" className="sidebartext">Panels</span>
                            ) : (
                                <span className="ctooltip" id="s-tverify">Panels</span>
                            )
                        }
                    </a>

                </li>
                <li className="menuRow col-lg-12" id="menu-testsdatabase" onClick={() => handleLinkClick('Verifications')} >
                    <a href='/admin-dashboard/Verifications' className="d-block fs1  tduh text-nowrap panels" id="a-panels">
                        <span className="changepassword"> <img id="1501346" src="../images/Admin-sidebar-icons/testconfiguration.svg"
                            className="iconsizeactive" alt='test-db' /></span>
                        {
                            tooltipv ? (
                                <span id="span-lbl" className="sidebartext">Test Database</span>
                            ) : (
                                <span className="ctooltip" id="s-tverify">Test Database</span>
                            )
                        }
                    </a>

                </li>
                <li className="menuRow col-lg-12" id="menu-testsdatabase" onClick={() => handleLinkClick('Verifications')}>
                    <a href='/admin-dashboard/Verifications' className="d-block fs1  tduh text-nowrap panels" id="a-panels">
                        <span className="changepassword"> <img id="1501346" src="../images/Admin-sidebar-icons/testconfiguration.svg"
                            className="iconsizeactive" alt='radiology-test' /></span>
                        {
                            tooltipv ? (
                                <span id="span-lbl" className="sidebartext">Radiology Test</span>
                            ) : (
                                <span className="ctooltip" id="s-tverify">Radiology Test</span>
                            )
                        }
                    </a>


                </li>



            </ul>

        </div>
    );
}
