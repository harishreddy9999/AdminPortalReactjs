import React, { useEffect, useState } from "react";
import { getAllConfiguredSubscriptionAPI, deleteSubscriptionAPI } from '../../services/adminportalService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SubscriptionPackageConfiguration from "./Admin-PackageConfiguration";

const SubscriptionPackages = () => {

    const [packageSubscriptions, setpackageSubscriptions] = useState([]);
    const [isAddNewSubscPackage, setisAddNewSubscPackage] = useState(false);
    const [isAddNewSubscPackageOpen, setisAddNewSubscPackageOpen] = useState(false);
    useEffect(() => {
        getAllSubscription();
    }, [])
    const getAllSubscription = async () => {
        const apiRes = await getAllConfiguredSubscriptionAPI();
        console.log("apiRes", apiRes);
        setpackageSubscriptions(apiRes);
    }

    const deleteSubscription = async (value) => {
        let obj = {
            subscriptionID: value._id
        }
        console.log("obj", obj);
        const apiRes = await deleteSubscriptionAPI(obj);
        console.log("apiRes", apiRes);
        if (apiRes) {
            getAllSubscription();
        }
    }

    const addNewSubscriptionPackage = () => {
        setisAddNewSubscPackage(true);
        setisAddNewSubscPackageOpen(true);
    }

    const closeAllModals = () => {
        setisAddNewSubscPackage(false);
        setisAddNewSubscPackageOpen(false);
    }


    return (
        <div className="row">
            <div className="panellist-main-container">
                <div className="row">
                    <div className='col-6'>
                        <label className="heading screen-heading">SUBSCRIPTION PACKAGES</label>
                    </div>

                    <div className='col-6 d-flex justify-content-end'>
                        <button className="add-panel-btn" onClick={addNewSubscriptionPackage} >ADD NEW SUBSCRIPTION</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='panel-list-table'>
                        <Paper>
                            <TableContainer>
                                <Table className='custom-drugs-tbl'>
                                    <TableHead className='custom-drugs-tbl-header-row'>
                                        <TableRow className=''>
                                            <TableCell className='custom-drugs-tbl-header'>#</TableCell>
                                            <TableCell className='custom-drugs-tbl-header'>SUBSCRIPTION NAME</TableCell>
                                            <TableCell className='custom-drugs-tbl-header'>PRODUCT</TableCell>
                                            <TableCell className='custom-drugs-tbl-header'>DURATION</TableCell>
                                            <TableCell className='custom-drugs-tbl-header'>ACUTAL PRICE</TableCell>
                                            <TableCell className='custom-drugs-tbl-header'>DISCOUNTED PRICE</TableCell>
                                            <TableCell className='custom-drugs-tbl-header'>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className='custom-drugs-tbl-body'>
                                        {packageSubscriptions.map((subscription, index) => (
                                            <TableRow key={index} className='custom-drugs-tbl-body-td'>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{subscription.subscriptionName}</TableCell>
                                                <TableCell>{subscription.application}</TableCell>
                                                <TableCell>
                                                    {subscription.duration !== '0' ? (
                                                        <span>{subscription.duration}</span>
                                                    ) : 'Free Trial'}
                                                </TableCell>
                                                <TableCell>{subscription.actualPrice}</TableCell>
                                                <TableCell>{subscription.finalPriceAfterDiscount}</TableCell>
                                                <TableCell>
                                                    <img onClick={() => deleteSubscription(subscription)} className='edit-panel-img' src='../images/Admin-icons/delete-panel.svg' alt='delete-panel' />


                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Paper>
                    </div>
                </div>
            </div>
            {
                isAddNewSubscPackage ? (<SubscriptionPackageConfiguration isOpen={isAddNewSubscPackageOpen} onClose={closeAllModals} />) : ''
            }
        </div>
    )
}

export default SubscriptionPackages;