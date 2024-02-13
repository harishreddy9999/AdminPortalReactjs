import React, { useState, useEffect } from 'react';
import '../../App.css';
import { searchMyPatientsAPI, calculateAge } from '../../services/userPatientsSrv';
import moment from 'moment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PatientsList = () => {

    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [searchText, setSearchText] = useState('');
    const [patientsList, setPatientsList] = useState([]);
    const [totalPatientsCount, setTotalPatientsCount] = useState(0);
    const [rowsPerPageOptions, setrowsPerPageOptions] = useState([5, 10, 20, 25, 50]);
    useEffect(() => {
        searchMyPatients();
    }, [page, rowsPerPage, searchText]);

    const searchMyPatients = async () => {
        const res = await searchMyPatientsAPI(searchText, page, rowsPerPage);
        console.log(res);
        // debugger;
        res.patientList.forEach((element, index) => {
            // console.log(index, element.appointmentDetails[0].date)
            element.age = calculateAge(element.patientDetails.demographicInfo.dOB);
            if (element.appointmentDetails.length > 0) {
                element.appointmentDate = moment(new Date(element.appointmentDetails[0].date)).format("DD-MM-YYYY");
            } else {
                element.appointmentDate = "";
            }

        });
        setPatientsList(res.patientList);
        setTotalPatientsCount(res.totalCount);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        setSearchText('');
    };

    const getPatientDetails = (patient) => {
        console.log("patient", patient)
        navigate('/user-dashboard/patientDetails/' + patient.patientDetails._id + '/:' + patient.patientDetails.fullName);
    }

    return (
        <div className='container'>
            <div className='row'>
                <p>Patients List</p>
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow className='table-header user-heading'>
                                    <div className='row'>
                                        <div class="col-lg-3 col-md-3 col-sm-3 table-header-text" id="table-patients">
                                            <TableCell>PATIENTS</TableCell>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-2 justify-content-center table-header-text row" id="table-date">
                                            <TableCell>LAST APPOINTMENT</TableCell>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-2 table-header-text row" id="table-gender">
                                            <TableCell>GENDER</TableCell>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-2 table-header-text p-0" id="table-age">
                                            <TableCell>AGE</TableCell>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-3 table-header-text p-0" id="table-chiefcomplaint">
                                            <TableCell>MOBILE NUMBER</TableCell>
                                        </div>
                                    </div>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patientsList.map((patient, index) => (
                                    <TableRow key={index} >
                                        <div className='d-flex w-100' onClick={() => getPatientDetails(patient)}>
                                            <div class="col-lg-3 col-md-3 col-sm-3 table-header-text" id="table-patients">
                                                <TableCell>{patient.patientDetails.demographicInfo.firstName + ' ' +
                                                    patient.patientDetails.demographicInfo.lastName}</TableCell>
                                            </div>
                                            <div class="col-lg-2 col-md-2 col-sm-2 justify-content-center table-header-text row" id="table-date">
                                                <TableCell>{patient.appointmentDate}</TableCell>
                                            </div>
                                            <div class="col-lg-2 col-md-2 col-sm-2 table-header-text row" id="table-gender">
                                                <TableCell>{patient.patientDetails.demographicInfo.gender}</TableCell>
                                            </div>
                                            <div class="col-lg-2 col-md-2 col-sm-2 table-header-text p-0" id="table-age">
                                                <TableCell>{patient.age}</TableCell>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-sm-3 table-header-text p-0" id="table-chiefcomplaint">
                                                <TableCell>{patient.patientDetails.phoneNumber ? patient.patientDetails.phoneNumber : '-'}</TableCell>
                                            </div>

                                        </div>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={rowsPerPageOptions}
                        component="div"
                        count={totalPatientsCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    )
}

export default PatientsList;