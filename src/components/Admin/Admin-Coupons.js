import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../../Styles/AdminCoupons.css';
import moment from 'moment';
import { getAllCouponsDataAPI, activeCouponAPI, getAllUserCouponsAPI, addUserCouponAPI } from '../../services/adminportalService';
import { fetchPatientDetailsAPI } from '../../services/patientScreeningSrv';
import AddNewCoupon from './Admin-AddNewCoupon';
import Switch from '@material-ui/core/Switch';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const AdminCoupons = () => {

    const [filterStartDate, setFilterStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [filterEndDate, setFilterEndDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [filterCouponFor, setFilterCouponFor] = useState('ALL');
    const [filterIsActive, setFilterIsActive] = useState('ALL');
    const [couponsList, setCouponsList] = useState([]);
    const [couponCount, setCouponCount] = useState(0);
    const [isAddNewCoupon, setIsAddNewCoupon] = useState(false);
    const [selectedTab, setSelectedTab] = useState('Coupons');
    const [userCouponsData, setUserCouponData] = useState([]);
    const [primaryPatientUser, setPrimaryUser] = useState(null);
    const [showPatientDetails, setShowPatientDetails] = useState(false);
    const [selectedPatientID, setselectedPatientID] = useState('');
    const [couponFor, setCouponFor] = useState('');
    const [couponID, setCouponID] = useState('');

    const [applyCouponForm, setApplyCouponForm] = useState({
        mobileNumber: '',
        patientName: '',
        patientAge: '',
        applyCoupon: ''
    });

    const [value, setValue] = useState(0);
    useEffect(() => {
        getList();

    }, [value, filterStartDate, filterEndDate, filterCouponFor, filterIsActive]);
    const onStartDateChange = (e) => {
        // debugger;
        console.log("onStartDateChange", e);
        setFilterStartDate(e.target.value);

    };
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const onEndDateChange = (e) => {
        console.log("onEndDateChange", e);
        setFilterEndDate(e.target.value);

    };

    const onCouponForChange = (e) => {
        console.log("onCouponForChange", e);
        setFilterCouponFor(e.target.value);

    };

    const onIsActiveChange = (e) => {
        console.log("onIsActiveChange", e);
        setFilterIsActive(e.target.value);

    };
    const getList = () => {
        if (value === 0) {
            getAllCouponsData();
        } else if (value === 1) {
            getAllUSerCoupons();
        }
    }
    const getAllCouponsData = async () => {
        try {
            console.log(filterCouponFor, filterStartDate, filterEndDate, filterIsActive);
            // debugger;
            const getAllCouponsDataRes = await getAllCouponsDataAPI(filterCouponFor, 0, 100, filterStartDate, filterEndDate, filterIsActive);
            console.log("getAllCouponsDataRes", getAllCouponsDataRes);
            setCouponsList(getAllCouponsDataRes.coupons);
            setCouponCount(getAllCouponsDataRes.count);
        } catch {

        }
    }

    const getAllUSerCoupons = async () => {
        const apiRes = await getAllUserCouponsAPI();
        console.log("apiRes", apiRes);
        setUserCouponData(apiRes.coupons);
    }
    const addNewCoupon = () => {
        setIsAddNewCoupon(true);
    }

    const closeAllModals = () => {
        // setSelectedComplaint(null);
        setIsAddNewCoupon(false);
        // debugger;
    };
    const upddateActiveStatus = async (event, index, program) => {
        console.log(program, event.target.checked);
        let obj = {
            _id: program._id,
            isActive: event.target.checked,
        };

        const apiRes = await activeCouponAPI(obj);
        console.log("apiRes", apiRes);
        if (apiRes.message) {
            getAllCouponsData();
        }
    }

    const deleteCoupon = async (coupon) => {
        let obj = {
            _id: coupon._id,
            delete: true,
        };
        const apiRes = await activeCouponAPI(obj);
        if (apiRes) {
            getAllCouponsData();
        }
    }



    const handleApplyCoupon = (data) => {
        // debugger;

        setApplyCouponForm({ ...applyCouponForm, applyCoupon: data.couponNumber });
        setCouponID(data._id);
        setCouponFor(data.couponFor);
        // Handle applying the coupon here
        console.log('Applying coupon:', data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApplyCouponForm({ ...applyCouponForm, [name]: value });
        if (name === "mobileNumber") {
            if (value.length === 10) {
                fetchPatient(value);
            } else {
                setPrimaryUser(null);
                setShowPatientDetails(false);
            }
        }
    }

    const fetchPatient = async (value) => {
        const apiRes = await fetchPatientDetailsAPI(value);
        console.log("apiRes", apiRes)
        if (apiRes) {
            let primaryUserDetailsObj = {
                patientID: apiRes.primaryUserDetails[0]._id,
                patientName: apiRes.primaryUserDetails[0].demographicInfo.firstName + " " + apiRes.primaryUserDetails[0].demographicInfo.lastName,
                patientAge: apiRes.primaryUserDetails[0].demographicInfo.dOB
            }
            setPrimaryUser(primaryUserDetailsObj);
            setShowPatientDetails(true);
            // setTimeout(() => {

            // }, 1000)

        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let obj = {
            couponID: couponID,
            patientID: selectedPatientID,
            couponNumber: applyCouponForm.applyCoupon,
            couponFor: couponFor
        };
        console.log("applyCouponForm", applyCouponForm, obj);
        // return;
        const apiRes = await addUserCouponAPI(obj);
        console.log("apiRes", apiRes);
        if (apiRes.message == 'Coupon code already used') {

        }
        else {
            setApplyCouponForm({
                mobileNumber: '',
                patientName: '',
                patientAge: '',
                applyCoupon: ''
            });
            setCouponFor('');
            setCouponID('');
            setselectedPatientID('');
        }
        getList();



    }

    const selectPatient = () => {
        console.log(primaryPatientUser);

        const patientAge = calculateAge(primaryPatientUser.patientAge)
        setselectedPatientID(primaryPatientUser.patientID);
        setShowPatientDetails(false);
        // debugger;
        setApplyCouponForm({ ...applyCouponForm, patientName: primaryPatientUser.patientName, patientAge: patientAge });
        // setApplyCouponForm({ ...applyCouponForm,  });
    }

    const calculateAge = (dob) => {
        var formattedDate = moment(dob).format('YYYY-MM-DD');
        const today = moment();
        const ageOfPatient = today.diff(formattedDate, 'years', false);
        return ageOfPatient;
    }

    const editDocisnCoupon = (coupon) => {
        setIsAddNewCoupon(true);

    }

    return (

        <div className="container-fluid">
            <div className='tabs-row'>

                <Tabs value={value} onChange={handleTabChange} className="vTabs" >
                    <Tab className={value === 0 ? "vselected-tab" : "vtab"} label={<span className={value === 0 ? "vselected-text" : "vtabtext"}>Coupons</span>} />
                    <Tab className={value === 1 ? "vselected-tab" : "vtab"} label={<span className={value === 1 ? "vselected-text" : "vtabtext"}>Coupons List</span>} />

                </Tabs>
                {/* <p className={`tab-heading ${selectedTab === 'Coupons' ? 'active' : ''}`} onClick={() => showTab('Coupons')}>Coupons</p>
                <p className={`tab-heading ${selectedTab === 'List' ? 'active' : ''}`} onClick={() => showTab('List')}>Coupons List</p> */}
            </div>
            <div className='list-row mt-3'>
                {
                    value === 0 ? (
                        <div className='row'>
                            <div id="13397" className="row">
                                <div id="13398" className="d-flex justify-content-between">
                                    <div id="13399" className="ms-0 tabSection provider-tabs">
                                        <span id="doc">Coupons List</span>
                                    </div>
                                    <div className="me-3">
                                        <button className="new-btn" type="button" id="add-coupon-btn" onClick={addNewCoupon}> Add
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="row ">
                                <div className="p-1">
                                    <form>
                                        <div className="row topfields">
                                            <div className="col-3 col-lg-3 col-md-6 col-sm-12 ps-3 pe-3">
                                                <label className="padd">Start Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    placeholder=" "
                                                    value={filterStartDate}
                                                    onChange={onStartDateChange}
                                                />

                                            </div>
                                            <div className="col-3 col-lg-3 col-md-6 col-sm-12 ps-3 pe-3">
                                                <label className="padd">End Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    placeholder=" "
                                                    value={filterEndDate}
                                                    onChange={onEndDateChange}
                                                />
                                            </div>
                                            <div className="col-3 col-lg-3 col-md-6 col-sm-12 ps-3 pe-3">
                                                <label className="padd">Type of Coupon Code</label>
                                                <select
                                                    className="form-control"
                                                    value={filterCouponFor}
                                                    onChange={onCouponForChange}
                                                >
                                                    <option value="ALL">All</option>
                                                    <option value="APPOINTMENTS">Appointments</option>
                                                    <option value="SCANS">Scans</option>
                                                    <option value="LABORDERS">Lab Orders</option>
                                                    <option value="PHARMACYORDERS">Pharmacy Orders</option>
                                                </select>

                                            </div>
                                            <div className="col-3 col-lg-3 col-md-6 col-sm-12 ps-3 pe-3">
                                                <label className="padd">Coupon Status</label>
                                                <select
                                                    className="form-control"
                                                    value={filterIsActive}
                                                    onChange={onIsActiveChange}
                                                >
                                                    <option value="ALL">All</option>
                                                    <option value="ACTIVE">Active</option>
                                                    <option value="INACTIVE">In Active</option>
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                                    <div id="13743" className="table-header patients-table-header">
                                        <div id="13744" className="row">
                                            <div className="col-lg-3 col-md-3 col-sm-3 table-header-text" id="table-patients">Title Name
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-3 table-header-text row" id="table-date">Coupon For
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 table-header-text row" id="table-gender">Coupon Code
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-3 table-header-text p-0" id="table-age">Start Date -
                                                End
                                                Date</div>
                                            <div className="col-lg-1 col-md-1 col-sm-1 table-header-text row" id="table-gender">Status
                                            </div>
                                            <div className="col-lg-1 col-md-1 col-sm-1 table-header-text p-0" id="table-chiefcomplaint">
                                                Actions
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row tablebody'>
                                        <div className='pt-1 pb-1 border-bottom'>
                                            {couponsList.length == 0 ?
                                                (<div className="row d-flex justify-content-center" >
                                                    No Data Found
                                                </div>) : ''}
                                        </div>
                                        {couponsList.length > 0 && couponsList.map((coupon, index) => (
                                            <div className='pt-1 pb-1 border-bottom' key={index}>
                                                <div className="row " >
                                                    <div className="col-lg-3 col-md-3 col-sm-3 clinicDetails d-flex flex-column"
                                                        id="table-patients">
                                                        {coupon.titleName}
                                                    </div>
                                                    <div className="col-lg-3 col-md-3 col-sm-3 clinicDetails p-0 d-flex flex-column"
                                                        id="table-date">
                                                        {coupon.couponFor}</div>
                                                    <div className="col-lg-2 col-md-2 col-sm-2 clinicDetails p-0 d-flex flex-column"
                                                        id="table-gender">{coupon.couponNumber}
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 col-sm-3 clinicDetails p-0 d-flex flex-column"
                                                        id="table-age">
                                                        {moment(new Date(coupon.startDate)).format("DD/MM/YYYY")} - {moment(new Date(coupon.endDate)).format("DD/MM/YYYY")}
                                                    </div>
                                                    <div className="col-lg-1 col-md-1 col-sm-1 clinicDetails p-0 d-flex flex-column"
                                                        id="table-chiefcomplaint">

                                                        <div>
                                                            <Switch
                                                                checked={coupon.isActive} // Assuming `enabled` is a boolean field in your data
                                                                onChange={(event) => upddateActiveStatus(event, index, coupon)} // Adjust your handleToggle function accordingly
                                                                name={`toggle-${index}`}
                                                                color="primary"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-1 col-md-1 col-sm-1 clinicDetails justify-content-center p-0"
                                                        id="table-chiefcomplaint">


                                                        <img className="edit-icon me-1"
                                                            src="../images/edit.svg" alt='edit-coupon' onClick={() => editDocisnCoupon(coupon)} />
                                                        <img className="delete-icon ms-1" onClick={() => deleteCoupon(coupon)}
                                                            src="../images/delete.png" alt='delete-coupon' />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    ) : ''
                }
                {
                    value === 1 ? (
                        <div className='user-coupons-card-row'>
                            <div className='row'>
                                <div className='col-lg-6 col-md-6 col-sm-12 brd-right'>
                                    <div className='row-heading'>
                                        <p className='sub-heading'>Coupons</p>
                                    </div>
                                    <div className='user-coupon-cards-row'>
                                        {userCouponsData.map((data, i) => (
                                            <div className="coupon-code" key={i}>
                                                <div className="user-coupon-card px-2 py-1">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className='coupon-titleName'>{data.titleName}</div>
                                                        <span className="coupNumber">{data.couponNumber}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="description">
                                                            {data.couponFor} - {data.description}
                                                        </div>
                                                        <span>
                                                            <input
                                                                type="radio"
                                                                className="d-none"
                                                                name="coupon"
                                                                id={`coupon${i}`}
                                                                onChange={() => handleApplyCoupon(data)}
                                                            />
                                                            <label htmlFor={`coupon${i}`} className="apply-btn">
                                                                Apply
                                                            </label>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-12'>
                                    <div className='row-heading'>
                                        <p className='sub-heading'>Apply Coupon</p>

                                    </div>
                                    <div className='apply-coupon-row'>
                                        <form onSubmit={handleSubmit}>
                                            <div className='row position-relative' >
                                                <label className='form-lbl'>Mobile Number</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="mobileNumber"
                                                    value={applyCouponForm.mobileNumber}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                {showPatientDetails ? (
                                                    <div className='patients-list'>


                                                        <p className='patient-name' onClick={selectPatient} >
                                                            {primaryPatientUser.patientName}
                                                        </p>


                                                    </div>
                                                ) : ''
                                                }
                                            </div>
                                            <div className='row'>
                                                <label className='form-lbl'>Patient Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="patientName"
                                                    value={applyCouponForm.patientName}
                                                    onChange={handleChange}
                                                    required readOnly
                                                />
                                            </div>
                                            <div className='row'>
                                                <label className='form-lbl'>Patient Age</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="patientAge"
                                                    value={applyCouponForm.patientAge}
                                                    onChange={handleChange}
                                                    required readOnly
                                                />
                                            </div>
                                            <div className='row'>
                                                <label className='form-lbl'>Coupon Code</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="patientName"
                                                    value={applyCouponForm.applyCoupon}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className='row d-flex justify-content-end'>
                                                <button type='submit' className='provider-submit-btn'>Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ''
                }
            </div>

            {isAddNewCoupon ? (<AddNewCoupon isOpen={isAddNewCoupon} onClose={closeAllModals} />) : ''}

        </div>
    )
}

export default AdminCoupons;