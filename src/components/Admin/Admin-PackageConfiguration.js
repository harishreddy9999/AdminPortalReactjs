import React, { useState } from "react";
import '../../App.css';
import '../../Styles/Admin-wellness-goals.css';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import {addSubscriptionAPI } from '../../services/adminportalService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubscriptionPackageConfiguration = ({ isOpen, onClose }) => {

    const [formData, setFormData] = useState({
        subscriptionName: '',
        application: '',
        duration: '',
        actualPrice: '',
        discount: '',
        finalPriceAfterDiscount: ''
    })
    const [FeaturesForm, setFeaturesForm] = useState([{ featureName: '', value: ''}]);
    const { handleSubmit } = useForm();
    const navigate = useNavigate();


    const closeDialog = () => {
        onClose();
    }

  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const addFeatureForm = () => {
        // debugger;
        setFeaturesForm([...FeaturesForm, { featureName: '', value: ''}]);
        // testRef.current.push(React.createRef());
    };
    
    const removeFeatureForm = (index) => {
        setFeaturesForm((prevForms) => prevForms.filter((_, i) => i !== index));
        // testRef.current.splice(index, 1);
    };
    const handlefeatureNameChange = (value, index) => {
        const newFeaturesForm = [...FeaturesForm]; 
        newFeaturesForm[index] = { ...newFeaturesForm[index], featureName: value }; 
        setFeaturesForm(newFeaturesForm);
    };
    const handlefeaturevalueChange = (value, index) => {
        const newFeaturesForm = [...FeaturesForm]; 
        newFeaturesForm[index] = { ...newFeaturesForm[index], value: value }; 
        setFeaturesForm(newFeaturesForm); 
    };

    const onSubmit = async () => {
        let reqObj = {
            ...formData,
            features: FeaturesForm

        }
        console.log("reqObj", reqObj);
        // return;
        const addSubscriptionRes = await addSubscriptionAPI(reqObj);
        console.log(addSubscriptionRes);
        
        if (addSubscriptionRes.message.includes('added')) {
            toast.success(addSubscriptionRes.message);
            setFormData({
                subscriptionName: '',
                application: '',
                duration: '',
                actualPrice: '',
                discount: '',
                finalPriceAfterDiscount: ''
            });
            setFeaturesForm([{ featureName: '', value: '' }]);
            onClose();
        }
        // Add your form submission logic here
    };

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

                    <form onSubmit={handleSubmit(onSubmit)}>
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

                        <div className='col-12'>
                            <h5 className='doctor-subheading'>Features</h5>
                        </div>

                        <div className='col-12 mt-2'>

                            {FeaturesForm.map((feature, index) => (
                                <div key={index} className='row'>
                                    <div className='col-4  test-name-row'>
                                    <input placeholder='Feature name' className='form-control' type="text" name={feature.featureName}
                                            value={feature.featureName} onChange={(e) => handlefeatureNameChange(e.target.value, index)} />
                                   
                                    </div>
                                    <div className='col-4'>
                                        <input placeholder='Feature value' className='form-control' type="text" name={feature.value}
                                            value={feature.value} onChange={(e) => handlefeaturevalueChange(e.target.value, index)} />
                                    </div>
                                    <div className='col-1 mt-2'>
                                        {
                                            index >= 0 ? (
                                                <img className='remove-test-btn' src='../images/delete.png' alt='delete-test' onClick={() => removeFeatureForm(index)} />
                                            ) : ('')
                                        }

                                         {
                                            index==FeaturesForm.length-1 ?(
                                                <img className='add-test-btn mx-2' onClick={addFeatureForm} src='../images/add_schedule.png' />
                                            ):('')

                                        }
                                      

                                    </div>
                                </div>
                            ))}


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