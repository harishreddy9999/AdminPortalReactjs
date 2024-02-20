import React, { useState } from 'react';
import '../../App.css';
import { Modal, TextField, Button } from '@material-ui/core';


const UpdateDrugInfo = ({ isOpen, onClose, drugInfo }) => {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='row'>
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
                </div>
            </Modal>

        </div>
    )
}

export default UpdateDrugInfo;