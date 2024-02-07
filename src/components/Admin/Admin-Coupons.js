import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../../Styles/AdminCoupons.css';
import moment from 'moment';
import { getAllCouponsDataAPI } from '../../services/adminportalService';
import AddNewCoupon from './Admin-AddNewCoupon';

const AdminCoupons = () => {

    const [filterStartDate, setFilterStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [filterEndDate, setFilterEndDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [filterCouponFor, setFilterCouponFor] = useState('ALL');
    const [filterIsActive, setFilterIsActive] = useState('ALL');
    const [couponsList, setCouponsList] = useState([]);
    const [couponCount, setCouponCount] = useState(0);
    const [isAddNewCoupon, setIsAddNewCoupon] = useState(false);

    useEffect(() => {

        getAllCouponsData();
    }, [filterStartDate, filterEndDate, filterCouponFor, filterIsActive]);
    const onStartDateChange = (e) => {
        // debugger;
        console.log("onStartDateChange", e);
        setFilterStartDate(e.target.value);
        // getAllCouponsData();
        // setFilterStartDate(e.target.value, () => {
        //     getAllCouponsData();
        // });
        // Add any additional logic if needed
    };

    const onEndDateChange = (e) => {
        console.log("onEndDateChange", e);
        setFilterEndDate(e.target.value);
        // getAllCouponsData();
        // setFilterEndDate(e.target.value, () => {
        //     getAllCouponsData();
        // });
        // Add any additional logic if needed
    };

    const onCouponForChange = (e) => {
        console.log("onCouponForChange", e);
        setFilterCouponFor(e.target.value);
        // console.log(filterCouponFor);
        // // debugger;
        // getAllCouponsData();
        // setFilterCouponFor(e.target.value, () => {
        //     getAllCouponsData();
        // });
        // Add any additional logic if needed
    };

    const onIsActiveChange = (e) => {
        console.log("onIsActiveChange", e);
        setFilterIsActive(e.target.value);
        // getAllCouponsData();
        // setFilterIsActive(e.target.value, () => {
        //     getAllCouponsData();
        // });
        // Add any additional logic if needed
    };

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

    const addNewCoupon = () => {
        setIsAddNewCoupon(true);
    }

    const closeAllModals = () => {
        // setSelectedComplaint(null);
        setIsAddNewCoupon(false);
        // debugger;
    };

    return (

        <div className="container-fluid">

            <div id="13397" className="tabsdiv">
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

            <div className="row">
                <div className="p-1">
                    <form>
                        <div className="row">
                            <div className="col-3 col-lg-3 col-md-6 col-sm-12 ps-3 pe-3">
                                <label className="matLabel">Start Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder=" "
                                    value={filterStartDate}
                                    onChange={onStartDateChange}
                                />

                            </div>
                            <div className="col-3 col-lg-3 col-md-6 col-sm-12 ps-3 pe-3">
                                <label className="matLabel">End Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder=" "
                                    value={filterEndDate}
                                    onChange={onEndDateChange}
                                />
                            </div>
                            <div className="col-3 col-lg-3 col-md-6 col-sm-12 ps-3 pe-3">
                                <label className="matLabel">Type of Coupon Code</label>
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
                                <label className="matLabel">Coupon Status</label>
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
                        {couponsList.length > 0 && couponsList.map((coupon, index) => (
                            <div className='pt-4 pb-4 border-bottom' key={index}>
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

                                        <div>{coupon.isActive ? 'Active' : 'Inactive'}</div>
                                    </div>
                                    <div className="col-lg-1 col-md-1 col-sm-1 clinicDetails justify-content-center p-0"
                                        id="table-chiefcomplaint">


                                        <img className="edit-icon me-1"
                                            src="../images/edit.svg" alt='edit-coupon' />
                                        <img className="delete-icon ms-1"
                                            src="../images/delete.png" alt='delete-coupon' />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isAddNewCoupon ? (<AddNewCoupon isOpen={isAddNewCoupon} onClose={closeAllModals} />) : ''}

        </div>
    )
}

export default AdminCoupons;