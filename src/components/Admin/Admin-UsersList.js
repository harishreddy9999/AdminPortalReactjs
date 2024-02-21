import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../../Styles/Admin-users.css';
import { getAllDoctorsInAdminAPI, getAllPatientsInAdminAPI, getAllPharmaInAdminAPI, getAllLabInAdminAPI, getAllClinicsInAdminAPI } from '../../services/adminportalService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';


const AdminUsersList = () => {

    const [selectedTab, setSelectedTab] = useState('Doctors');
    const [searchText, setSearchText] = useState('');
    const [pageNo, setpageNo] = useState(0);
    const [pageSize, setpageSize] = useState(10);
    const [totalListCount, setTotalListCount] = useState(0);
    const [rowsPerPageOptions, setrowsPerPageOptions] = useState([10, 25, 50, 100, 200]);
    const [doctorsList, setdoctorsList] = useState([]);
    const [patientsList, setPatientsList] = useState([]);
    const [pharmaciesList, setPharmaciesList] = useState([]);
    const [labsList, setLabsList] = useState([]);
    const [clinicsList, setClinicsList] = useState([]);


    const showTab = (value) => {
        setSearchText('');
        setpageNo(0);
        setpageSize(10);
        setTotalListCount(0);

        console.log(value);
        setSelectedTab(value);



    }

    useEffect(() => {
        getList();
    }, [selectedTab, searchText, pageNo, pageSize])
    const getList = () => {
        if (selectedTab === "Doctors") {
            getDoctorsList();
        } else if (selectedTab === "Patients") {
            getPatientsList();
        } else if (selectedTab === "Pharmacies") {
            getPharmaciesList();
        } else if (selectedTab === "Labs") {
            getLabsList();
        } else if (selectedTab === "Clinics") {
            getClinicsList();
        }
    }
    const getDoctorsList = async () => {
        const getAllDoctorsInAdminRes = await getAllDoctorsInAdminAPI(searchText, pageSize, pageNo);
        console.log("getAllDoctorsInAdminRes", getAllDoctorsInAdminRes);
        setdoctorsList(getAllDoctorsInAdminRes.doctors);
        setTotalListCount(getAllDoctorsInAdminRes.doctorsCount);
    }
    const getPatientsList = async () => {
        const getAllPatientsInAdminRes = await getAllPatientsInAdminAPI(searchText, pageSize, pageNo);
        console.log("getAllPatientsInAdminRes", getAllPatientsInAdminRes);
        setPatientsList(getAllPatientsInAdminRes.patientList);
        setTotalListCount(getAllPatientsInAdminRes.patientCount);
    }
    const getPharmaciesList = async () => {
        const getAllPharmaInAdminRes = await getAllPharmaInAdminAPI(searchText, pageSize, pageNo);
        console.log("getAllPharmaInAdminRes", getAllPharmaInAdminRes);
        setPharmaciesList(getAllPharmaInAdminRes.pharmacies);
        setTotalListCount(getAllPharmaInAdminRes.pharmaciesCount);
    }
    const getLabsList = async () => {
        const getAllLabInAdminRes = await getAllLabInAdminAPI(searchText, pageSize, pageNo);
        console.log("getAllLabInAdminRes", getAllLabInAdminRes);
        setLabsList(getAllLabInAdminRes.labs);
        setTotalListCount(getAllLabInAdminRes.labsCount);
    }
    const getClinicsList = async () => {
        const getAllClinicsInAdminRes = await getAllClinicsInAdminAPI(searchText, pageSize, pageNo);
        console.log("getAllClinicsInAdminRes", getAllClinicsInAdminRes);
        setClinicsList(getAllClinicsInAdminRes.clinicData);
        setTotalListCount(getAllClinicsInAdminRes.totalClinicCount);
    }
    const search = () => {

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

    const handleSearchChange = (e) => {

        console.log(e.target.value);
        setSearchText(e.target.value)
    }
    return (
        <div className='wellness-main-screen'>
            <div className='row'>
                <div className='tabs-row'>
                    <p className={`tab-heading ${selectedTab === 'Doctors' ? 'active' : ''}`} onClick={() => showTab('Doctors')}>Doctors</p>
                    <p className={`tab-heading ${selectedTab === 'Patients' ? 'active' : ''}`} onClick={() => showTab('Patients')}>Patients</p>
                    <p className={`tab-heading ${selectedTab === 'Pharmacies' ? 'active' : ''}`} onClick={() => showTab('Pharmacies')}>Pharmacies</p>
                    <p className={`tab-heading ${selectedTab === 'Labs' ? 'active' : ''}`} onClick={() => showTab('Labs')}>Labs</p>
                    <p className={`tab-heading ${selectedTab === 'Clinics' ? 'active' : ''}`} onClick={() => showTab('Clinics')}>Clinics</p>
                </div>
                <div className='search-row'>
                    <div className="user-searchdiv d-flex justify-content-center mb-3" id="searchdiv">
                        <div className="form-control d-flex justify-content-between users-searchInput">
                            <input type="text" className="users-search" placeholder="Search"
                                name='searchText' value={searchText} onChange={handleSearchChange} />
                            <img className="searchicon" src="../images/search.svg" alt='search' />
                        </div>
                    </div>
                </div>
                <div className='list-row'>
                    {
                        selectedTab === 'Doctors' ? (
                            <div className='panel-list-table'>
                                <Paper>
                                    <TableContainer>
                                        <Table className='custom-drugs-tbl'>
                                            <TableHead className='custom-drugs-tbl-header-row'>
                                                <TableRow className=''>
                                                    <TableCell className='custom-drugs-tbl-header'>#</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>DOCTORS</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>MOBILE NUMBER</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>EMAIL</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>Gender</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>SPECIALIZATION</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>STATUS</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody className='custom-drugs-tbl-body'>
                                                {doctorsList.map((doctorrow, index) => (
                                                    <TableRow key={index} className='custom-drugs-tbl-body-td'>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{doctorrow.firstName + " " + doctorrow?.lastName}</TableCell>
                                                        <TableCell>{doctorrow.phoneNumber}</TableCell>
                                                        <TableCell>{doctorrow.email}</TableCell>
                                                        <TableCell>{doctorrow.gender === 'F' ? 'Female' : 'Male'}</TableCell>
                                                        <TableCell>{doctorrow.primarySpecialization[0]}</TableCell>
                                                        <TableCell>{doctorrow.isDoctorVerified == true ? 'VERIFIED' : 'PENDING'}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={rowsPerPageOptions}
                                        component="div"
                                        count={totalListCount}
                                        rowsPerPage={pageSize}
                                        page={pageNo}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Paper>
                            </div>
                        ) : ('')
                    }
                    {
                        selectedTab === 'Patients' ? (
                            <div className='panel-list-table'>
                                <Paper>
                                    <TableContainer>
                                        <Table className='custom-drugs-tbl'>
                                            <TableHead className='custom-drugs-tbl-header-row'>
                                                <TableRow className=''>
                                                    <TableCell className='custom-drugs-tbl-header'>#</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>PATIENTS</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>MOBILE NUMBER</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>EMAIL</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>GENDER</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>PATIENT NUMBER</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody className='custom-drugs-tbl-body'>
                                                {patientsList.map((patrow, index) => (
                                                    <TableRow key={index} className='custom-drugs-tbl-body-td'>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{patrow.demographicInfo.firstName + " " + patrow.demographicInfo.lastName}</TableCell>
                                                        <TableCell>{patrow.phoneNumber}</TableCell>
                                                        <TableCell>{patrow.email}</TableCell>
                                                        <TableCell>{patrow.demographicInfo.gender}</TableCell>
                                                        <TableCell>{patrow.patientNumber}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={rowsPerPageOptions}
                                        component="div"
                                        count={totalListCount}
                                        rowsPerPage={pageSize}
                                        page={pageNo}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Paper>
                            </div>
                        ) : ('')
                    }
                    {
                        selectedTab === 'Pharmacies' ? (
                            <div className='panel-list-table'>
                                <Paper>
                                    <TableContainer>
                                        <Table className='custom-drugs-tbl'>
                                            <TableHead className='custom-drugs-tbl-header-row'>
                                                <TableRow className=''>
                                                    <TableCell className='custom-drugs-tbl-header'>#</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>PHARMACIES</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>MOBILE NUMBER</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>EMAIL</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>TIMINGS</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>LICENSE NUMBER</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>STATUS</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody className='custom-drugs-tbl-body'>
                                                {pharmaciesList.map((pharmacyrow, index) => (
                                                    <TableRow key={index} className='custom-drugs-tbl-body-td'>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{pharmacyrow.pharmacyName}</TableCell>
                                                        <TableCell>{pharmacyrow.mobile}</TableCell>
                                                        <TableCell>{pharmacyrow.email}</TableCell>
                                                        <TableCell>{pharmacyrow.startTime} - {pharmacyrow.endTime}</TableCell>
                                                        <TableCell>{pharmacyrow.licenseNumber}</TableCell>
                                                        <TableCell>{pharmacyrow.accountStatus}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={rowsPerPageOptions}
                                        component="div"
                                        count={totalListCount}
                                        rowsPerPage={pageSize}
                                        page={pageNo}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Paper>
                            </div>
                        ) : ('')
                    }
                    {
                        selectedTab === 'Labs' ? (
                            <div className='panel-list-table'>
                                <Paper>
                                    <TableContainer>
                                        <Table className='custom-drugs-tbl'>
                                            <TableHead className='custom-drugs-tbl-header-row'>
                                                <TableRow className=''>
                                                    <TableCell className='custom-drugs-tbl-header'>#</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>LABS</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>MOBILE NUMBER</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>EMAIL</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>CONTACT PERSON</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>LAB ID</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>STATUS</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody className='custom-drugs-tbl-body'>
                                                {labsList.map((labrow, index) => (
                                                    <TableRow key={index} className='custom-drugs-tbl-body-td'>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{labrow.Lab_Name}</TableCell>
                                                        <TableCell>{labrow.mobile_number}</TableCell>
                                                        <TableCell>{labrow.email_id}</TableCell>
                                                        <TableCell>{labrow.contactPerson}</TableCell>
                                                        <TableCell>{labrow.licenseNumber}</TableCell>
                                                        <TableCell>{labrow.accountStatus == 'A' ? 'VERIFIED' : ''}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={rowsPerPageOptions}
                                        component="div"
                                        count={totalListCount}
                                        rowsPerPage={pageSize}
                                        page={pageNo}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Paper>
                            </div>
                        ) : ('')
                    }
                    {
                        selectedTab === 'Clinics' ? (
                            <div className='panel-list-table'>
                                <Paper>
                                    <TableContainer>
                                        <Table className='custom-drugs-tbl'>
                                            <TableHead className='custom-drugs-tbl-header-row'>
                                                <TableRow className=''>
                                                    <TableCell className='custom-drugs-tbl-header'>#</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>CLINICS</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>MOBILE NUMBER</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>EMAIL</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>INCHARGE</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>REGISTRATION NUMBER</TableCell>
                                                    <TableCell className='custom-drugs-tbl-header'>STATUS</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody className='custom-drugs-tbl-body'>
                                                {clinicsList.map((clinicrow, index) => (
                                                    <TableRow key={index} className='custom-drugs-tbl-body-td'>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{clinicrow.clinicName}</TableCell>
                                                        <TableCell>{clinicrow.phoneNumber}</TableCell>
                                                        <TableCell>{clinicrow.email}</TableCell>
                                                        <TableCell>{clinicrow.inChargeName}</TableCell>
                                                        <TableCell>{clinicrow.registrationNumber}</TableCell>
                                                        <TableCell>{clinicrow.accountStatus}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={rowsPerPageOptions}
                                        component="div"
                                        count={totalListCount}
                                        rowsPerPage={pageSize}
                                        page={pageNo}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Paper>
                            </div>
                        ) : ('')
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminUsersList;