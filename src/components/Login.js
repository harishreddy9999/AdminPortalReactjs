import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/User/UserLogin.module.css';
import { useForm } from 'react-hook-form';



function LoginForm() {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        // e.preventDefault();
        setIsLoading(true);
        console.log(data, errors);
        // try {
        //     // Call the login service function
        //     let reqobj = {
        //         userName: email,
        //         role: "DOCTOR",
        //         password: password,
        //         deviceToken: ""
        //     }
        //     const response = await login(reqobj);
        //     if (response.errors === "") {
        //         // debugger;
        //         sessionStorage.setItem("LoginResponse", JSON.stringify(response));
        //         sessionStorage.setItem('providerID', response.user._id);
        //         console.log('Login successful component', response);
        //         navigate('/user-dashboard/home');
        //     }
        // } catch (error) {
        //     console.error('Login failed:', error);
        // }

        setIsLoading(false);
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
                            <form onSubmit={handleSubmit(onSubmit)} className='row'>
                                <div className={`row ${styles.eachrow}`}>
                                    {/* <label htmlFor="email">Email:</label> */}
                                    <div className={styles.materialtextfield}>
                                        <input
                                            type="email"
                                            className={`form-control ${styles.matInput}`}
                                            id="email" placeholder=""
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w[a-z]{1,2})+$/,
                                                    message: 'Please enter a valid email address'
                                                }
                                            })}
                                        />
                                        <label htmlFor="email" className={styles.matLabel}>Email</label>
                                        {errors.email && <div className="error">{errors.email.message}</div>}
                                    </div>
                                </div>
                                <div className='row each-row'>
                                    <div className={styles.materialtextfield}>

                                        <input
                                            type="password"
                                            id="password"
                                            className={`form-control ${styles.matInput}`}
                                            placeholder=""
                                            {...register('password', {
                                                required: 'password is required',

                                            })}
                                        />
                                        <label htmlFor="password" className={styles.matLabel}>Password</label>
                                        {errors.password && <div className="error">{errors.password.message}</div>}
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
        </div>
    );
}

export default LoginForm;
