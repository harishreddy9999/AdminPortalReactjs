import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../../Styles/Admin-wellness.css';
import { getWellnessProgrammesAPI, getWellnessPackagesAPI, updateProgramActiveStatusAPI, updatePackageActiveStatusAPI } from '../../services/adminportalService';
import moment from 'moment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Switch from '@material-ui/core/Switch';
import PackageDetails from './Admin-PackageDetails';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CreateWellnessPackage from './Admin-AddWellnessPackage';

const Wellness = () => {

    const [selectedTab, setSelectedTab] = useState('PRO');
    const [programmesList, setProgrammesList] = useState([]);
    const [packagesList, setPackagesList] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isPackagerDetailsOpen, setIsDPackageDetailsOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [isAddNewPackage, setisAddNewPackage] = useState(false);
    const [isAddWellnessPackageOpen, setisAddWellnessPackageOpen] = useState(false);

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
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleToggle = async (event, index, program) => {
        console.log(event.target, index);
        let reqObj = {
            programID: program._id,
            status: event.target.checked
        };
        console.log("reqObj", reqObj);
        const updateProgramActiveStatusRes = await updateProgramActiveStatusAPI(reqObj);
        console.log("updateProgramActiveStatusRes", updateProgramActiveStatusRes)
        if (updateProgramActiveStatusRes) {
            getWellnessProgrammes();
        }
    }

    const isActivechange = async (event, index, program) => {
        console.log(event.target, index);
        let reqObj = {
            programID: program._id,
            status: event.target.checked
        };
        console.log("reqObj", reqObj);
        const updatePackageActiveStatusRes = await updatePackageActiveStatusAPI(reqObj);
        console.log("updatePackageActiveStatusRes", updatePackageActiveStatusRes)
        if (updatePackageActiveStatusRes) {
            getWellnessPackages();
        }
    }
    const viewPackage = (value) => {
        console.log(value);
        setSelectedPackage(value);
        setIsDPackageDetailsOpen(true);
    }

    const closeAllModals = () => {
        setSelectedPackage(null);
        setIsDPackageDetailsOpen(false);
        setisAddNewPackage(false);
        setisAddWellnessPackageOpen(false);
    }

    const addNewPackage = () => {
        setisAddNewPackage(true);
        setisAddWellnessPackageOpen(true);
    }
    return (
        <div className='wellness-main-screen'>
            <div className='row'>
                <div className='tabs-row'>
                <Tabs  value={value} onChange={handleChange} className="vTabs" >
                    <Tab className={value === 0 ? "vselected-tab" : "vtab"} label={<span className={value === 0  ? "vselected-text" : "vtabtext"}>Programmes</span>} />
                    <Tab className={value === 1 ? "vselected-tab" : "vtab"} label={<span className={value === 1  ? "vselected-text" : "vtabtext"}>Packages</span>} />

                </Tabs>
                    {/* <p className={`tab-heading ${selectedTab === 'PRO' ? 'active' : ''}`} onClick={() => showTab('PRO')}>Programmes</p>
                    <p className={`tab-heading ${selectedTab === 'PACK' ? 'active' : ''}`} onClick={() => showTab('PACK')}>Packages</p> */}
                </div>
            </div>
            <div className='tabs-content'>
                {value === 0 ? (
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
                                                    <TableCell>
                                                        <Switch
                                                            checked={row.status} // Assuming `enabled` is a boolean field in your data
                                                            onChange={(event) => handleToggle(event, index, row)} // Adjust your handleToggle function accordingly
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
                ) : (
                    <div className='programs-row'>
                        <div className='row programs-heading-row'>
                            <div className='col-6'>
                                <p className='wellness-screen-heading'>Wellness Packages</p>
                            </div>
                            <div className='col-6 d-flex justify-content-end'>
                                <button className='wellness-add-btn' onClick={addNewPackage} >Add</button>
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
                                                    <TableCell>
                                                        <Switch
                                                            checked={row.status} // Assuming `enabled` is a boolean field in your data
                                                            onChange={(event) => isActivechange(event, index, row)} // Adjust your handleToggle function accordingly
                                                            name={`toggle-${index}`}
                                                            color="primary"
                                                        />
                                                        <button className='view-package-btn' onClick={() => viewPackage(row)}>View</button>
                                                    </TableCell>
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
            {
                selectedPackage ? (<PackageDetails isOpen={isPackagerDetailsOpen} onClose={closeAllModals} packageDet={selectedPackage} />) : ''
            }
            {
                isAddNewPackage ? (<CreateWellnessPackage isOpen={isAddWellnessPackageOpen} onClose={closeAllModals} />) : ''
            }
        </div>

    )
}

export default Wellness;