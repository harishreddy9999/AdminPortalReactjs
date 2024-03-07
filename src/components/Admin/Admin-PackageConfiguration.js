import React, { useState } from "react";
import '../../App.css';
import '../../Styles/Admin-wellness-goals.css';
import Modal from 'react-modal';

const SubscriptionPackageConfiguration = ({ isOpen, onClose }) => {

    const [formData, setFormData] = useState({
        subscriptionName: '',
        application: '',
        duration: '',
        actualPrice: '',
        discount: '',
        finalPriceAfterDiscount: ''
    })


    const closeDialog = () => {
        onClose();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("formData", formData)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
                        width: '60%', // Width of the modal content
                        minHeight: '200px', // Height of the modal content
                        maxHeight: '500px',
                        margin: '25px auto', // Center the modal
                        padding: '0px'
                    },
                }}
            >
                <div className="goalsformdiv p-2">
                    {/* <div id="pt-Coupons">Add Tracker</div> */}
                    <h5 className='page-header'>ADD NEW SUBSCRIPTION</h5>
                </div>
                <div className="form-addnew-admin">

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-6 px-2">
                                <label className='form-lbl'>Subscription name</label>
                                <select
                                    type="text"
                                    className="form-control"
                                    name="subscriptionName"
                                    value={formData.subscriptionName}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select name</option>
                                    <option value="PRO">PRO</option>
                                    <option value="PREMIUM">PREMIUM</option>
                                </select>
                            </div>
                            <div className="col-lg-4 col-md-4 col-6 px-2">
                                <label className='form-lbl'>Product name</label>
                                <select
                                    type="text"
                                    className="form-control"
                                    name="application"
                                    value={formData.application}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select product</option>
                                    <option value="Docisn Plus">Docisn Plus</option>
                                    <option value="Docisn Front Desk">Docisn Front Desk</option>
                                    <option value="PHARMACY">Docisn Arex</option>
                                    <option value="Docisn Labs">Docisn Labs</option>
                                </select>
                            </div>
                            <div className="col-lg-4 col-md-4 col-6 px-2">
                                <label className='form-lbl'>Duration</label>
                                <select
                                    type="text"
                                    className="form-control"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select duration</option>
                                    <option value="0">Free</option>
                                    <option value="3">3 Months</option>
                                    <option value="6">6 Months</option>
                                    <option value="12">12 Months</option>
                                </select>
                            </div>
                            <div className="col-lg-4 col-md-4 col-6 px-2">
                                <label className='form-lbl'>Actual price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="actualPrice"
                                    value={formData.actualPrice}
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                            <div className="col-lg-4 col-md-4 col-6 px-2">
                                <label className='form-lbl'>Final price after discount</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="finalPriceAfterDiscount"
                                    value={formData.finalPriceAfterDiscount}
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="submit-subscription-btn provider-submit-btn mt-4" >SAVE</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )

}

export default SubscriptionPackageConfiguration;