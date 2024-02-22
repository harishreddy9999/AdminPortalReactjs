import React, { useState, useEffect } from 'react';
import '../../App.css';
import '../../Styles/AdminCustomDrugs.css';
import { getAllCustomDrugsAPI } from '../../services/adminPortalPanelsService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';
import UpdateCustomDrugInfo from './Admin-UpdateCustomDrugInfo';


const CustomDrugs = () => {

    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalDrugsCount, settotalDrugsCount] = useState(0);
    const [customDrugsDetails, setCustomDrugsDetails] = useState([]);
    const [rowsPerPageOptions, setrowsPerPageOptions] = useState([5, 10, 15, 20, 25, 50]);
    const [selectedCustomDrugInfo, setSelectedCustomDrugInfo] = useState(null);
    const [isUpdateDrugInfo, setisUpdateDrugInfo] = useState(false);
    const [isUpdateDrugInfoOpen, setisUpdateDrugInfoOpen] = useState(false);

    useEffect(() => {
        getAllCustomDrugs();
    }, [page, rowsPerPage, searchText]);

    const getAllCustomDrugs = async () => {

        const getAllCustomDrugsRes = await getAllCustomDrugsAPI(page, rowsPerPage, searchText);
        console.log("getAllCustomDrugsRes", getAllCustomDrugsRes);
        getAllCustomDrugsRes.customDrugs.forEach(element => {
            element.composition = element.composition.slice(0, -1);
        })
        setCustomDrugsDetails(getAllCustomDrugsRes.customDrugs)
        settotalDrugsCount(getAllCustomDrugsRes.customDrugCount)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const updateDrugInfo = (drug) => {
        setSelectedCustomDrugInfo(drug);
        setisUpdateDrugInfo(true);
        setisUpdateDrugInfoOpen(true);
    }
    const closeAllModals = () => {
        setSelectedCustomDrugInfo(null);
        setisUpdateDrugInfo(false);
        setisUpdateDrugInfoOpen(false);
        getAllCustomDrugs();
    }


    return (
        <div className="row">

            <div className='custom-drugs-screen'>
                <div className='drug-search-row'>
                    <div className="searchdiv d-flex justify-content-center" id="searchdiv">
                        <div className="form-control d-flex justify-content-between searchInput_customdrug">
                            <input type="text" className="input_search_custom_drug" placeholder="Search by drug name/composition" />
                            <img className="searchicon" src="../images/search.svg" alt='search-panels' />
                        </div>
                    </div>
                </div>
                <Paper>
                    <TableContainer>
                        <Table className='custom-drugs-tbl'>
                            <TableHead className='custom-drugs-tbl-header-row'>
                                <TableRow className=''>
                                    <TableCell className='custom-drugs-tbl-header'>#</TableCell>
                                    <TableCell className='custom-drugs-tbl-header'>Drug Name</TableCell>
                                    <TableCell className='custom-drugs-tbl-header'>Composition</TableCell>
                                    <TableCell className='custom-drugs-tbl-header'>Manufacture</TableCell>
                                    <TableCell className='custom-drugs-tbl-header'>MRP</TableCell>
                                    <TableCell className='custom-drugs-tbl-header'>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className='custom-drugs-tbl-body'>
                                {customDrugsDetails.map((row, index) => (
                                    <TableRow key={index} className='custom-drugs-tbl-body-td'>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{row.productName}</TableCell>
                                        <TableCell>{row.composition}</TableCell>
                                        <TableCell>{row.manufacturer}</TableCell>
                                        <TableCell>{row.MRP}</TableCell>
                                        <TableCell><button className='update-composition-btn' onClick={() => updateDrugInfo(row)} >Update Drug Info</button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={rowsPerPageOptions}
                        component="div"
                        count={totalDrugsCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            {
                isUpdateDrugInfo ? (<UpdateCustomDrugInfo isOpen={isUpdateDrugInfoOpen} onClose={closeAllModals} drugInfo={selectedCustomDrugInfo} />) : ''
            }
        </div>
    )
}

export default CustomDrugs;