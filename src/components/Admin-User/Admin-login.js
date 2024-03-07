import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../../Styles/Admins/Admin-login.css';
// import '../../Styles/Admin-dupfile.css';
import { adminLogin } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {

    const [userType, setUserType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, [])
    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsLoading(true);

        try {
            let reqobj = {
                userName: email,
                password: password,
                role: userType
            }
            const data = await adminLogin(reqobj);
            // debugger;
            if (data) {
                // debugger;
                const userDetails = data.userDetails
                const adminToken = data.token;
                sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
                sessionStorage.setItem('token', adminToken);
                sessionStorage.setItem('role', userDetails.role);
                if (userDetails.role === "SUPERADMIN") {
                    sessionStorage.setItem("activeLink", "Admins");
                    navigate('/admin-dashboard/Admins');
                } else {
                    sessionStorage.setItem("activeLink", "Verifications");
                    navigate('/admin-dashboard/Verifications');
                }

                console.log('Admin Login successful component', data);

            }

        } catch (error) {
            console.error('Login failed:', error);
        }

        setIsLoading(false);
    }


    return (
        <div id="224" className="container-fluid p-0">
            <div id="225" className="row ">
                <div id="226" className="col-lg-5 col-md-6 col-sm-5  col-12 pdleft">
                    <div id="227" className="leftside-section">
                        <div>
                            <img className="login-imgdiv" alt='loginbg' src="../images/loginreg_bg.png" />
                        </div>
                        <div id="228" className="innerpic">
                            <img className="doctorinnerpic" alt='login-doctor' src="../images/login_doctor_bg.png" id="doctorinner" />
                        </div>
                    </div>
                </div>
                <div id="229" className="col-lg-7 col-md-6 col-sm-7 p-0 col-12 form-section">
                    <div id="230" className="">
                        <div id="231" className="logo-row">
                            <img src="../images/docisn_logo.png" id="docisnlogo" className="logo" alt='docisn-logo' />
                        </div>
                        <div id="232" className="login login-screen-header">Admin Login</div>
                        <form className="custom-form" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="userType">User Type</label>
                                <select
                                    type="text"
                                    className="form-control"
                                    id="userType"
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                    required
                                >
                                    <option value="" id="o-typ">Select User Type</option>
                                    <option value="SUPERADMIN" id="o-sadm">SUPER ADMIN</option>
                                    <option value="ADMIN" id="o-adm">ADMIN</option>
                                    <option value="PROMOTIONOFFEREXECUTIVE" id="o-adm">PROMOTION OFFER EXECUTIVE</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div id="238" className="each-row-btn">
                                <button className="signinbtn" type="submit" disabled={isLoading} id="signIn" >Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;