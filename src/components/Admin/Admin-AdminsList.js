import React, { useEffect, useState } from "react";
import { getAllAdminsListAPI, deleteAdminUserAPI, inActivateAdminAPI } from '../../services/adminportalService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Switch from '@material-ui/core/Switch';
import AddNewAdmin from "./Admin-AddNewAdmin";
import UpdateAdmin from "./Admin-UpdateAdmin";

const AdminsList = () => {

    const [adminsList, setAdminsList] = useState([]);
    const [isAddNewAdmin, setIsAddNewAdmin] = useState(false);
    const [isAddNewAdminOpen, setIsAddNewAdminOpen] = useState(false);
    const [selectedAdmin, setSelectedAdminDetails] = useState(null);
    const [isUpdateAdmin, setIsUpdateAdmin] = useState(false);
    const [isUpdateAdminOpen, setisUpdateAdminOpen] = useState(false);
    useEffect(() => {
        getAllAdminsList();
    }, []);

    const getAllAdminsList = async () => {
        const apiRes = await getAllAdminsListAPI();
        console.log("apiRes", apiRes);
        setAdminsList(apiRes);
    }

    const deleteAdmin = async (value) => {
        let obj = {
            _id: value._id,
            firstName: value.firstName,
            lastName: value.lastName,
            phoneNumber: value.phoneNumber,
            email: value.email
        }
        console.log("obj", obj);
        const apiRes = await deleteAdminUserAPI(obj);
        console.log("apiRes", apiRes);
        if (apiRes) {
            getAllAdminsList();
        }
    }

    const deActivateAdmin = async (event, index, id) => {
        console.log(event.target.checked, index, id);
        let obj = {
            id: id,
            value: event.target.checked
        };
        console.log("obj", obj);
        const apiRes = await inActivateAdminAPI(obj);
        console.log("apiRes", apiRes);
        if (apiRes) {
            getAllAdminsList();
        }
    }

    const closeAllModals = () => {
        setIsAddNewAdmin(false);
        setIsAddNewAdminOpen(false);
        setSelectedAdminDetails(null);
        setIsUpdateAdmin(false);
        setisUpdateAdminOpen(false);
        getAllAdminsList();
    }

    const addNewAdmin = () => {
        setIsAddNewAdmin(true);
        setIsAddNewAdminOpen(true);
    }

    const editAdminDetails = (admin) => {
        setSelectedAdminDetails(admin);
        setIsUpdateAdmin(true);
        setisUpdateAdminOpen(true);
    }
    return (
        <div className="row">
            <div className="panellist-main-container">
                <div className="row">
                    <div className='col-6'>
                        <label className="heading screen-heading">ADMINS LIST</label>
                    </div>

                    <div className='col-6 d-flex justify-content-end'>
                        <button className="add-panel-btn" onClick={addNewAdmin} >ADD NEW ADMIN</button>
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
                                            <TableCell className='custom-drugs-tbl-header'>Name</TableCell>
                                            <TableCell className='custom-drugs-tbl-header'>Role</TableCell>
                                            <TableCell className='custom-drugs-tbl-header'>Mobile</TableCell>
                                            <TableCell className='custom-drugs-tbl-header'>Email ID</TableCell>
                                            <TableCell className='custom-drugs-tbl-header'>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className='custom-drugs-tbl-body'>
                                        {adminsList.map((admin, index) => (
                                            <TableRow key={index} className='custom-drugs-tbl-body-td'>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{admin.firstName} {admin.lastName}</TableCell>
                                                <TableCell>
                                                    {admin.role}
                                                </TableCell>
                                                <TableCell>{admin.phoneNumber}</TableCell>
                                                <TableCell>{admin.email}</TableCell>
                                                <TableCell>
                                                    <img onClick={() => editAdminDetails(admin)} className='edit-panel-img' src='../images/Admin-icons/edit-panel.svg' alt='edit-panel' />
                                                    <img onClick={() => deleteAdmin(admin)} className='edit-panel-img' src='../images/Admin-icons/delete-panel.svg' alt='delete-panel' />

                                                    <Switch
                                                        checked={admin.isActive} // Assuming `enabled` is a boolean field in your data
                                                        onChange={(event) => deActivateAdmin(event, index, admin._id)} // Adjust your handleToggle function accordingly
                                                        name={`toggle-${index}`}
                                                        color="primary"
                                                    />

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
                isAddNewAdmin ? (<AddNewAdmin isOpen={isAddNewAdminOpen} onClose={closeAllModals} />) : ''
            }
            {
                isUpdateAdmin ? (<UpdateAdmin isOpen={isUpdateAdminOpen} onClose={closeAllModals} adminDetails={selectedAdmin} />) : ''
            }
        </div>


    )
}

export default AdminsList;