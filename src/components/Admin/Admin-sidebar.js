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
                        id="a-verify" to="/admin-dashboard/NewVerifications" onClick={() => handleLinkClick('Verifications')}>
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
                        id="a-verify" to="/admin-dashboard/NewComplaints" onClick={() => handleLinkClick('NewComplaints')}>
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
                <li className="menuRow col-lg-12" id="menu-profile" >
                    <Link className="d-block fs1  tduh text-nowrap complaints"
                        id="a-verify" to="/admin-dashboard/Coupons" onClick={() => handleLinkClick('Coupons')}>
                        <span className="changepassword"> <img id="1501Coupons" src="../images/Admin-sidebar-icons/coupon-icon.svg"
                            className="iconsize" alt='Coupons' /></span>
                        {
                            tooltipv ? (
                                <span id="span-lblCoupons" className="sidebartext">Coupons</span>
                            ) : (
                                <span className="ctooltip" id="s-tCouponsverify">Coupons</span>
                            )
                        }
                    </Link>

                </li>

                <li className="menuRow col-lg-12" id="menu-profile" >
                    <Link className="d-block fs1  tduh text-nowrap complaints"
                        id="a-verify" to="/admin-dashboard/Panels" onClick={() => handleLinkClick('Panels')}>
                        <span className="changepassword"> <img id="150Panels" src="../images/Admin-sidebar-icons/panels-icon.svg"
                            className="iconsize" alt='Panels' /></span>
                        {
                            tooltipv ? (
                                <span id="span-lbl" className="sidebartext">Panels</span>
                            ) : (
                                <span className="ctooltip" id="s-tPanelsverify">Panels</span>
                            )
                        }
                    </Link>

                </li>

                <li className="menuRow col-lg-12" id="menu-profile" >
                    <Link className="d-block fs1  tduh text-nowrap complaints"
                        id="a-verify" to="/admin-dashboard/CustomDrugs" onClick={() => handleLinkClick('CustomDrugs')}>
                        <span className="changepassword"> <img id="150Drugs" src="../images/Admin-sidebar-icons/customdrugs-icon.svg"
                            className="iconsize" alt='Drugs' /></span>
                        {
                            tooltipv ? (
                                <span id="span-lbl" className="sidebartext">Custom Drugs</span>
                            ) : (
                                <span className="ctooltip" id="s-tDrugsverify">Custom Drugs</span>
                            )
                        }
                    </Link>

                </li>

                <li className="menuRow col-lg-12" id="menu-profile" >
                    <Link className="d-block fs1  tduh text-nowrap complaints"
                        id="a-verify" to="/admin-dashboard/Healthtips" onClick={() => handleLinkClick('Healthtips')}>
                        <span className="changepassword"> <img id="150Healthtips" src="../images/Admin-sidebar-icons/healthtip.svg"
                            className="iconsize" alt='Tips' /></span>
                        {
                            tooltipv ? (
                                <span id="span-lbl" className="sidebartext">Health Tips</span>
                            ) : (
                                <span className="ctooltip" id="s-tTipsverify">Health Tips</span>
                            )
                        }
                    </Link>

                </li>
                <li className="menuRow col-lg-12" id="menu-profile" >
                    <Link className="d-block fs1  tduh text-nowrap complaints"
                        id="a-wellness" to="/admin-dashboard/Wellness" onClick={() => handleLinkClick('Wellness')}>
                        <span className="changepassword"> <img id="150Wellness" src="../images/Admin-sidebar-icons/verifications-icon.svg"
                            className="iconsize" alt='Wellness' /></span>
                        {
                            tooltipv ? (
                                <span id="span-lbl-Wellness" className="sidebartext">Wellness</span>
                            ) : (
                                <span className="ctooltip" id="s-Wellness">Wellness</span>
                            )
                        }
                    </Link>

                </li>


            </ul>

        </div>
    );
}
