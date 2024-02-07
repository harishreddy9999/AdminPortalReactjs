import React, { useState } from 'react';
import '../../App.css';
import '../../Styles/AddNewCoupon.css';
import Modal from 'react-modal';
import { FormControlLabel, Switch } from '@mui/material';
import { createCouponAPI } from '../../services/adminportalService';

// import moment from 'moment';


const AddNewCoupon = ({ isOpen, onClose }) => {

    const [couponCodeForApt, setCouponCodeForApt] = useState(false);
    const [couponCodeForScans, setCouponCodeForScans] = useState(false);
    const [couponCodeForLAP, setCouponCodeForLAP] = useState(false);
    const [isDiscountApplicable, setIsDiscountApplicable] = useState(false);
    const [duraiondropHide, setduraiondropHide] = useState(false);
    const [isCorporate, setIsCorporate] = useState(false);
    const [isShowInDocisn, setisShowInDocisn] = useState(false);
    const [formData, setFormData] = useState({
        titleName: '',
        typeOfBenefits: '',
        couponNumber: '',
        startDate: '',
        endDate: '',
        couponCodeForApt: '',
        isDiscountApplicable: false,
        maxDiscountAmount: '',
        minDiscountAmount: '',
        videoAppointment: '',
        walkAppointment: '',
        noOfScans: '',
        actualPrice: '',
        discountPrice: '',
        isDiscountDateSame: false,
        validStartDate: '',
        validEndDate: '',
        description: '',
        noOfTimeUSage: '',
        usageGapTime: '',
        isCorporate: false,
        emailDomain: '',
        termsConditionsList: [''],
        showInDocisn: false
    });
    let durationarray = [{ name: 'Days', value: 0 }, { name: 'Weeks', value: 0 }, { name: 'Months', value: 0 }, { name: 'Years', value: 0 }]
    const [durationList, setDurationList] = useState(durationarray)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // debugger;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (name === "couponCodeForApt") {
            if (value === "APPOINTMENTS") {
                setCouponCodeForApt(true);
                setCouponCodeForScans(false);
                setCouponCodeForLAP(false);
                setIsDiscountApplicable(false);
            } else if (value === "SCANS") {
                setCouponCodeForApt(false);
                setCouponCodeForScans(true);
                setCouponCodeForLAP(false);
                setIsDiscountApplicable(false);
            } else if (value === "LABORDERS" || value === "PHARMACYORDERS") {
                setCouponCodeForApt(false);
                setCouponCodeForScans(false);
                setCouponCodeForLAP(true);
                setIsDiscountApplicable(false);
            }
        }
        if (name === "isDiscountApplicable") {
            if (checked) {
                setIsDiscountApplicable(true);
            } else {
                setIsDiscountApplicable(false);
            }
        }
        if (name === "usageGapTime") {
            // debugger;
            if (Number(value) > 0) {
                // debugger
                durationarray.forEach((el, i) => {
                    durationarray[i].value = value;
                });
                setDurationList(durationarray);
                setduraiondropHide(true);
            } else {
                // debugger
                setduraiondropHide(false);
            }

        }
        if (name === "isCorporate") {
            // debugger;
            if (checked) {
                setIsCorporate(true);
            } else {
                setIsCorporate(false);
            }
        }
        if (name === "showInDocisn") {
            // debugger;
            if (checked) {
                setisShowInDocisn(true);
            } else {
                setisShowInDocisn(false);
            }
        }
        console.table("durationarray", durationarray, durationList)
    };

    const handleTermsChange = (value, index) => {
        // debugger;
        const newTerms = [...formData.termsConditionsList];
        newTerms[index] = value;
        setFormData(prevState => ({
            ...prevState,
            termsConditionsList: newTerms
        }));
        console.log(formData.termsConditionsList)
    };

    const handleAddTerm = () => {
        setFormData(prevState => ({
            ...prevState,
            termsConditionsList: [...prevState.termsConditionsList, '']
        }));
    };

    const handleRemoveTerm = (index) => {
        const newTerms = [...formData.termsConditionsList];
        newTerms.splice(index, 1);
        setFormData(prevState => ({
            ...prevState,
            termsConditionsList: newTerms
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let reqObj = {
            titleName: formData.titleName,
            typeOfBenefits: formData.typeOfBenefits,
            couponNumber: formData.couponNumber,
            startDate: formData.startDate,
            endDate: formData.endDate,
            couponFor: formData.couponCodeForApt,
            actualPrice: formData.actualPrice,
            discountPrice: formData.discountPrice,
            isDiscountApplicable: formData.isDiscountApplicable,
            maxDiscountAmount: formData.maxDiscountAmount,
            minDiscountAmount: formData.minDiscountAmount,
            description: formData.description,
            noOfScans: formData.noOfScans,
            dicountStartDate: formData.validStartDate,
            dicountEndDate: formData.validEndDate,
            isDiscountDateSame: formData.isDiscountDateSame,
            termsAndConditions: formData.termsConditionsList,
            // listOfInstructions: formData,
            videoCount: formData.videoAppointment,
            walkinCount: formData.walkAppointment,
            noOfUsages: formData.noOfTimeUSage,
            usageGapTime: formData.usageGapTime,
            isCorporate: formData.isCorporate,
            emailDomain: formData.emailDomain,
            showInDocisn: formData.showInDocisn
        }
        console.log(formData, reqObj);
        try {
            const createCouponRes = await createCouponAPI(reqObj);
            console.log("createCouponRes", createCouponRes);
            onClose();
        } catch {
            console.error("Error creating coupon:", error);
        }


        // Form submission logic goes here
    };

    const selectGapTime = (item) => {
        console.log(item);
        setFormData(prevState => ({
            ...prevState,
            usageGapTime: item.value + ' ' + item.name
        }));
        setduraiondropHide(false);
    }
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
                    <div id="pt-Coupons">Add Coupons</div>
                </div>
                <div className="form-coupon">

                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-4'>
                                <label className='form-lbl'>Title Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="titleName"
                                    value={formData.titleName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='col-4'>
                                <label className='form-lbl'>Type of Benefits</label>
                                <select
                                    type="text"
                                    className="form-control"
                                    name="typeOfBenefits"
                                    value={formData.typeOfBenefits}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="OFFERCODE">Offer Code</option>
                                    <option value="COUPONCODE">Coupon Code</option>
                                </select>
                            </div>
                            <div className='col-4'>
                                <label className='form-lbl'>Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="couponNumber"
                                    value={formData.couponNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='col-4'>
                                <label className='form-lbl'>Start Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='col-4'>
                                <label className='form-lbl'>End Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='col-4'>
                                <label className='form-lbl'>Type of Coupon Code</label>
                                <select
                                    type="text"
                                    className="form-control"
                                    name="couponCodeForApt"
                                    value={formData.couponCodeForApt}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="APPOINTMENTS">Appointments</option>
                                    <option value="SCANS">Scans</option>
                                    <option value="LABORDERS">Lab Orders</option>
                                    <option value="PHARMACYORDERS">Pharmacy Orders</option>
                                </select>
                            </div>
                            {
                                couponCodeForApt ? (
                                    <div className='col-4'>
                                        <label className='form-lbl'>Video appointment</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="videoAppointment"
                                            value={formData.videoAppointment}
                                            onChange={handleChange}

                                        />
                                    </div>

                                ) : ('')
                            }
                            {
                                couponCodeForApt ? (
                                    <div className='col-4'>
                                        <label className='form-lbl'>Walkin appointment</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="walkAppointment"
                                            value={formData.walkAppointment}
                                            onChange={handleChange}

                                        />
                                    </div>

                                ) : ('')
                            }
                            {
                                couponCodeForScans ? (
                                    <div className='col-4'>
                                        <label className='form-lbl'>No Of Scans</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="noOfScans"
                                            value={formData.noOfScans}
                                            onChange={handleChange}

                                        />
                                    </div>
                                ) : ('')
                            }
                            {
                                couponCodeForApt || couponCodeForScans ? (
                                    <div className='col-4'>
                                        <label className='form-lbl'>Actual Price</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="actualPrice"
                                            value={formData.actualPrice}
                                            onChange={handleChange}

                                        />
                                    </div>
                                ) : ('')
                            }
                            {
                                couponCodeForApt || couponCodeForScans ? (
                                    <div className='col-4'>
                                        <label className='form-lbl'>Discount Price</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="actualPrice"
                                            value={formData.discountPrice}
                                            onChange={handleChange}

                                        />
                                        <label htmlFor="discountToggle">Discount Applicable:</label>
                                        <input
                                            id="discountToggle"
                                            name="isDiscountApplicable"
                                            type="checkbox"
                                            checked={isDiscountApplicable}
                                            value={formData.isDiscountApplicable}
                                            onChange={handleChange}
                                        />
                                        <span>{isDiscountApplicable ? 'Yes' : 'No'}</span>
                                    </div>
                                ) : ('')
                            }
                            {
                                isDiscountApplicable ? (
                                    <div className='col-4'>
                                        <label className='form-lbl'>Discounted Amount Valid Start Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="validStartDate"
                                            value={formData.validStartDate}
                                            onChange={handleChange}

                                        />
                                    </div>
                                ) : ('')
                            }
                            {
                                isDiscountApplicable ? (
                                    <div className='col-4'>
                                        <label className='form-lbl'>Discounted Amount Valid End Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="validEndDate"
                                            value={formData.validEndDate}
                                            onChange={handleChange}

                                        />
                                    </div>
                                ) : ('')
                            }
                            {
                                couponCodeForLAP ? (
                                    <div className='col-4'>
                                        <label className='form-lbl'>Max Discount Amount</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="maxDiscountAmount"
                                            value={formData.maxDiscountAmount}
                                            onChange={handleChange}

                                        />
                                    </div>
                                ) : ('')
                            }
                            {
                                couponCodeForLAP ? (
                                    <div className='col-4'>
                                        <label className='form-lbl'>Min Discount Amount</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="minDiscountAmount"
                                            value={formData.minDiscountAmount}
                                            onChange={handleChange}

                                        />
                                    </div>
                                ) : ('')
                            }
                            <div className='col-4'>
                                <div className="material-textfield">
                                    <label className='form-lbl'>Frequency</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="usageGapTime"
                                        value={formData.usageGapTime}
                                        onChange={handleChange}

                                    />
                                </div>
                                {
                                    duraiondropHide ? (
                                        <div id="14214" className="durationDropdown">
                                            {
                                                durationList.length > 0 && durationList.map((duration, index) => (
                                                    <div key={index} className="durationdays" onClick={() => selectGapTime(duration)} >{duration.value} &nbsp; &nbsp;{duration.name}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) : ('')
                                }

                            </div>
                            <div className='col-4'>
                                <label className='form-lbl'>No of Times Per Frequency</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="noOfTimeUSage"
                                    value={formData.noOfTimeUSage}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className='col-12'>
                                <label className='form-lbl'>Description</label>
                                <textarea
                                    type="number"
                                    className="form-control"
                                    name="couponDescription"
                                    value={formData.couponDescription}
                                    onChange={handleChange}

                                ></textarea>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <label className='form-lbl'>Coupon Validate :</label>
                            </div>
                            <div className='col-3'>

                                <input
                                    id="isCorporate"
                                    name='isCorporate'
                                    type="checkbox"
                                    checked={isCorporate}
                                    value={formData.isCorporate}
                                    onChange={handleChange}
                                />
                                <span>Corporate Domain</span>
                            </div>
                            {
                                isCorporate ? (
                                    <div className='col-4'>
                                        <label className='form-lbl'>Domain Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="emailDomain"
                                            value={formData.emailDomain}
                                            onChange={handleChange}

                                        />
                                    </div>
                                ) : ('')
                            }
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <span>Coupon needs to show in DOCISN APP :</span>
                            </div>
                            <div className='col-5'>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={isShowInDocisn}
                                            value={formData.showInDocisn}
                                            onChange={handleChange}
                                            name="showInDocisn"
                                            color="primary"
                                        />
                                    }
                                    label={isShowInDocisn ? 'Yes' : 'No'}
                                />
                            </div>

                        </div>
                        <div className='row'>
                            <label className='form-lbl'>Terms & Conditions</label>
                            {
                                formData.termsConditionsList.map((term, index) => (
                                    <div key={index} className="py-1">
                                        <div>
                                            <div id="2585" className="row aoe-row">
                                                <div className="col-10 p-0">
                                                    <div className="material-textfield">
                                                        <input
                                                            type="text"
                                                            id="expertise-name"
                                                            className="form-control form-control-sm matInput"
                                                            value={term}
                                                            maxLength="100"
                                                            minLength="2"
                                                            onChange={(e) => handleTermsChange(e.target.value, index)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-2 d-flex align-items-center">
                                                    <img src='../images/add_schedule.png' onClick={handleAddTerm} className='add-terms-img ms-3' alt='add-terms' />
                                                    {index !== 0 && (
                                                        <img
                                                            src="../images/delete.png"
                                                            alt="Delete"
                                                            className="delete-terms ms-2"
                                                            onClick={() => handleRemoveTerm(index)}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div id="9834" className="flex-container d-flex justify-content-end py-2 mt-5">
                            <button id="9835" className="save-btn-sdnd  provider-submit-btn" >Submit</button>
                            <button className="cancelbtn  mx-2" id="24">Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default AddNewCoupon;