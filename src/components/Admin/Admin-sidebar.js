import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../../Styles/Admin-sidebar.css';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export function AdminSidebar({ handleComponentSelect, dataReceived }) {
    // const navigate = useNavigate();
    const [tooltipv, settooltipv] = useState(false);
    const [selectedActiveLink, setSelectedActiveLink] = useState('');
    useEffect(() => {

        if (dataReceived) {
            settooltipv((prevMenuCollapse) => !prevMenuCollapse);
            console.log('Data Received adminsidebar:', dataReceived);
        }
        if (sessionStorage.getItem("activeLink")) {
            setSelectedActiveLink(sessionStorage.getItem("activeLink"));
        }
        // debugger;
    }, [dataReceived]);
    console.log('Data Received adminsidebar:', tooltipv);
    const handleLinkClick = (component) => {
        sessionStorage.setItem("activeLink", component);
        setSelectedActiveLink(component)
        handleComponentSelect(component);
    };
    // const handleLogout = () => {

    //     navigate('/Admin');
    // };
    return (

        <div className="sidebarMenu" id="sidemenu" style={{ paddingTop: '50px', paddingInline: '0px' }} >

            <ul className="sideMenuList row" id="ul-menu">


                <li className="menuRow col-lg-12" id="menu-profile">
                    <Link className={`d-block fs1 tduh text-nowrap verfications ${selectedActiveLink === 'Verifications' ? 'activeRouteLink' : ''}`}
                        id="a-verify" to="/admin-dashboard/Verifications" onClick={() => handleLinkClick('Verifications')}>
                        <span className="changepassword">
                            {selectedActiveLink === 'Verifications' ?
                                (
                                    <img src="../images/Admin-sidebar-icons/verifications-active-icon.svg"
                                        className="iconsizeactive" alt='verification' />) : (
                                    <img src="../images/Admin-sidebar-icons/verifications-icon.svg"
                                        className="iconsizeactive" alt='verification' />
                                )
                            }

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
                    <Link className={`d-block fs1  tduh text-nowrap complaints ${selectedActiveLink === 'Complaints' ? 'activeRouteLink' : ''}`}
                        id="a-verify" to="/admin-dashboard/Complaints" onClick={() => handleLinkClick('Complaints')}>
                        <span className="changepassword">
                            {selectedActiveLink === 'Complaints' ?
                                (
                                    <img src="../images/Admin-sidebar-icons/complaints-icon-active.svg"
                                        className="iconsize" alt='complaints' />) : (
                                    <img src="../images/Admin-sidebar-icons/complaints-icon.svg"
                                        className="iconsize" alt='complaints' />
                                )
                            }

                        </span>
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
                    <Link className={`d-block fs1  tduh text-nowrap complaints ${selectedActiveLink === 'Panels' ? 'activeRouteLink' : ''}`}
                        id="a-verify" to="/admin-dashboard/Panels" onClick={() => handleLinkClick('Panels')}>
                        <span className="changepassword">
                            {selectedActiveLink === 'Panels' ?
                                (
                                    <img src="../images/Admin-sidebar-icons/panels-icon-active.svg"
                                        className="iconsize" alt='Panels' />) : (
                                    <img src="../images/Admin-sidebar-icons/panels-icon.svg"
                                        className="iconsize" alt='Panels' />
                                )
                            }

                        </span>
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
                    <Link className={`d-block fs1  tduh text-nowrap complaints ${selectedActiveLink === 'Subscriptions' ? 'activeRouteLink' : ''}`}
                        id="a-verify" to="/admin-dashboard/Subscriptions" onClick={() => handleLinkClick('Subscriptions')}>
                        <span className="changepassword">
                            {selectedActiveLink === 'Subscriptions' ?
                                (
                                    <img src="../images/Admin-sidebar-icons/subscriptionactive.svg"
                                        className="iconsize" alt='Subscriptions' />) : (
                                    <img src="../images/Admin-sidebar-icons/subscription.svg"
                                        className="iconsize" alt='Subscriptions' />
                                )
                            }

                        </span>
                        {
                            tooltipv ? (
                                <span id="span-lblSubscriptions" className="sidebartext">Subscriptions</span>
                            ) : (
                                <span className="ctooltip" id="s-Subscriptionsverify">Subscriptions</span>
                            )
                        }
                    </Link>

                </li>
                <li className="menuRow col-lg-12" id="menu-profile" >
                    <Link className={`d-block fs1  tduh text-nowrap complaints ${selectedActiveLink === 'Coupons' ? 'activeRouteLink' : ''}`}
                        id="a-verify" to="/admin-dashboard/Coupons" onClick={() => handleLinkClick('Coupons')}>
                        <span className="changepassword">
                            {selectedActiveLink === 'Coupons' ?
                                (
                                    <img src="../images/Admin-sidebar-icons/coupon-active.svg"
                                        className="iconsize" alt='coupon' />) : (
                                    <img src="../images/Admin-sidebar-icons/coupon-icon.svg"
                                        className="iconsize" alt='coupon' />
                                )
                            }
                        </span>
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
                    <Link className={`d-block fs1  tduh text-nowrap complaints ${selectedActiveLink === 'Users' ? 'activeRouteLink' : ''}`}
                        id="a-verify" to="/admin-dashboard/Users" onClick={() => handleLinkClick('Users')}>
                        <span className="changepassword">
                            {selectedActiveLink === 'Users' ?
                                (
                                    <img src="../images/Admin-sidebar-icons/users-icon-active.svg"
                                        className="iconsize" alt='Users' />) : (
                                    <img src="../images/Admin-sidebar-icons/users-icon.svg"
                                        className="iconsize" alt='Users' />
                                )
                            }

                        </span>
                        {
                            tooltipv ? (
                                <span id="span-lbl-Users" className="sidebartext">Users</span>
                            ) : (
                                <span className="ctooltip" id="s-Usersverify">Users</span>
                            )
                        }
                    </Link>

                </li>

                <li className="menuRow col-lg-12" id="menu-profile" >
                    <Link className={`d-block fs1  tduh text-nowrap complaints ${selectedActiveLink === 'CustomDrugs' ? 'activeRouteLink' : ''}`}
                        id="a-verify" to="/admin-dashboard/CustomDrugs" onClick={() => handleLinkClick('CustomDrugs')}>
                        <span className="changepassword">
                            {selectedActiveLink === 'CustomDrugs' ?
                                (
                                    <img src="../images/Admin-sidebar-icons/customdrugs-icon-active.svg"
                                        className="iconsize" alt='CustomDrugs' />) : (
                                    <img src="../images/Admin-sidebar-icons/customdrugs-icon.svg"
                                        className="iconsize" alt='CustomDrugs' />
                                )
                            }
                        </span>
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
                    <Link className={`d-block fs1  tduh text-nowrap complaints ${selectedActiveLink === 'Wellness' ? 'activeRouteLink' : ''}`}
                        id="a-wellness" to="/admin-dashboard/Wellness" onClick={() => handleLinkClick('Wellness')}>
                        <span className="changepassword">
                            {selectedActiveLink === 'Wellness' ?
                                (
                                    <img src="../images/Admin-sidebar-icons/verifications-active-icon.svg"
                                        className="iconsize" alt='Wellness' />) : (
                                    <img src="../images/Admin-sidebar-icons/verifications-icon.svg"
                                        className="iconsize" alt='Wellness' />
                                )
                            }
                        </span>
                        {
                            tooltipv ? (
                                <span id="span-lbl-Wellness" className="sidebartext">Wellness</span>
                            ) : (
                                <span className="ctooltip" id="s-Wellness">Wellness</span>
                            )
                        }
                    </Link>

                </li>

                <li className="menuRow col-lg-12" id="menu-profile" >
                    <Link className={`d-block fs1  tduh text-nowrap complaints ${selectedActiveLink === 'WellnessGoals' ? 'activeRouteLink' : ''}`}
                        id="a-wellness-goals" to="/admin-dashboard/WellnessGoals" onClick={() => handleLinkClick('WellnessGoals')}>
                        <span className="changepassword">
                            {selectedActiveLink === 'WellnessGoals' ?
                                (
                                    <img src="../images/Admin-sidebar-icons/verifications-active-icon.svg"
                                        className="iconsize" alt='WellnessGoals' />) : (
                                    <img src="../images/Admin-sidebar-icons/verifications-icon.svg"
                                        className="iconsize" alt='WellnessGoals' />
                                )
                            }
                        </span>
                        {
                            tooltipv ? (
                                <span id="span-lbl-Wellness-goals" className="sidebartext">Wellness Goals</span>
                            ) : (
                                <span className="ctooltip" id="s-Wellness-goals">Wellness Goals</span>
                            )
                        }
                    </Link>

                </li>
                <li className="menuRow col-lg-12" id="menu-profile" >
                    <Link className={`d-block fs1  tduh text-nowrap complaints ${selectedActiveLink === 'Healthtips' ? 'activeRouteLink' : ''}`}
                        id="a-verify" to="/admin-dashboard/Healthtips" onClick={() => handleLinkClick('Healthtips')}>
                        <span className="changepassword">
                            {selectedActiveLink === 'Healthtips' ?
                                (
                                    <img src="../images/Admin-sidebar-icons/healthtip-active.svg"
                                        className="iconsize" alt='Healthtips' />) : (
                                    <img src="../images/Admin-sidebar-icons/healthtip.svg"
                                        className="iconsize" alt='Healthtips' />
                                )
                            }
                        </span>
                        {
                            tooltipv ? (
                                <span id="span-lbl" className="sidebartext">Health Tips</span>
                            ) : (
                                <span className="ctooltip" id="s-tTipsverify">Health Tips</span>
                            )
                        }
                    </Link>

                </li>

            </ul>

        </div>
    );
}
