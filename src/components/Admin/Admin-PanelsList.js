import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../../Styles/Admin-PanelsList.css';
import { getDefaultPanelsAPI, deleteAdminPanelAPI } from '../../services/adminPortalPanelsService'
// import moment from 'moment';
// import CustomPagination from '../CustomComponents/CustomPagination';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';



const PanlesList = ({ handleComponentSelect }) => {

    const [searchText, setSearchText] = useState('');
    const [pageNo, setpageNo] = useState(0);
    const [pageSize, setpageSize] = useState(5);
    const [panelsList, setPanelsList] = useState([]);
    const [totalPanelsCount, setTotalPanelsCount] = useState(0);
    const [rowsPerPageOptions, setrowsPerPageOptions] = useState([2, 5, 10, 20, 50])
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem("editPanelDetails");
        getDefaultPanels();
    }, [pageNo, pageSize]);

    const getDefaultPanels = async () => {
        console.log("pageNo", pageNo)
        const getDefaultPanelsRes = await getDefaultPanelsAPI(searchText, pageNo, pageSize);
        // console.log("getDefaultPanelsRes", getDefaultPanelsRes)
        if (getDefaultPanelsRes) {
            setPanelsList(getDefaultPanelsRes.panels);
            setTotalPanelsCount(getDefaultPanelsRes.count)
        }
    }

    const handlePageChange = (event, newPage) => {
        // debugger;
        console.log("newPage", event, newPage);
        // debugger;
        setpageNo(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setpageSize(parseInt(event.target.value, 10));
        setpageNo(0);
    };

    const search = () => {

    }

    const addPanel = () => {
        navigate('/admin-dashboard/AddNewPanel')
        handleComponentSelect('AddNewPanel');
    }

    const deletePanel = async (panelID, index) => {
        let reqObj = {
            panelID: panelID
        }
        console.log("reqObj", reqObj)
        // return;
        const deleteAdminPanelRes = await deleteAdminPanelAPI(reqObj);
        console.log("deleteAdminPanelRes", deleteAdminPanelRes);
        if (deleteAdminPanelRes) {
            setpageSize(parseInt(5));
            setpageNo(0);
        }
    }

    const editPanel = (panel) => {
        sessionStorage.setItem("editPanelDetails", JSON.stringify(panel))
        navigate('/admin-dashboard/AddNewPanel');
        // debugger;
        handleComponentSelect('AddNewPanel');
        // const panelDetails = JSON.stringify(panel);
        // navigate('/admin-dashboard/AddNewPanel/:' + panelID)
        // setTimeout(() => {
        //     navigate('/admin-dashboard/AddNewPanel')
        //     // handleComponentSelect('AddNewPanel');
        // }, 1000)

    }
    return (
        <div className="row">
            <div className="panellist-main-container">
                <div className="row">
                    <div className='col-3'>
                        <label className="heading screen-heading">Panels/Packages</label>
                    </div>
                    <div className='col-6'>
                        <div className="searchdiv d-flex justify-content-center" id="searchdiv">
                            <div className="form-control d-flex justify-content-between searchInput">
                                <input type="text" className="input_search_tag" placeholder="Search Profiles" />
                                <img className="searchicon" onClick={search} src="../images/search.svg" alt='search-panels' />
                            </div>
                        </div>
                    </div>
                    <div className='col-3 d-flex justify-content-end'>
                        <button className="add-panel-btn" onClick={addPanel} >+ Add Profile</button>
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
                                            <TableCell className='custom-drugs-tbl-header'>Profile Name</TableCell>
                                            <TableCell className='custom-drugs-tbl-header'>Test Name</TableCell>
                                            <TableCell className='custom-drugs-tbl-header'>Profile Code</TableCell>
                                            <TableCell className='custom-drugs-tbl-header'>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className='custom-drugs-tbl-body'>
                                        {panelsList.map((panel, index) => (
                                            <TableRow key={index} className='custom-drugs-tbl-body-td'>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{panel.panelName}</TableCell>
                                                <TableCell>
                                                    {panel.tests.map((test, testIndex) => (
                                                        <p className='test-name' key={testIndex}>{test.testName} - {test.testShortCode}</p>
                                                    ))}
                                                </TableCell>
                                                <TableCell>{panel.panelShortCode}</TableCell>
                                                <TableCell>
                                                    <img className='edit-panel-img' src='../images/Admin-icons/edit-panel.svg' alt='edit-panel' onClick={() => editPanel(panel)} />
                                                    <img onClick={() => deletePanel(panel.panelID, index)} className='edit-panel-img' src='../images/Admin-icons/delete-panel.svg' alt='delete-panel' />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={rowsPerPageOptions}
                                component="div"
                                count={totalPanelsCount}
                                rowsPerPage={pageSize}
                                page={pageNo}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PanlesList;