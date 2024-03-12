import React, { useState, useEffect } from 'react';
import '../../App.css';
// import '../../Styles/Admin-doctorDetails.css';
import Modal from 'react-modal';
import Card from '@mui/material/Card';
import { verifyProfiles } from '../../services/adminportalService';
import moment from 'moment';
// import RejectionModalComponent from './Admin-RejectionModal';

const AdminSelectedDoctorDetails = ({ isOpen, onClose, doctor }) => {
    const [doctorDetails, setDoctorDetails] = useState(null);
    const [isRejectOpenModel, setisRejectOpenModel] = useState(false);
    const [resonforrejection, setresonforrejection] = useState('');

    useEffect(() => {
        if (doctor) {
            // debugger;
            setDoctorDetails(doctor);
            console.log("doctorDetails", doctorDetails, doctor);
        }
    }, [doctor]);

    const verify = async (approve, id) => {
        let obj = {
            id: id,
            status: approve,
            type: "DOCTOR",
            comments: resonforrejection
        };

        const verifyProfilesRes = await verifyProfiles(obj);
        console.log("verifyProfilesRes", verifyProfilesRes)
        if (verifyProfilesRes) {
            onClose();
        }
    }

    const reject = async (approve, id) => {
        setisRejectOpenModel(true);
    }

    const closeRejectionModal = () => {
        setisRejectOpenModel(false);
        onClose();
    }

    return (
        <div>


            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Lab Details"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background color
                    },
                    content: {
                        width: '50%', // Width of the modal content
                        minHeight: '500px', // Height of the modal content
                        maxHeight: '600px',
                        margin: '25px auto', // Center the modal
                    },
                }}
            >
                <div id="12041" className="row space">
                    <div id="12042" className="col-lg-12 col-md-12">
                        <h6 id="h-lbl" className="screen-heading-doctor-details">Doctor Details</h6>
                    </div>
                    <div id="12043" className="col-lg-12 col-md-12">

                        <Card className='doctor-details-card' id="m-card">
                            <div id="12044" className="row">
                                <div id="12045" className="col-lg-12">
                                    <div id="12046" className="row" >
                                        <div id="12047" className="col-lg-3" >
                                            {
                                                doctorDetails?.profilePicture !== '' ? (
                                                    <div id="img-div" className='p-2'>
                                                        <img src="{doctorDetails?.profilePicture}" className="labLogo" id="pic" alt='lab-logo' />
                                                    </div>
                                                ) : <div id="img-div" className='p-2'>
                                                    <img src="../images/UserLogo.svg" className="labLogo" id="pic" alt='lab-logo' />
                                                </div>
                                            }


                                        </div>
                                        <div id="12048" className="col-lg-9">
                                            <div id="12049" className='p-2'>
                                                <div id="12050" className="labName">{doctorDetails?.fullName}</div>
                                                {
                                                    doctorDetails?.accountStatus === 'PENDING' ? (
                                                        <div id="12051" className="accountStatus">Pending</div>
                                                    ) : ''
                                                }

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <hr />
                            <div id="12058" className="row pt-2">
                                <div id="12059" className="col-lg-4">
                                    <label id="phn-lbl" className="pat-details-side-heading">Phone Number</label>
                                    <div id="12060" className="details" >
                                        {doctorDetails?.phoneNumber}
                                    </div>
                                </div>
                                <div id="12061" className="col-lg-4">
                                    <label id="mail-lbl" className="pat-details-side-heading"> Email</label>
                                    <div id="12062" className="details">{doctorDetails?.email}</div>

                                </div>
                                <div id="12063" className="col-lg-4">
                                    <label id="gst-lbl" className="pat-details-side-heading">Gender</label>
                                    {
                                        doctorDetails?.gender === 'M' ? (
                                            <div id="12064" className="details">Male</div>
                                        ) : (
                                            <div id="12064" className="details">Female</div>
                                        )
                                    }
                                </div>

                            </div>
                            <div id="12065" className="row pt-2">

                                <div id="12066" className="col-lg-4">
                                    <label id="per-lbl" className="pat-details-side-heading">Specialization</label>
                                    <div id="12067" className="details">{doctorDetails?.primarySpecialization[0]}</div>
                                </div>
                                <div id="12068" className="col-lg-4">
                                    <label id="lis-lbl" className="pat-details-side-heading">Languages</label>
                                    <div id="12069" className="details">{doctorDetails?.languages}</div>
                                </div>
                                <div id="12068" className="col-lg-4">
                                    <label id="lis-lbl" className="pat-details-side-heading">DOB</label>
                                    <div id="12069" className="details">{moment(new Date(doctorDetails?.dOB)).format("DD/MM/YYYY")}</div>
                                </div>
                            </div>
                            <div id="120652" className="row pt-2">
                                <div id="12066" className="col-lg-4">
                                    <label id="per-lbl" className="pat-details-side-heading">Years of Experience</label>
                                    <div id="12067" className="details">{doctorDetails?.yearsOfExperience}</div>
                                </div>
                                <div id="12068" className="col-lg-4">
                                    <label id="lis-lbl" className="pat-details-side-heading">About me</label>
                                    <div id="12069" className="details">{doctorDetails?.aboutMe}</div>
                                </div>
                            </div>
                            <div id="12070" className="row">
                                <div id="12071" className="col-12 edit space d-flex justify-content-end">
                                    <button id="12072" className="provider-submit-btn me-2" onClick={() => verify('APPROVED', doctorDetails._id)}
                                    >Approve</button>
                                    <button id="12073" className="reject-btn provider-cancel-btn me-2">Reject</button>
                                    <button className="canceldismiss provider-cancel-btn me-1" id="no" onClick={onClose}>Dismiss</button>

                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                {
                isRejectOpenModel ? (
                    <div className='initiateComp-popup'>
                        <div className='initiateComp-overlay'>
                            <div className='popup-header'>
                                <p className='popup-header-label'>Are you sure you want to Reject?</p>
                            </div>
                            <div className='row popup-content'>

                                <div className='row'>
                                    <label className='select-lbl'>Reason For Rejection</label>
                                    <input className='form-control' type="text"
                                        value={resonforrejection}
                                        
                                        onChange={(e) => setresonforrejection(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='d-flex justify-content-end mt-4'>
                                    <button className='submit-btn' onClick={()=>verify('REJECTED',doctorDetails._id)}>Reject</button>
                                    <button className='cancel-btn' onClick={closeRejectionModal}>Cancel</button>
                                </div>
                            </div>
                        </div>

                    </div>
                ) : ''
            }
            </Modal>



        </div>
    );
};

export default AdminSelectedDoctorDetails;
