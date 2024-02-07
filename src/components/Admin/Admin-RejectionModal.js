import React, { useState } from 'react';
import { Modal, TextField, Button } from '@material-ui/core';
import { verifyProfiles } from '../../services/adminportalService';

const RejectionModalComponent = ({ isOpen, onClose, id, type, status }) => {
    const [open, setOpen] = useState(false);
    const [rejectionComments, setRejectionComments] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDismiss = () => {
        handleClose(); // Close the modal on dismiss button click
    };

    const handleSubmit = async () => {
        let obj = {
            id: id,
            status: status,
            type: type,
            comments: rejectionComments
        };
        // Add your logic for form submission here
        console.log('Submitted with reason: ', rejectionComments);
        const verifyProfilesRes = await verifyProfiles(obj);
        console.log("verifyProfilesRes", verifyProfilesRes)
        if (verifyProfilesRes) {
            handleClose(); // Close the modal after submission
        }

    };

    return (
        <div>
            <Modal open={open} onClose={handleClose}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background color
                    },
                    content: {
                        width: '70%', // Width of the modal content
                        minHeight: '550px', // Height of the modal content
                        maxHeight: '650px',
                        margin: '25px auto', // Center the modal
                    },
                }}
            >
                <div className="modal-content">
                    <h2 id="logout-text" className="cancelhder">
                        Are you sure you want to proceed?
                    </h2>

                    <form className="m-2">
                        <div className="cancelhder">
                            <div className="material-textfield">
                                <TextField
                                    type="text"
                                    id="reasonforcanceltext"
                                    name="rejectionComments"
                                    label="Reason For Rejection"
                                    variant="outlined"
                                    fullWidth
                                    value={rejectionComments}
                                    onChange={(e) => setRejectionComments(e.target.value)}
                                />
                            </div>
                        </div>

                        {rejectionComments && (
                            <div className="error-message" id="can-req">
                                <div id="canerr-req">Reason is required</div>
                            </div>
                        )}
                    </form>

                    <div className="mt-3 d-flex justify-content-end me-2">
                        <Button onClick={handleDismiss} className="canceldismiss provider-cancel-btn me-1">
                            Dismiss
                        </Button>
                        <Button onClick={handleSubmit} className="cancelyesbtn provider-submit-btn">
                            Submit
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default RejectionModalComponent;
