import React from 'react';
import '../../App.css';
import '../../Styles/Admin-wellness.css';
import Modal from 'react-modal';

const CreateWellnessPackage = ({ isOpen, onClose }) => {
    return (
        <div className='row'>

            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Lab Details"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background color
                    },
                    content: {
                        minWidth: '50%', // Width of the modal content
                        maxWidth: '60%',
                        minHeight: '400px', // Height of the modal content
                        maxHeight: '600px',
                        margin: '25px auto', // Center the modal
                        overflow: 'hidden',
                        padding: '0',
                        overflowY: 'scroll'
                    },
                }}
            >
                <div className="couponformdiv p-2">
                    <div id="pt-Coupons">Add Package</div>
                </div>
            </Modal>
        </div>
    )
}

export default CreateWellnessPackage;