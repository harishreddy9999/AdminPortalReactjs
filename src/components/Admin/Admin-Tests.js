import React, { useEffect, useState } from "react";
import { getDefaultIndependentTestAPI, getDefaultXrayTemplatesAPI, deleteRadiologyTestAPI } from '../../services/adminPortalPanelsService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';
import CreateRadiologyTest from "./Admin-CreateRadiologyTest";
import '../../Styles/test.css';
import { useNavigate } from 'react-router-dom';

const AdminTests = ({handleComponentSelect}) => {

    const [selectedTab, setSelectedTab] = useState('Independent');
    const [searchText, setSearchText] = useState('');
    const [pageNo, setpageNo] = useState(0);
    const [pageSize, setpageSize] = useState(20);
    const [totalTestsCount, setTotalTestsCount] = useState(0);
    const [rowsPerPageOptions, setrowsPerPageOptions] = useState([5, 10, 20, 25, 50, 100]);
    const [independentTestList, setIndependentTestList] = useState([]);
    const [radiologyTestList, setRadiologyTestList] = useState([]);
    const [isAddNewRadiologyTest, setIsAddNewRadiologyTest] = useState(false);
    const [isAddRadiologyTestOpen, setIsAddRadiologyTestOpen] = useState(false);
    const [selectedRadiologyTest, setSelectedRadiologyTest] = useState(null);
    const [isAddNewIndependentTest, setisAddNewIndependentTest] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedTab === "Independent") {
            getDefaultIndependentTest();
        } else if (selectedTab === "Radiology") {
            getDefaultXrayTemplates();
        }
    }, [selectedTab, searchText, pageNo, pageSize])
    const handleTabClick = (value) => {
        console.log(value);
        setSearchText('');
        setpageNo(0);
        setpageSize(20);
        setSelectedTab(value);
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
    const getDefaultIndependentTest = async () => {
        console.log("getDefaultIndependentTest", searchText, pageNo, pageSize)
        const apiRes = await getDefaultIndependentTestAPI(searchText, pageNo, pageSize);
        console.log("apiRes", apiRes);
        setIndependentTestList(apiRes.independentTests);
        setTotalTestsCount(apiRes.count);
    }

    const getDefaultXrayTemplates = async () => {
        console.log("getDefaultXrayTemplates", searchText, pageNo, pageSize)
        const apiRes = await getDefaultXrayTemplatesAPI(searchText, pageNo, pageSize);
        console.log("apiRes", apiRes);
        setRadiologyTestList(apiRes.defaulttests);
        setTotalTestsCount(apiRes.count);
    }

    const handleSearchTextChange = (e) => {
        console.log("handleSearchTextChange", e.target.value);
        const { value } = e.target;
        setSearchText(value);

    }

    const addNewTest = () => {
        if (selectedTab === "Independent") {
            setisAddNewIndependentTest(true);
        } else if (selectedTab === "Radiology") {
            setIsAddNewRadiologyTest(true);
            setIsAddRadiologyTestOpen(true);
        }
    }

    const closeAllModals = () => {
        setSelectedRadiologyTest(null);
        setIsAddNewRadiologyTest(false);
        setIsAddRadiologyTestOpen(false);
        if (selectedTab === "Independent") {
            getDefaultIndependentTest();
        } else if (selectedTab === "Radiology") {
            getDefaultXrayTemplates();
        }
    }

    const editRadTest = (radTest) => {
        console.log("radTest", radTest);
        setSelectedRadiologyTest(radTest);
        setIsAddNewRadiologyTest(true);
        setIsAddRadiologyTestOpen(true);

    }

    const deletetest = async (test) => {
        let reqObj = {
            _id: test._id
        }
        console.log("reqObj", reqObj);
        const apiRes = await deleteRadiologyTestAPI(reqObj);
        console.log("apiRes", apiRes);
        setSearchText('');
        setpageNo(0);
        setpageSize(20);
        getDefaultXrayTemplates();
        // setSelectedTab(value);
    }
    const singleParamenterTest = () => {
        navigate('/admin-dashboard/AddSingleParameterTest')
        handleComponentSelect('AddSingleParameterTest');
    }
    return (
        <div className='wellness-main-screen'>
            <div className='row'>
                <div className='tabs-row'>
                    <div className="col-4 tabsContainers">
                        <div id="13399" className={selectedTab === "Independent" ? 'activetabs' : "tabSections"}
                            onClick={() => handleTabClick('Independent')} >
                            <span id="doc">INDEPENDENT TESTS</span>
                        </div>
                        <div id="13400" className={selectedTab === "Radiology" ? 'activetabs' : "tabSections"}
                            onClick={() => handleTabClick('Radiology')}>
                            <span id="pat">RADIOLOGY TESTS</span>
                        </div>

                    </div>
                </div>
                <div className="list-row mt-3">
                    <div className="row">
                        <div className="col-lg-4 col-md-4">
                            <div className="screen-header-name">
                                INDEPENDENT TESTS
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="search-bar-row">
                                <input name="searchText" className="form-control" value={searchText} onChange={handleSearchTextChange} />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 d-flex justify-content-end">
                            <button className="add-test-btn provider-submit-btn" onClick={addNewTest}>+ Add New Test</button>
                        </div>
                    </div>
                </div>
                <div className='list-row mt-3'>
                    {
                        selectedTab === "Independent" ? (
                            <div className='row'>
                                <div className='panel-list-table'>
                                    <Paper>
                                        <TableContainer>
                                            <Table className='custom-drugs-tbl'>
                                                <TableHead className='custom-drugs-tbl-header-row'>
                                                    <TableRow className=''>
                                                        <TableCell className='custom-drugs-tbl-header'>#</TableCell>
                                                        <TableCell className='custom-drugs-tbl-header'>Test Name</TableCell>
                                                        <TableCell className='custom-drugs-tbl-header'>Short Name</TableCell>
                                                        <TableCell className='custom-drugs-tbl-header'>Category</TableCell>
                                                        <TableCell className='custom-drugs-tbl-header'>Actions</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody className='custom-drugs-tbl-body'>
                                                    {independentTestList.map((panel, index) => (
                                                        <TableRow key={index} className='custom-drugs-tbl-body-td'>
                                                            <TableCell>{index + 1}</TableCell>
                                                            <TableCell>{panel.testName}</TableCell>
                                                            <TableCell>
                                                                {panel.testShortCode}
                                                            </TableCell>
                                                            <TableCell>{panel.category}</TableCell>
                                                            <TableCell>
                                                                <img className='edit-panel-img' src='../images/Admin-icons/edit-panel.svg' alt='edit-panel' />
                                                                <img className='edit-panel-img' src='../images/Admin-icons/delete-panel.svg' alt='delete-panel' />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={rowsPerPageOptions}
                                            component="div"
                                            count={totalTestsCount}
                                            rowsPerPage={pageSize}
                                            page={pageNo}
                                            onPageChange={handlePageChange}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                </div>
                            </div>
                        ) : (
                            <div className='row'>
                                <div className='panel-list-table'>
                                    <Paper>
                                        <TableContainer>
                                            <Table className='custom-drugs-tbl'>
                                                <TableHead className='custom-drugs-tbl-header-row'>
                                                    <TableRow className='row'>
                                                        <TableCell className='col-lg-1 col-1 custom-drugs-tbl-header'>#</TableCell>
                                                        <TableCell className='col-lg-4 col-4 custom-drugs-tbl-header'>TEST NAME</TableCell>
                                                        <TableCell className='col-lg-2 col-2 custom-drugs-tbl-header'>TEST PRICE</TableCell>
                                                        <TableCell className='col-lg-2 col-2 custom-drugs-tbl-header'>MAX DISCOUNT ALLOWED(%)</TableCell>
                                                        <TableCell className='col-lg-3 col-3 custom-drugs-tbl-header'>ACTION</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody className='custom-drugs-tbl-body'>
                                                    {radiologyTestList.map((panel, index) => (
                                                        <TableRow key={index} className='custom-drugs-tbl-body-td'>
                                                            <TableCell>{index + 1}</TableCell>
                                                            <TableCell>{panel.testName}</TableCell>
                                                            <TableCell>{panel.price}</TableCell>
                                                            <TableCell>{panel.maxDiscountPercentage}</TableCell>
                                                            <TableCell>
                                                                <img className='edit-panel-img' src='../images/Admin-icons/edit-panel.svg' alt='edit-panel' onClick={() => editRadTest(panel)} />
                                                                <img className='edit-panel-img' src='../images/Admin-icons/delete-panel.svg' alt='delete-panel' onClick={() => deletetest(panel)} />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={rowsPerPageOptions}
                                            component="div"
                                            count={totalTestsCount}
                                            rowsPerPage={pageSize}
                                            page={pageNo}
                                            onPageChange={handlePageChange}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Paper>

                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            {
                isAddNewRadiologyTest ? (<CreateRadiologyTest isOpen={isAddRadiologyTestOpen} onClose={closeAllModals} radiologyTestDetails={selectedRadiologyTest} />) : ''
            }
               {
                isAddNewIndependentTest ? (
                    <div className='initiateComp-popup'>
                        <div className='Addtest-overlay'>
                       
                            <div className='row popup-content'>

                                <div className='row tests'  onClick={singleParamenterTest} >
                                    <div className='select-lbl'>Single Parameter Test</div>
                                    <div className='select-lbl'>Ex: Haemoglobin</div>
                               
                                </div>
                                <div className='row tests'>
                                    <div className='select-lbl'>Multi Parameter Test</div>
                                    <div className='select-lbl'>Ex: Urine Routine Test</div>
                               
                                </div>
                           
                            </div>
                        </div>

                    </div>
                ) : ''
            } 
        </div>
    )
}

export default AdminTests;