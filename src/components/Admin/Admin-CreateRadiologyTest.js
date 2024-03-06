import React, { useState, useEffect } from 'react';
import '../../App.css';
import '../../Styles/Admin-wellness-goals.css';
import Modal from 'react-modal';
import { addRadiologyTestAPI } from '../../services/adminportalService';


const CreateRadiologyTest = ({ isOpen, onClose, radiologyTestDetails }) => {

    const [testName, setTestName] = useState('');
    const [testPrice, setTestPrice] = useState('');
    const [maxDiscount, setMaxDiscount] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [testID, setTestID] = useState('');
    useEffect(() => {
        if (radiologyTestDetails) {
            bindData(radiologyTestDetails);
            console.log("radiologyTestDetails", radiologyTestDetails)
            // debugger;

        }
    }, [])

    const bindData = (radiologyTestDetails) => {
        if (radiologyTestDetails) {
            setIsEdit(true);
            setTestID(radiologyTestDetails._id);
            setTestName(radiologyTestDetails.testName);
            setTestPrice(radiologyTestDetails.price);
            setMaxDiscount(radiologyTestDetails.maxDiscountPercentage);
            calculateMaxPrice(radiologyTestDetails.price, radiologyTestDetails.maxDiscountPercentage);
            // setMaxPrice();
        } else {
            setIsEdit(false);
            setTestID('');
            setTestName('');
            setTestPrice('');
            setMaxDiscount('');
            setMaxPrice('');
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        if (name === "testName") {
            setTestName(value);
        }
        if (name === "testPrice") {
            setTestPrice(value);
            calculateMaxPrice(value, maxDiscount);
        }
        if (name === "maxDiscount") {
            setMaxDiscount(value);
            calculateMaxPrice(testPrice, value);
        }
    }

    const calculateMaxPrice = (testPriceP, maxDiscountP) => {
        const discountAmt = (testPriceP * maxDiscountP) / 100;
        console.log("discountAmt", discountAmt, testPriceP);
        setMaxPrice(testPriceP - discountAmt);
    }

    const addRadiologyTest = async () => {
        let reqObj = {
            testName: testName,
            shortCode: '',
            xrayTechnique: '',
            projection: '',
            findings: '',
            impressions: '',
            conclusion: '',
            description: '',
            price: testPrice,
            maxDiscountPercentage: maxDiscount
        };
        console.log("reqObjaddRadiologyTest", reqObj)
        const apiRes = await addRadiologyTestAPI(reqObj);
        console.log("apiRes", apiRes);
        if (apiRes) {
            onClose();
        }
    }

    const updateRadiologyTest = async () => {
        let reqObj = {
            testName: testName,
            shortCode: '',
            xrayTechnique: '',
            projection: '',
            findings: '',
            impressions: '',
            conclusion: '',
            description: '',
            price: testPrice,
            _id: testID,
            maxDiscountPercentage: maxDiscount
        }
        console.log("reqObjupdateRadiologyTest", reqObj)
        const apiRes = await addRadiologyTestAPI(reqObj);
        console.log("apiRes", apiRes);
        if (apiRes) {
            onClose();
        }
    }

    const closeModal = () => {
        onClose();
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
                        width: '45%', // Width of the modal content
                        minHeight: '200px', // Height of the modal content
                        maxHeight: '400px',
                        margin: '25px auto', // Center the modal
                        padding: '0px'
                    },
                }}
            >
                <div className="goalsformdiv p-2">
                    <h5 className='page-header'>{isEdit ? 'Update Radiology Test' : 'Add Radiology Test'}</h5>

                </div>
                <div className="form-goal">
                    <div className="row">

                        <div className="material-textfield matinput_div">
                            <label id="10677" className="matLabel">Test Name<span className="required">*</span></label>
                            <input type="text" className="form-control form-control-sm matInput goalname"
                                name='testName' value={testName} placeholder="Test Name"
                                onChange={handleChange}
                                required />
                        </div>
                    </div>
                    <div className="row">

                        <div className="material-textfield matinput_div">
                            <label id="10677" className="matLabel">Test Price<span className="required">*</span></label>
                            <input type="text" className="form-control form-control-sm matInput goalname"
                                name='testPrice' value={testPrice} placeholder="Test Price"
                                onChange={handleChange}
                                required />
                        </div>
                    </div>
                    <div className="row">

                        <div className="material-textfield matinput_div">
                            <label id="10677" className="matLabel">Max discount allowed(%)</label>
                            <input type="text" className="form-control form-control-sm matInput goalname"
                                name='maxDiscount' value={maxDiscount} placeholder="Max discount allowed(%)"
                                onChange={handleChange}
                                required />
                        </div>
                    </div>
                    <div className="row">

                        <div className="material-textfield matinput_div">
                            <label id="10677" className="matLabel">Max price</label>
                            <input type="text" className="form-control form-control-sm matInput goalname"
                                name='maxPrice' value={maxPrice} placeholder="Max price"
                                onChange={handleChange}
                                required readOnly />
                        </div>
                    </div>
                    <div className='p-4 d-flex justify-content-end'>
                        {
                            isEdit ? (
                                <button className='add-radiology-test-btn mx-2' onClick={updateRadiologyTest}>Update</button>
                            ) : (
                                <button className='add-radiology-test-btn mx-2' onClick={addRadiologyTest}>Add</button>
                            )
                        }

                        <button className='close-radiology-test-btn' onClick={closeModal}>Close</button>
                    </div>
                </div>


            </Modal>
        </div>
    )
}

export default CreateRadiologyTest;