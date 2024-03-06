import React, { useState, useEffect } from 'react';
import '../../App.css';
import Modal from 'react-modal';
import Card from '@mui/material/Card';
import { verifyProfiles } from '../../services/adminportalService';
import moment from 'moment';
// import RejectionModalComponent from './Admin-RejectionModal';

const AdminSelectedIndependentClinicDetails = ({ isOpen, onClose, independentClinic }) => {
    const [independentClinicDetails, setIndependentClinicDetailsDetails] = useState(null);
    const [isRejectOpenModel, setisRejectOpenModel] = useState(false);
    const [resonforrejection, setresonforrejection] = useState('');


    useEffect(() => {
        if (independentClinic) {
            // debugger;
            setIndependentClinicDetailsDetails(independentClinic);
            console.log("independentClinic", independentClinicDetails, independentClinic);
        }
    }, []);
    const rejectindependentclinic = () => {
        debugger
        setisRejectOpenModel(true);
    }

    const verify = async (approve, id) => {
        let obj = {
            id: id,
            status: approve,
            type: "CLINIC",
            comments: resonforrejection
        };
        console.log("obj", obj)
        // return;
        const verifyProfilesRes = await verifyProfiles(obj);
        console.log("verifyProfilesRes", verifyProfilesRes)
        if (verifyProfilesRes) {
            closePopup();
            setisRejectOpenModel(false)
        }
    }

    const closePopup = () => {
        // debugger;
        setisRejectOpenModel(false)
        onClose();
    }
    // const reject = async (approve, id) => {
    //     setisRejectionModalOpen(true);
    // }

    // const closeRejectionModal = () => {
    //     setisRejectionModalOpen(false);
    // }

    return (
        <div>


            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Independent Clinic Details"
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
                        <h6 id="h-lbl" className="screen-heading-doctor-details">Independent Clinic Details</h6>
                    </div>
                    <div id="12043" className="col-lg-12 col-md-12">

                        <Card className='clinic-details-card' id="m-card">
                            <div id="12044" className="row">
                                <div id="801" className="clinicName">{independentClinicDetails?.clinicName}</div>
                                <div id="802" className="accountStatus">{independentClinicDetails?.accountStatus}</div>
                                <div id="803" className="regno">{independentClinicDetails?.nameOfCouncil}</div>
                            </div>
                            <hr />
                            <div id="12058" className="row pt-2">
                                <div id="805-registrationNumber" className="col-lg-4">
                                    <label id="r-lbl-registrationNumber" className="pat-details-side-heading">Registration Number</label>
                                    <div id="806-registrationNumber" >{independentClinicDetails?.registrationNumber}</div>
                                </div>
                                <div id="805-phoneNumber" className="col-lg-4">
                                    <label id="r-lbl-phoneNumber" className="pat-details-side-heading">Phone Number</label>
                                    <div id="806-phoneNumber" >{independentClinicDetails?.phoneNumber}</div>
                                </div>
                                <div id="805-State" className="col-lg-4">
                                    <label id="r-lbl-State" className="pat-details-side-heading">State </label>
                                    <div id="806-State" >{independentClinicDetails?.clinicAddress?.state}</div>
                                </div>

                            </div>
                            <div id="12065" className="row pt-2">

                                <div id="805-city" className="col-lg-4">
                                    <label id="r-lbl-city" className="pat-details-side-heading">City</label>
                                    <div id="806-city" >{independentClinicDetails?.clinicAddress?.city}</div>
                                </div>
                                <div id="805-Pincode" className="col-lg-4">
                                    <label id="r-lbl-Pincode" className="pat-details-side-heading">Pincode </label>
                                    <div id="806-Pincode" >{independentClinicDetails?.clinicAddress?.pincode}</div>
                                </div>

                            </div>

                            <div id="12070" className="row">
                                <div id="12071" className="col-12 edit space d-flex justify-content-end">
                                    <button id="12072" className="provider-submit-btn me-2" onClick={() => verify('APPROVED', independentClinicDetails._id)}
                                    >Approve</button>
                                    <button id="12073" className="reject-btn provider-cancel-btn me-2" onClick={() => rejectindependentclinic()}>Reject</button>
                                    <button className="canceldismiss provider-cancel-btn me-1" id="no" onClick={closePopup}>Dismiss</button>

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
                                        <button className='submit-btn' onClick={() => verify('REJECTED', independentClinicDetails._id)}>Reject</button>
                                        <button className='cancel-btn' onClick={closePopup}>Cancel</button>
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

export default AdminSelectedIndependentClinicDetails;
