import React, { useState } from 'react';
import '../../App.css';
import '../../Styles/Admin-header.css';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { adminLogin } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
// import { AdminSidebar } from './Admin-sidebar';

function AdminHeader({ sendDataToTarget }) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuCollapse, setMenuCollapse] = useState(false);
    // const [collapseSidebar, setCollapseSidebar] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const toggleFunctionality = () => {
        // console.log("toggle");
        setMenuCollapse((prevMenuCollapse) => !prevMenuCollapse);
        let obj = {
            response: 'desktop',
            collapse: false,
        }

        sendDataToTarget(obj);
    }

    const logout = () => {
        navigate('/Admin');
    }
    return (
        <div className='row'>
            <Card className="p-0 mat-card admin-header-mat-card" id="m-card">
                <div id="173" className="row">
                    <div id="174" className="col-lg-12 col-md-12 col-sm-12 p-0">
                        <div id="175" className="d-flex">
                            <div id="176" className="flex-grow-1">
                                <div id="177" className="d-flex">
                                    <div id="178" className="ds">
                                        <button type="button" id="toggle" className={`toggleIcon ${menuCollapse ? 'open' : ''}`} onClick={toggleFunctionality} >
                                            <span className="icon-bar bg3" id="stgl"></span>
                                            <span className="icon-bar bg3" id="stogl"></span>
                                            <span className="icon-bar bg3" id="stoggle"></span>
                                        </button>
                                    </div>
                                    <div id="179" className="ms">
                                        <button type="button" id="m-toggle" className="toggleIcon">
                                            <span className="icon-bar bg3" id="s-mtgl"></span>
                                            <span className="icon-bar bg3" id="s-mtogl"></span>
                                            <span className="icon-bar bg3" id="s-mtoggle"></span>
                                        </button>
                                    </div>
                                    <div id="180" className="user-icon ">
                                        <img src="../images/UserLogo.svg" id="archents-logo" className="archentsLogo" alt='user-logo' />
                                    </div>
                                </div>
                            </div>
                            <div id="181" className="d-flex">


                                <div id="182" className="borderleft"></div>
                                <div id="183" className="px-3 lastSec">
                                    <div id="184" className="d-flex">
                                        <div className="user-pic" id="u-pic" style={{ cursor: 'pointer' }}>
                                            <img src="../images/user.jpg" id="profile" alt='user-img' />
                                        </div>

                                        <div id="185">
                                            <div className="dropDown" id="dropdown">
                                                <IconButton
                                                    aria-controls="simple-menu"
                                                    aria-haspopup="true"
                                                    onClick={handleClick}
                                                >
                                                    <ArrowDropDownIcon id="md-arrow" />
                                                </IconButton>
                                            </div>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={logout} id="logout">
                                                    Logout
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </Card>


        </div>
    )
}

export default AdminHeader;