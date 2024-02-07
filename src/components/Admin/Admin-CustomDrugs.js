import React, { useState, useEffect } from 'react';
import '../../App.css';
import '../../Styles/AdminCustomDrugs.css';
import { getAllCustomDrugsAPI } from '../../services/adminPortalPanelsService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';

const CustomDrugs = () => {

    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalDrugsCount, settotalDrugsCount] = useState(0);
    const [customDrugsDetails, setCustomDrugsDetails] = useState([]);
    const [rowsPerPageOptions, setrowsPerPageOptions] = useState([5, 10, 15, 20, 25, 50])
    useEffect(() => {
        getAllCustomDrugs();
    }, [page, rowsPerPage, searchText]);

    const getAllCustomDrugs = async () => {

        const getAllCustomDrugsRes = await getAllCustomDrugsAPI(page, rowsPerPage, searchText);
        console.log("getAllCustomDrugsRes", getAllCustomDrugsRes);
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

    return (
        <div className="row">
            Custom Drugs
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow className='table-header user-heading'>
                                <TableCell>Drug Name</TableCell>
                                <TableCell>Composition</TableCell>
                                <TableCell>Manufacture</TableCell>
                                <TableCell>MRP</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customDrugsDetails.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.productName}</TableCell>
                                    <TableCell>{row.composition}</TableCell>
                                    <TableCell>{row.manufacturer}</TableCell>
                                    <TableCell>{row.MRP}</TableCell>
                                    <TableCell><button className='update-composition-btn'>Update Drug Info</button></TableCell>
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
    )
}

export default CustomDrugs;