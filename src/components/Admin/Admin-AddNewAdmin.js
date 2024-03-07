import React, { useState } from "react";
import '../../App.css';
import '../../Styles/Admin-wellness-goals.css';
import Modal from 'react-modal';
import { adminSendOTPAPI, adminverifyOTPAPI } from '../../services/adminportalService'

const AddNewAdmin = ({ isOpen, onClose }) => {

    const [otp, setOTP] = useState('');
    const [showOtp, setShowOTP] = useState(false);
    const [formData, setFormData] = useState({
        role: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
    })


    const closeDialog = () => {
        onClose();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleOTPChange = (e) => {
        const { name, value } = e.target;
        console.log("handleOTPChange", name, value);
        setOTP(value);
    }

    const getOTP = async () => {
        let obj = {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            role: formData.role
        }
        console.log("obj", obj);
        const apiRes = await adminSendOTPAPI(obj);
        console.log("apiRes", apiRes);
        if (apiRes.status === "success") {
            setShowOTP(true);
        }
    }

    const addNewUser = async () => {
        let obj = {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            role: formData.role,
            phoneNumber: formData.phoneNumber,
            otp: otp
        };
        console.log("obj", obj);
        const apiRes = await adminverifyOTPAPI(obj);
        console.log("apiRes", apiRes);
        if (apiRes.status === "success") {
            onClose();
        }
    }
    return (
        <div className="goals" id="5">
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background color
                    },
                    content: {
                        width: '25%', // Width of the modal content
                        minHeight: '200px', // Height of the modal content
                        height: '500px',
                        margin: '25px auto', // Center the modal
                        padding: '0px'
                    },
                }}
            >
                <div className="goalsformdiv p-2">
                    {/* <div id="pt-Coupons">Add Tracker</div> */}
                    <h5 className='page-header'>ADD NEW ADMIN</h5>
                </div>
                <div className="form-addnew-admin">

                    <form onSubmit={handleSubmit}>
                        <div className='col-12'>

                            <label className='form-lbl'>Role</label>
                            <select
                                type="text"
                                className="form-control"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                disabled={showOtp}
                                required
                            >
                                <option id="select" value="" >Select</option>
                                <option id="ADMIN" value="ADMIN">ADMIN</option>
                                <option id="PROMOTIONOFFEREXECUTIVE" value="PROMOTIONOFFEREXECUTIVE">PROMOTION OFFER EXECUTIVE</option>
                            </select>
                        </div>
                        <div className='col-12'>

                            <label className='form-lbl'>First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                readOnly={showOtp}
                                required
                            />
                        </div>
                        <div className='col-12'>

                            <label className='form-lbl'>Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                readOnly={showOtp}
                                required
                            />
                        </div>
                        <div className='col-12'>

                            <label className='form-lbl'>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                readOnly={showOtp}
                                required
                            />
                        </div>
                        <div className='col-12'>

                            <label className='form-lbl'>Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                readOnly={showOtp}
                                required
                            />
                        </div>
                        <div className="col-12 d-flex justify-content-end mt-3">
                            <button className="get-otp-btn" disabled={showOtp} onClick={getOTP}>GET OTP</button>
                        </div>

                    </form>
                    {
                        showOtp ? (
                            <div className="row">
                                <div className="col-12">
                                    <label className='form-lbl'>OTP</label>
                                    <input className="form-control" name="otp" value={otp} onChange={handleOTPChange} />
                                </div>
                                <div className="col-12 d-flex justify-content-end mt-3">
                                    <button onClick={addNewUser} className="add-new-admin-btn">SUBMIT</button>
                                    <button onClick={closeDialog} className="cancelbtn  mx-2" id="24">CANCEL</button>
                                </div>
                            </div>
                        ) : ''
                    }

                </div>
            </Modal>
        </div>

    )
}

export default AddNewAdmin;