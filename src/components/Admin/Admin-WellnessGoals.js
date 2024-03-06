import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../../Styles/Admin-wellness-goals.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import Switch from '@material-ui/core/Switch';
import { getGoalsAPI, updateGoalsActiveStatusAPI, updateTrackerActiveStatusAPI, getTrackersAPI } from '../../services/adminportalService';
import moment from 'moment';
import AddNewTracker from './Admin-AddTracker';
import AddNewGoal from './Admin-AddGoals';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
const WellnessGoals = () => {



    const [selectedTab, setSelectedTab] = useState('Goals');
    const [searchtext, setsearchtext] = useState('');
    const [page, setPage] = useState(0);
    const [size, setRowsPerPage] = useState(5);
    const [goalsTotalcount, setgoalsTotalcount] = useState(0);
    const [goalslist, setgoalslist] = useState([]);
    const [rowsPerPageOptions, setrowsPerPageOptions] = useState([5, 10, 15, 20, 25, 50]);
    const [trackersearchtext, setTrackersearchtext] = useState('');
    const [trackerPageNo, setTrackerPageNo] = useState(0);
    const [trackerPageSize, setTrackerPageSize] = useState(5);
    const [trackersTotalcount, setTrackersTotalcount] = useState(0);
    const [trackerslist, setTrackerslist] = useState([]);
    const [isAddNewTracker, setisAddNewTracker] = useState(false);
    const [isAddNewTrackerOpen, setisAddNewTrackerOpen] = useState(false);
    const [isAddNewGoal, setisAddNewGoal] = useState(false);
    const [isAddNewGoalOpen, setisAddNewGoalOpen] = useState(false);
    const [value, setValue] = useState(0);
    useEffect(() => {
        getGoals();
    }, [searchtext, page, size])
    useEffect(() => {
        getTrackers();
    }, [trackersearchtext, trackerPageNo, trackerPageSize])
    const showTab = (value) => {
        console.log(value);
        setSelectedTab(value)

    }
    const handleTabClick = (newValue) => {
        setSelectedTab(newValue);
    };

    const getGoals = async () => {
        const goalsListRes = await getGoalsAPI(searchtext, page, size);
        console.log("goalsListRes", goalsListRes);
        setgoalslist(goalsListRes.result);
        setgoalsTotalcount(goalsListRes.totalCount)
    }
    const getTrackers = async () => {
        const tracketListRes = await getTrackersAPI(trackersearchtext, trackerPageNo, trackerPageSize);
        console.log("tracketListRes", tracketListRes);
        setTrackerslist(tracketListRes.result);
        setTrackersTotalcount(tracketListRes.totalCount)
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleTrackerChangePage = (event, newPage) => {
        setTrackerPageNo(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleTrackerChangeRowsPerPage = (event) => {
        setTrackerPageSize(parseInt(event.target.value, 10));
        setTrackerPageNo(0);
    };
    const updateGoalsStatus = async (event, index, goal) => {
        console.log(index, goal);
        console.log(event);
        console.log(event.target.checked);
        let obj = {
            goalID: goal._id,
            status: event.target.checked,
        };
        const updateGoalsActiveStatusRes = await updateGoalsActiveStatusAPI(obj);
        console.log("updateGoalsActiveStatusRes", updateGoalsActiveStatusRes);
        if (updateGoalsActiveStatusRes.message) {
            getGoals();
        }
    }
    const updateTrackerStatus = async (event, index, goal) => {
        console.log(index, goal);
        console.log(event);
        console.log(event.target.checked);
        let obj = {
            trackerID: goal._id,
            status: event.target.checked,
        };
        const updateTrackerActiveStatusRes = await updateTrackerActiveStatusAPI(obj);
        console.log("updateTrackerActiveStatusRes", updateTrackerActiveStatusRes);
        if (updateTrackerActiveStatusRes.message) {
            getTrackers();
        }
    }
    const addTracker = () => {
        setisAddNewTracker(true);
        setisAddNewTrackerOpen(true);
    }
    const addGoal = () => {
        setisAddNewGoal(true);
        setisAddNewGoalOpen(true);
    }
    const closeAllModals = () => {
        setisAddNewTracker(false);
        setisAddNewTrackerOpen(false);
        setisAddNewGoal(false);
        setisAddNewGoalOpen(false);
    }
    return (
        <div className='wellness-main-screen'>
            <div className='row'>
                <div className='tabs-row'>
                    {/* <Tabs  value={value} onChange={handleChange} className="vTabs" >
                    <Tab className={value === 0 ? "vselected-tab" : "vtab"} label={<span className={value === 0  ? "vselected-text" : "vtabtext"}>Goals</span>} />
                    <Tab className={value === 1 ? "vselected-tab" : "vtab"} label={<span className={value === 1  ? "vselected-text" : "vtabtext"}>Trackers</span>} />

                </Tabs> */}
                    {/* <p className={`tab-heading ${selectedTab === 'PRO' ? 'active' : ''}`} onClick={() => showTab('PRO')}>Goals</p>
                    <p className={`tab-heading ${selectedTab === 'PACK' ? 'active' : ''}`} onClick={() => showTab('PACK')}>Trackers</p> */}
                    <div className="col-2 tabsContainers">
                        <div id="13399" className={selectedTab === "Goals" ? 'activetabs' : "tabSections"}
                            onClick={() => handleTabClick('Goals')} >
                            <span id="doc">Goals</span></div>
                        <div id="13400" className={selectedTab === "Trackers" ? 'activetabs' : "tabSections"}
                            onClick={() => handleTabClick('Trackers')}>
                            <span id="pat">Trackers</span></div>

                    </div>
                </div>
            </div>
            <div className='tabs-content'>
                {selectedTab === "Goals" ? (
                    <div className='programs-row'>
                        <div className='row programs-heading-row'>
                            <div className='col-3'>
                                <p className='wellness-screen-heading'>Goals</p>
                            </div>
                            <div className='col-6'></div>
                            <div className='col-3 d-flex justify-content-end'>
                                <button className='wellness-add-btn' onClick={addGoal}>Add Goals</button>
                            </div>
                        </div>
                        <div className='row programs-table-row'>
                            <Paper>
                                <TableContainer>
                                    <Table className='wellness-tbl'>
                                        <TableHead className='custom-drugs-tbl-header-row'>
                                            <TableRow className=''>
                                                <TableCell className='custom-drugs-tbl-header'>#</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Goal Name</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Trackers</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Created On</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className='custom-drugs-tbl-body'>
                                            {goalslist.map((row, index) => (
                                                <TableRow key={index} className='custom-drugs-tbl-body-td'>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{row.goalName}</TableCell>
                                                    <TableCell>
                                                        {row.trackers ? (
                                                            <ul>
                                                                {row.trackers.map((spec, specIndex) => (
                                                                    <li key={specIndex}>{spec.trackerName}</li>
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
                                                            onChange={(event) => updateGoalsStatus(event, index, row)} // Adjust your handleToggle function accordingly
                                                            name={`toggle-${index}`}
                                                            color="primary"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>

                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={rowsPerPageOptions}
                                    component="div"
                                    count={goalsTotalcount}
                                    rowsPerPage={size}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </div>
                    </div>
                ) : (
                    <div className='programs-row'>
                        <div className='row programs-heading-row'>
                            <div className='col-3'>
                                <p className='wellness-screen-heading'>Trackers</p>
                            </div>
                            <div className='col-6'></div>
                            <div className='col-3 d-flex justify-content-end'>
                                <button className='wellness-add-btn' onClick={addTracker}>Add Tracker</button>
                            </div>
                        </div>
                        <div className='row programs-table-row'>
                            <Paper>
                                <TableContainer>
                                    <Table className='wellness-tbl'>
                                        <TableHead className='custom-drugs-tbl-header-row'>
                                            <TableRow className=''>
                                                <TableCell className='custom-drugs-tbl-header'>#</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Tracker Name</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Created On</TableCell>
                                                <TableCell className='custom-drugs-tbl-header'>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className='custom-drugs-tbl-body'>
                                            {trackerslist.map((row, index) => (
                                                <TableRow key={index} className='custom-drugs-tbl-body-td'>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{row.trackerName}</TableCell>
                                                    <TableCell>{moment(new Date(row.createdOn)).format("DD-MM-YYYY")}</TableCell>
                                                    <TableCell>
                                                        <Switch
                                                            checked={row.status} // Assuming `enabled` is a boolean field in your data
                                                            onChange={(event) => updateTrackerStatus(event, index, row)} // Adjust your handleToggle function accordingly
                                                            name={`toggle-${index}`}
                                                            color="primary"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>

                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={rowsPerPageOptions}
                                    component="div"
                                    count={trackersTotalcount}
                                    rowsPerPage={trackerPageSize}
                                    page={trackerPageNo}
                                    onPageChange={handleTrackerChangePage}
                                    onRowsPerPageChange={handleTrackerChangeRowsPerPage}
                                />
                            </Paper>
                        </div>
                    </div>
                )}
            </div>
            {
                isAddNewTracker ? (<AddNewTracker isOpen={isAddNewTrackerOpen} onClose={closeAllModals} />) : ''
            }
            {
                isAddNewGoal ? (<AddNewGoal isOpen={isAddNewGoalOpen} onClose={closeAllModals} />) : ''
            }
        </div>
    )
}

export default WellnessGoals;