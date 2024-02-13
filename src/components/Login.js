import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/User/UserLogin.module.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // const { isLoading, showLoader, hideLoader } = useLoader();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the login service function
            let reqobj = {
                userName: email,
                role: "DOCTOR",
                password: password,
                deviceToken: ""
            };
            setIsLoading(true);
            const response = await login(reqobj);
            if (response.errors === "") {
                // debugger;
                setIsLoading(false);
                sessionStorage.setItem("LoginResponse", JSON.stringify(response));
                sessionStorage.setItem('providerID', response.user._id);
                console.log('Login successful component', response);
                navigate('/user-dashboard/home');
            } else {
                // debugger;
                toast.success('This is a failuer toast!');
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Login failed:', error);
        }

    };

    return (

        <div id="12218" className="container-fluid">
            <div id="12219" className="row">
                <div id="12220" className="col-lg-5 col-md-6 col-sm-5  col-12 px-0">
                    <div id="12221" className={styles.leftsideSection}>
                        <div className={styles.innerpic} id="leftdoc">
                            <img id="12222" className={styles.doctorinnerpic} src="../images/provider_isometric.png" alt='leftside-logo' />
                        </div>
                    </div>
                </div>
                <div id="12223" className="col-lg-7 col-md-6 col-sm-7 p-0 col-12 responsive right_portion">
                    <div id="12224" className={styles.rightcontent}>
                        <div className={styles.logorow} id="docs-logo">
                            <img id="12225" src="../images/docsinplus.png" className={styles.logo} alt='rightside-logo' />

                        </div>
                        <div className={styles.userloginloginform}>
                            <form onSubmit={handleSubmit} className='row'>
                                <div className={`row ${styles.eachrow}`}>
                                    {/* <label htmlFor="email">Email:</label> */}
                                    <div className={styles.materialtextfield}>
                                        <input
                                            type="email"
                                            className={`form-control ${styles.matInput}`}
                                            id="email" placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required

                                        />
                                        <label htmlFor="email" className={styles.matLabel}>Email</label>
                                    </div>

                                </div>
                                <div className='row each-row'>
                                    <div className={styles.materialtextfield}>

                                        <input
                                            type="password"
                                            id="password"
                                            className={`form-control ${styles.matInput}`}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="password" className={styles.matLabel}>Password</label>
                                    </div>
                                </div>
                                <div className={styles.eachrowbtn}>
                                    <button type="submit" className={styles.userloginsigninbtn} disabled={isLoading}>
                                        {isLoading ? 'Logging in...' : 'Login'}
                                    </button>

                                </div>
                                <div className="d-flex justify-content-center ">
                                    <a id="a-fgt" className={styles.userloginforgetpassword}>Forgot Password?
                                    </a>
                                </div>
                                <div id="12234" className="d-flex justify-content-center fs-14">
                                    <div id="n-user">New to Docisn ?
                                        <a id="register">Sign Up
                                        </a>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {isLoading && (
                <div className='loader-container'>
                    <div className="loader-overlay">
                        <img src='../images/provider_isometric.png' alt="Loading..." className="loader-img" />
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default LoginForm;