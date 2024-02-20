import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../../Styles/Admin-wellness.css';
import { getWellnessProgrammesAPI, getWellnessPackagesAPI } from '../../services/adminportalService';
import moment from 'moment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';

const Wellness = () => {

    const [selectedTab, setSelectedTab] = useState('PRO');
    const [programmesList, setProgrammesList] = useState([]);
    const [packagesList, setPackagesList] = useState([]);
    useEffect(() => {
        getWellnessProgrammes();
        getWellnessPackages();
    }, [])

    const getWellnessProgrammes = async () => {
        const response = await getWellnessProgrammesAPI();
        console.log("response", response);
        setProgrammesList(response);
    }

    const getWellnessPackages = async () => {
        const response = await getWellnessPackagesAPI();
        console.log("response", response);
        setPackagesList(response);
    }
    const showTab = (value) => {
        console.log(value);
        setSelectedTab(value)

    }
    return (
        <div className='wellness-main-screen'>
            <div className='row'>
                <div className='tabs-row'>
                    <p className={`tab-heading ${selectedTab === 'PRO' ? 'active' : ''}`} onClick={() => showTab('PRO')}>Programmes</p>
                    <p className={`tab-heading ${selectedTab === 'PACK' ? 'active' : ''}`} onClick={() => showTab('PACK')}>Packages</p>
                </div>
            </div>
            <div className='tabs-content'>
                {selectedTab === 'PRO' ? (
                    <div className='programs-row'>
                        <div className='row programs-heading-row'>
                            <div className='col-6'>
                                <p className='wellness-screen-heading'>Wellness Programmes</p>
                            </div>
                            <div className='col-6 d-flex justify-content-end'>
                                <button className='wellness-add-btn'>Add</button>
                            </div>
                        </div>
                        <div className='row programs-table-row'>
                            <Paper>
                                <TableContainer>
                                    <Table className='wellness-tbl'>
                                        <TableHead className='custom-drugs-tbl-header-row'>
                                            <TableRow className=''>
                                                <TableCell className='custom-drugs-tbl-header'>#</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Name</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Programme ID</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Specialization</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Created On</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className='custom-drugs-tbl-body'>
                                            {programmesList.map((row, index) => (
                                                <TableRow key={index} className='custom-drugs-tbl-body-td'>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{row.programName}</TableCell>
                                                    <TableCell>{row._id}</TableCell>
                                                    <TableCell>
                                                        {row.specialization ? (
                                                            <ul>
                                                                {row.specialization.map((spec, specIndex) => (
                                                                    <li key={specIndex}>{spec}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{moment(new Date(row.createdOn)).format("DD-MM-YYYY")}</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>

                                    </Table>
                                </TableContainer>

                            </Paper>
                        </div>
                    </div>
                ) : (
                    <div className='programs-row'>
                        <div className='row programs-heading-row'>
                            <div className='col-6'>
                                <p className='wellness-screen-heading'>Wellness Packages</p>
                            </div>
                            <div className='col-6 d-flex justify-content-end'>
                                <button className='wellness-add-btn'>Add</button>
                            </div>
                        </div>
                        <div className='row programs-table-row'>
                            <Paper>
                                <TableContainer>
                                    <Table className='wellness-tbl'>
                                        <TableHead className='custom-drugs-tbl-header-row'>
                                            <TableRow className=''>
                                                <TableCell className='custom-drugs-tbl-header'>#</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Name</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Package ID</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Duration</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Actual Price</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Final Price</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className='custom-drugs-tbl-body'>
                                            {packagesList.map((row, index) => (
                                                <TableRow key={index} className='custom-drugs-tbl-body-td'>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{row.packageName}</TableCell>
                                                    <TableCell>{row._id}</TableCell>
                                                    <TableCell>
                                                        {row.duration}
                                                    </TableCell>
                                                    <TableCell>{row.actualPrice}</TableCell>
                                                    <TableCell>{row.finalPrice}</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>

                                    </Table>
                                </TableContainer>

                            </Paper>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}

export default Wellness;