import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../../Styles/Admin-users.css';
import { getAllClinicSubscriptionsAPI, getAllPharmacySubscriptionsAPI } from '../../services/adminportalService';
import moment from 'moment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';
import UpdateClinicSubscriptionModal from './Admin-UpdateClinicSubscription';

const AdminSubscripions = () => {
    const [clinicSubscriptionsData, setclinicSubscriptionsData] = useState([]);
    const [pharmacySubscriptionsData, setpharmacySubscriptionsData] = useState([]);
    const [selectedTab, setSelectedTab] = useState('Clinic');
    const [isClinicSubscriptionModal, setisClinicSubscriptionModal] = useState(false);
    const [isClinicSubscriptionModalOpen, setisClinicSubscriptionModalOpen] = useState(false);
    const [selectedClinic, setSelectedClinic] = useState(null);
    useEffect(() => {
        getList();
        // getClinicSubscriptions();
    }, [selectedTab])

    const showTab = (value) => {
        console.log(value);
        setSelectedTab(value);
    }
    const getList = () => {
        if (selectedTab === "Clinic") {
            getClinicSubscriptions();
        } else if (selectedTab === "Pharmacy") {
            getpharmacySubscriptions();
        }
    }
    const getClinicSubscriptions = async () => {
        const apiResponse = await getAllClinicSubscriptionsAPI();
        const clinicSubscriptionsData = apiResponse;
        console.log("apiResponse", apiResponse);
        clinicSubscriptionsData.forEach((el) => {
            if (el.subscriptionStatus) {
                el.subscriptionName = el.subscriptionDetail.subscriptionName;
                el.subscriptionStartDate = moment(el.subscriptionDetail.subscriptionStartDate).format("DD/MM/YYYY");
                el.subscriptionEndDate = moment(el.subscriptionDetail.subscriptionEndDate).format("DD/MM/YYYY");
                el.subscriptionAmount = el.subscriptionDetail.finalPriceAfterDiscount;
                el.subscriptionStatus = el.subscriptionDetail.subscriptionStatus;
            } else {
                if (Object.keys(el.subscriptionDetail).length === 0) {
                    el.subscriptionName = "";
                    el.subscriptionStartDate = "";
                    el.subscriptionEndDate = "";
                    el.subscriptionAmount = "";
                    el.subscriptionStatus = "NEW";
                } else {
                    el.subscriptionName = el.subscriptionDetail.subscriptionName;
                    el.subscriptionStartDate = moment(el.subscriptionDetail.subscriptionStartDate).format("YYYY-MM-DD");
                    el.subscriptionEndDate = moment(el.subscriptionDetail.subscriptionEndDate).format("YYYY-MM-DD");
                    el.subscriptionAmount = el.subscriptionDetail.finalPriceAfterDiscount;
                    el.subscriptionStatus = el.subscriptionDetail.subscriptionStatus;
                }
            }
        });
        setclinicSubscriptionsData(apiResponse);

        console.log("clinicSubscriptionsData", clinicSubscriptionsData);
    }
    const getpharmacySubscriptions = async () => {
        const apiResponse = await getAllPharmacySubscriptionsAPI();
        console.log("apiResponse", apiResponse);
        const pharmacySubscriptionsData = apiResponse;
        pharmacySubscriptionsData.forEach((el) => {
            if (el.subscriptionStatus) {
                el.subscriptionName = el.subscriptionDetail.subscriptionName;
                el.subscriptionStartDate = moment(el.subscriptionDetail.subscriptionStartDate).format("YYYY-MM-DD");
                el.subscriptionEndDate = moment(el.subscriptionDetail.subscriptionEndDate).format("YYYY-MM-DD");
                el.subscriptionAmount = el.subscriptionDetail.finalPriceAfterDiscount;
                el.subscriptionStatus = el.subscriptionDetail.subscriptionStatus;
            } else {
                if (Object.keys(el.subscriptionDetail).length === 0) {
                    el.subscriptionName = "---";
                    el.subscriptionStartDate = "---";
                    el.subscriptionEndDate = "---";
                    el.subscriptionAmount = "---";
                    el.subscriptionStatus = "NEW";
                } else {
                    el.subscriptionName = el.subscriptionDetail.subscriptionName;
                    el.subscriptionStartDate = moment(el.subscriptionDetail.subscriptionStartDate).format("YYYY-MM-DD");
                    el.subscriptionEndDate = moment(el.subscriptionDetail.subscriptionEndDate).format("YYYY-MM-DD");
                    el.subscriptionAmount = el.subscriptionDetail.finalPriceAfterDiscount;
                    el.subscriptionStatus = el.subscriptionDetail.subscriptionStatus;
                }
            }

        })
        setpharmacySubscriptionsData(pharmacySubscriptionsData);
        console.log("pharmacySubscriptionsData", pharmacySubscriptionsData)
    }
    const updateClinicSubscription = (clinic) => {
        console.log("update", clinic);
        setSelectedClinic(clinic)
        setisClinicSubscriptionModal(true);
        setisClinicSubscriptionModalOpen(true);

    }
    const closeAllModals = () => {
        setSelectedClinic(null)
        setisClinicSubscriptionModal(false);
        setisClinicSubscriptionModalOpen(false);
        getList();
    }
    const updatePharmacySubscription = (pharmacy) => {
        console.log("pharmacy", pharmacy);
    }
    return (
        <div className='wellness-main-screen'>
            <div className='row'>
                <div className='tabs-row'>
                    <p className={`tab-heading ${selectedTab === 'Clinic' ? 'active' : ''}`} onClick={() => showTab('Clinic')}>Clinic Subscriptions</p>
                    <p className={`tab-heading ${selectedTab === 'Pharmacy' ? 'active' : ''}`} onClick={() => showTab('Pharmacy')}>Pharmacy Subscriptions</p>
                </div>
                <div className='list-row mt-3'>
                    {
                        selectedTab === 'Clinic' ? (
                            <div className='panel-list-table'>
                                <Paper>
                                    <TableContainer>
                                        <Table className='custom-drugs-tbl'>
                                            <TableHead className='custom-drugs-tbl-header-row'>
                                                <TableRow className=''>
                                                    <TableCell className='custom-drugs-tbl-header'>#</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>CLINIC NAME</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>REGISTRATION NUMBER</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>ADDRESS</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>CONTACT NUMBER</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>START DATE</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>END DATE</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>AMOUNT</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>STATUS</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>ACTIONS</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody className='custom-drugs-tbl-body'>
                                                {clinicSubscriptionsData.map((patrow, index) => (
                                                    <TableRow key={index} className='custom-drugs-tbl-body-td'>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{patrow.clinicName}</TableCell>
                                                        <TableCell>{patrow.registrationNumber}</TableCell>
                                                        <TableCell>{patrow.clinicAddress.city}</TableCell>
                                                        <TableCell>{patrow.phoneNumber}</TableCell>
                                                        <TableCell>{patrow.subscriptionStartDate}</TableCell>
                                                        <TableCell>{patrow.subscriptionEndDate}</TableCell>
                                                        <TableCell>{patrow.subscriptionAmount}</TableCell>
                                                        <TableCell>{patrow.subscriptionStatus}</TableCell>
                                                        <TableCell>
                                                            {
                                                                patrow.subscriptionStatus != 'ACTIVE' ? (
                                                                    <button className='add-subscription-btn' onClick={() => updateClinicSubscription(patrow)}>ADD</button>
                                                                ) : ''
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </Paper>
                            </div>
                        ) : ''
                    }
                    {
                        selectedTab === 'Pharmacy' ? (
                            <div className='panel-list-table'>
                                <Paper>
                                    <TableContainer>
                                        <Table className='custom-drugs-tbl'>
                                            <TableHead className='custom-drugs-tbl-header-row'>
                                                <TableRow className=''>
                                                    <TableCell className='custom-drugs-tbl-header'>#</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>PHARMACY NAME</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>LICIENCE NUMBER</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>ADDRESS</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>CONTACT NUMBER</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>SUBSCRIPTION NAME</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>START DATE</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>END DATE</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>AMOUNT</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>STATUS</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>ACTIONS</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody className='custom-drugs-tbl-body'>
                                                {pharmacySubscriptionsData.map((patrow, index) => (
                                                    <TableRow key={index} className='custom-drugs-tbl-body-td'>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{patrow.pharmacyName}</TableCell>
                                                        <TableCell>{patrow.licenseNumber}</TableCell>
                                                        <TableCell>{patrow?.city}</TableCell>
                                                        <TableCell>{patrow.mobile}</TableCell>
                                                        <TableCell>{patrow.subscriptionName}</TableCell>
                                                        <TableCell>{patrow.subscriptionStartDate}</TableCell>
                                                        <TableCell>{patrow.subscriptionEndDate}</TableCell>
                                                        <TableCell>{patrow.subscriptionAmount}</TableCell>
                                                        <TableCell>{patrow.subscriptionStatus}</TableCell>
                                                        <TableCell>
                                                            {
                                                                patrow.subscriptionStatus != 'ACTIVE' ? (
                                                                    <button className='add-subscription-btn' onClick={() => updatePharmacySubscription(patrow)}>ADD</button>
                                                                ) : ''
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </Paper>
                            </div>
                        ) : ''
                    }
                </div>
            </div>
            {
                isClinicSubscriptionModal ? (<UpdateClinicSubscriptionModal isOpen={isClinicSubscriptionModalOpen} onClose={closeAllModals} clinic={selectedClinic} />) : ''
            }
        </div>
    )
}

export default AdminSubscripions;