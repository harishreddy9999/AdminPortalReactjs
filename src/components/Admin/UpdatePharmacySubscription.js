import React, { useEffect, useState } from "react";
import '../../App.css';
import Modal from 'react-modal';
import moment from "moment";
import { getAllPharmacyConfiguredSubscriptionAPI, updatePharmacySubscriptionsAPI } from '../../services/adminportalService';
import '../../Styles/updatesubscriptions.css';
const UpdatePharmacySubscriptionModal = ({ isOpen, onClose, pharmacy }) => {

    // const [clinicDetails, setClinicDetails] = useState(null);
    const [regNo, setRegNo] = useState('');
    const [packageSubscriptions, setpackageSubscriptions] = useState([]);
    const [minDate, setMinDate] = useState(moment().format('YYYY-MM-DD'));
    const [selectedStartDate, setselectedStartDate] = useState(moment().format('YYYY-MM-DD'));
    const [pharmacySubscriptionForm, setPharmacySubscriptionForm] = useState({
        subscriptionName: '',
        startDate: '',
        endDate: '',
        typeOfPackage: '',
        amount: '',
        modeOfPayment: '',
    });

    useEffect(() => {
        if (pharmacy) {
             debugger;
            setRegNo(pharmacy.licenseNumber);
            getAllConfiguredPackages();
        }
    }, [])

    const getAllConfiguredPackages = async () => {
        const apiRes = await getAllPharmacyConfiguredSubscriptionAPI();
        console.log("apiRes", apiRes);
        const packageSubscriptions = apiRes;
        packageSubscriptions.forEach(element => {
            if (element.duration != 0) {
                element.subscriptionNameDuration = element.subscriptionName + " (" + element.duration + " Months)";
            } else {
                element.subscriptionNameDuration = element.subscriptionName + " (Free Trial)"
            }
        });
        setpackageSubscriptions(packageSubscriptions);
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // debugger;
        setPharmacySubscriptionForm({ ...pharmacySubscriptionForm, [name]: value });
        if (name === "startDate") {
            console.log(value);
            setselectedStartDate(value);
            // debugger;
        }
        if (name === "subscriptionName") {
            if (value) {
                // debugger;
                const selectedSubscriptionDuration = packageSubscriptions.filter(t => t._id === value)[0].duration.toString();
                const typeOfPackageValue = selectedSubscriptionDuration === "0" ? "2 Months" : selectedSubscriptionDuration + " Months"
                setPharmacySubscriptionForm(prevState => ({
                    ...prevState,
                    typeOfPackage: typeOfPackageValue
                }));
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("pharmacySubscriptionForm", pharmacySubscriptionForm);
        let obj = {
            id: regNo,
            subscriptionID: pharmacySubscriptionForm.subscriptionName,
            subscriptionName: packageSubscriptions.filter(t => t._id === pharmacySubscriptionForm.subscriptionName)[0].subscriptionName,
            startDate: pharmacySubscriptionForm.startDate,
            endDate: pharmacySubscriptionForm.endDate,
            actualPrice: pharmacySubscriptionForm.amount,
            application: 'PHARMACY',
            discount: 0,
            finalPriceAfterDiscount: pharmacySubscriptionForm.amount,
            modeOfPayment: pharmacySubscriptionForm.modeOfPayment,
            typeOfPackage: pharmacySubscriptionForm.typeOfPackage,
            duration: pharmacySubscriptionForm.typeOfPackage
        };
        console.log("obj", obj);
        const apiRes = await updatePharmacySubscriptionsAPI(obj);
        if (apiRes) {
            onClose();
        }
    }
    const handlecancel=()=>{
        onClose();
    }
    return (

        <div className="row">
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
                        maxHeight: '280px',
                        margin: '25px auto', // Center the modal
                        padding:'0px'
                    },
                }}
            >
                <div className='row'>
                    <h5 className='page-header'>UPDATE PHARMACY SUBSCRIPTION</h5>
                    <div className='add-panel-form-container'>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-4">
                                    <label className="add-panel-lbl">Subscription Name</label>
                                    <select className="form-control" name="subscriptionName"
                                        value={pharmacySubscriptionForm.subscriptionName}
                                        onChange={handleChange}
                                        required>
                                        <option value="">Select Subscription Name</option>
                                        {
                                            packageSubscriptions.map((el, index) => (
                                                <option key={index} value={el._id}>{el.subscriptionNameDuration}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-4">
                                    <label className="add-panel-lbl">Subscription Period</label>
                                    <input type="text" className="form-control" name="typeOfPackage"
                                        value={pharmacySubscriptionForm.typeOfPackage}
                                        onChange={handleChange}
                                        required readOnly />
                                </div>
                                <div className="col-4">
                                    <label className="add-panel-lbl">Start Date</label>
                                    <input type="date" className="form-control" name="startDate"
                                        value={pharmacySubscriptionForm.startDate} min={minDate}
                                        onChange={handleChange}
                                        required />
                                </div>
                                <div className="col-4">
                                    <label className="add-panel-lbl">End Date</label>
                                    <input type="date" className="form-control" name="endDate"
                                        value={pharmacySubscriptionForm.endDate} min={selectedStartDate}
                                        onChange={handleChange}
                                        required />
                                </div>
                                <div className="col-4">
                                    <label className="add-panel-lbl">Amount</label>
                                    <input type="text" className="form-control" name="amount"
                                        value={pharmacySubscriptionForm.amount}
                                        onChange={handleChange}
                                        required />
                                </div>
                                <div className="col-4">
                                    <label className="add-panel-lbl">Mode of payment</label>
                                    <select type="text" className="form-control" name="modeOfPayment"
                                        value={pharmacySubscriptionForm.modeOfPayment}
                                        onChange={handleChange}
                                        required >
                                        <option value="">Select mode of payment</option>
                                        <option value="CASH">CASH</option>
                                        <option value="CARD">CARD</option>
                                    </select>
                                </div>
                            </div>

                        </form>
                        <div className='d-flex justify-content-end'>
                            <button onClick={handleSubmit} className="add-panel-btn ">Submit</button>
                            <button className='cancel-btn' onClick={handlecancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UpdatePharmacySubscriptionModal;