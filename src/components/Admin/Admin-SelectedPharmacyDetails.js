import React, { useState, useEffect } from 'react';
import '../../App.css';
import Modal from 'react-modal';
import Card from '@mui/material/Card';
import { verifyProfiles } from '../../services/adminportalService';
import moment from 'moment';
// import RejectionModalComponent from './Admin-RejectionModal';

const AdminSelectedPharmacyDetails = ({ isOpen, onClose, pharmacy }) => {
    const [pharmacyDetails, setPharmacyDetails] = useState(null);

    useEffect(() => {
        if (pharmacy) {
            // debugger;
            setPharmacyDetails(pharmacy);
            console.log("pharmacyDetails", pharmacyDetails, pharmacy);
        }
    }, [pharmacy]);

    const verify = async (approve, id) => {
        let obj = {
            id: id,
            status: approve,
            type: "PHARMACY",
            comments: ""
        };
        console.log("obj", obj)
        // return;
        const verifyProfilesRes = await verifyProfiles(obj);
        console.log("verifyProfilesRes", verifyProfilesRes)
        if (verifyProfilesRes) {
            closePopup();
        }
    }
    const closePopup = () => {
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
                        <h6 id="h-lbl" className="screen-heading-doctor-details">Pharmacy Details</h6>
                    </div>
                    <div id="12043" className="col-lg-12 col-md-12">

                        <Card className='clinic-details-card' id="m-card">
                            <div id="12044" className="row">
                                <div id="12045" className="col-lg-12">
                                    <div id="12046" className="row" >
                                        <div id="14091" className="col-lg-12">
                                            <div id="14092" className="d-flex">
                                                <div id="14093" className="pharmacyName flex-grow-1">{pharmacyDetails.pharmacyName}</div>
                                                <div id="14094" className="accountStatus">{pharmacyDetails.accountStatus}</div>
                                            </div>
                                            <div id="14096" >
                                                <div id="14097" className="flex-grow1">
                                                    {
                                                        pharmacyDetails.street ? (
                                                            <div id="strt">{pharmacyDetails.street}</div>
                                                        ) : ''
                                                    }
                                                    {
                                                        pharmacyDetails.landMark ? (
                                                            <div id="strt">{pharmacyDetails.landMark}</div>
                                                        ) : ''
                                                    }
                                                    {
                                                        pharmacyDetails.city ? (
                                                            <div id="strt">{pharmacyDetails.city}</div>
                                                        ) : ''
                                                    }
                                                    {
                                                        pharmacyDetails.state ? (
                                                            <div id="strt">{pharmacyDetails.state}</div>
                                                        ) : ''
                                                    }
                                                    {
                                                        pharmacyDetails.pinCode ? (
                                                            <div id="strt">{pharmacyDetails.pinCode}</div>
                                                        ) : ''
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <hr />
                            <div id="12058" className="row pt-2">
                                <div id="12059" className="col-lg-4">
                                    <label id="phn-lbl" className="pat-details-side-heading">Email</label>
                                    <div id="12060" className="details" >
                                        {pharmacyDetails?.email}
                                    </div>
                                </div>
                                <div id="12061" className="col-lg-4">
                                    <label id="mail-lbl" className="pat-details-side-heading"> Timings</label>
                                    <div id="12062" className="details">{pharmacyDetails?.startTime}-{pharmacyDetails?.endTime}</div>

                                </div>
                                <div id="12063" className="col-lg-4">
                                    <label id="gst-lbl" className="pat-details-side-heading">License Number</label>
                                    <div id="12064" className="details">{pharmacyDetails?.licenseNumber}</div>
                                </div>

                            </div>
                            <div id="12065" className="row pt-2">

                                <div id="12066" className="col-lg-4">
                                    <label id="per-lbl" className="pat-details-side-heading">Phone Number</label>
                                    <div id="12067" className="details">{pharmacyDetails?.mobile}</div>
                                </div>

                            </div>

                            <div id="12070" className="row">
                                <div id="12071" className="col-12 edit space d-flex justify-content-end">
                                    <button id="12072" className="provider-submit-btn me-2" onClick={() => verify('APPROVED', pharmacyDetails._id)}
                                    >Approve</button>
                                    <button id="12073" className="reject-btn provider-cancel-btn me-2">Reject</button>
                                    <button className="canceldismiss provider-cancel-btn me-1" id="no" onClick={closePopup}>Dismiss</button>

                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default AdminSelectedPharmacyDetails;
