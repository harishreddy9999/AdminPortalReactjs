import React, { useEffect, useState, useCallback } from 'react';
import '../../App.css';
import '../../Styles/Admin-complaints.css';
import Card from '@mui/material/Card';
import { getCustomerComplaints, getAssigneeDevlopers, getcomplaintsFrom, updateComplaintStatus } from '../../services/adminportalService';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import moment from 'moment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ComplaintDetails from './ComplaintDetails';

function Complaints() {

    const [docsinWebPendingcomplaintsCount, setdocsinWebPendingcomplaintsCount] = useState([]);
    const [docsinWebInvalidcomplaintsCount, setdocsinWebInvalidcomplaintsCount] = useState([]);
    const [docsinWebResolvedcomplaintsCount, setdocsinWebResolvedcomplaintsCount] = useState([]);
    const [docsinAppInvalidcomplaintsCount, setdocsinAppInvalidcomplaintsCount] = useState([]);
    const [docsinAppPendingcomplaintsCount, setdocsinAppPendingcomplaintsCount] = useState([]);
    const [docsinAppResolvedcomplaintsCount, setdocsinAppResolvedcomplaintsCount] = useState([]);
    const [patientsInvalidcomplaintsCount, setpatientsInvalidcomplaintsCount] = useState([]);
    const [patientsResolvedcomplaintsCount, setpatientsResolvedcomplaintsCount] = useState([]);
    const [pharmaInvalidcomplaintsCount, setpharmaInvalidcomplaintsCount] = useState([]);
    const [pharmaPendingcomplaintsCount, setpharmaPendingcomplaintsCount] = useState([]);
    const [pharmaResolvedcomplaintsCount, setpharmaResolvedcomplaintsCount] = useState([]);
    const [clinicalInvalidcomplaintsCount, setclinicalInvalidcomplaintsCount] = useState([]);
    const [clinicalPendingcomplaintsCount, setclinicalPendingcomplaintsCount] = useState([]);
    const [clinicalResolvedcomplaintsCount, setclinicalResolvedcomplaintsCount] = useState([]);
    const [labInvalidcomplaintsCount, setlabInvalidcomplaintsCount] = useState([]);
    const [labPendingcomplaintsCount, setlabPendingcomplaintsCount] = useState([]);
    const [labResolvedcomplaintsCount, setlabResolvedcomplaintsCount] = useState([]);
    const [patientsPendingcomplaintsCount, setpatientsPendingcomplaintsCount] = useState([]);
    const [assigneeDevlopersList, setAssigneeDevlopersList] = useState([]);
    const [docisnWebComplaintsList, setDocisnWebComplaintsList] = useState([]);
    const [docisnAppComplaintsList, setDocisnAppComplaintsList] = useState([]);
    const [clinicComplaintsList, setClinicComplaintsList] = useState([]);
    const [pharmaComplaintsList, setPharmaComplaintsList] = useState([]);
    const [labComplaintsList, setLabComplaintsList] = useState([]);
    const [patientsComplaintsList, setPatientsComplaintsList] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [value, setValue] = useState(0);
    const [isComplaintOpen, setisComplaintOpen] = useState(false);
    const [isInitiateComplaintOpen, setisInitiateComplaintOpen] = useState(false);
    const [assignedDeveloperEmail, setAssignedDeveloperEmail] = useState('');
    const [assignedDeveloperName, setassignedDeveloperName] = useState('');
    const [initialtedComplaintId, setinitialtedComplaintId] = useState('');
    const [resolvedComplaintID, setresolvedComplaintID] = useState('');
    const [resolvedComplaintModal, setresolvedComplaintModal] = useState(false);
    const [complaintExplanation, setcomplaintExplanation] = useState('');
    const [isCompResolvedClicked, setIsCompResolvedClicked] = useState(false);
    const [isCompInvalidClicked, setIsCompInvalidClicked] = useState(false);

    const handleChange = useCallback((newValue) => {
        // if(newValue.target.innerText === )
        console.log("innerText", newValue.target.innerText)

        // debugger;
        let complaintsFrom = "";
        if (newValue.target.innerText === "DOCISN PLUS WEB COMPLAINTS") {
            setValue(0);
            complaintsFrom = "DOCISNPLUSWEB";
        } else if (newValue.target.innerText === "DOCISN PLUS APP COMPLAINTS") {
            setValue(1);
            complaintsFrom = "DOCISNPLUSAPP";
        } else if (newValue.target.innerText === "DOCISN CLINIC COMPLAINTS") {
            setValue(2);
            complaintsFrom = "DOCISNFRONTDESK";
        } else if (newValue.target.innerText === "DOCISN AREX COMPLAINTS") {
            setValue(3);
            complaintsFrom = "DOCISNAREX";
        } else if (newValue.target.innerText === "DOCISN LAB COMPLAINTS") {
            setValue(4);
            complaintsFrom = "DOCISNLAB";
        } else if (newValue.target.innerText === "DOCISN COMPLAINTS") {
            setValue(5);
            complaintsFrom = "DOCISN";
        }
        // debugger;
        getComplaintsList(complaintsFrom);
    }, []);

    useEffect(() => {
        getComplaints();
        getComplaintsList("DOCISNPLUSWEB")
    }, []);

    useEffect(() => {
        const getDevelopers = async () => {
            try {
                const response = await getAssigneeDevlopers();
                console.log("getDevelopers", response);
                // debugger;
                // const assigneeDevlopersList = response;
                setAssigneeDevlopersList(response)
            } catch {

            }
        }
        getDevelopers();
    }, []);

    const getComplaints = async () => {
        try {
            const complaints = await getCustomerComplaints();
            // let complaints = data;
            if (complaints) {
                setdocsinWebPendingcomplaintsCount(complaints.DOCISNPLUSWEB[0].pendingComplaints);
                setdocsinWebInvalidcomplaintsCount(complaints.DOCISNPLUSWEB[2].invalidComplaints);
                setdocsinWebResolvedcomplaintsCount(complaints.DOCISNPLUSWEB[1].resolvedComplaints);
                setdocsinAppInvalidcomplaintsCount(complaints.DOCISNPLUSAPP[2].invalidComplaints);
                setdocsinAppPendingcomplaintsCount(complaints.DOCISNPLUSAPP[0].pendingComplaints);
                setdocsinAppResolvedcomplaintsCount(complaints.DOCISNPLUSAPP[1].resolvedComplaints);
                setpatientsInvalidcomplaintsCount(complaints.DOCISN[2].invalidComplaints);
                setpatientsPendingcomplaintsCount(complaints.DOCISN[0].pendingComplaints);
                setpatientsResolvedcomplaintsCount(complaints.DOCISN[1].resolvedComplaints);
                setpharmaInvalidcomplaintsCount(complaints.DOCISNAREX[2].invalidComplaints);
                setpharmaPendingcomplaintsCount(complaints.DOCISNAREX[0].pendingComplaints);
                setpharmaResolvedcomplaintsCount(complaints.DOCISNAREX[1].resolvedComplaints);
                setclinicalInvalidcomplaintsCount(complaints.DOCISNFRONTDESK[2].invalidComplaints);
                setclinicalPendingcomplaintsCount(complaints.DOCISNFRONTDESK[0].pendingComplaints);
                setclinicalResolvedcomplaintsCount(complaints.DOCISNFRONTDESK[1].resolvedComplaints);
                setlabInvalidcomplaintsCount(complaints.DOCISNLAB[2].invalidComplaints);
                setlabPendingcomplaintsCount(complaints.DOCISNLAB[0].pendingComplaints);
                setlabResolvedcomplaintsCount(complaints.DOCISNLAB[1].resolvedComplaints);

            }
        } catch {

        }
    }

    const getComplaintsList = async (value) => {
        try {
            const complaintsArr = await getcomplaintsFrom(value);

            // Initialize an object to map values to state variables
            const stateMappings = {
                DOCISNPLUSWEB: setDocisnWebComplaintsList,
                DOCISNPLUSAPP: setDocisnAppComplaintsList,
                DOCISNFRONTDESK: setClinicComplaintsList,
                DOCISNAREX: setPharmaComplaintsList,
                DOCISNLAB: setLabComplaintsList,
                DOCISN: setPatientsComplaintsList,
            };

            // Set the state based on the value
            Object.keys(stateMappings).forEach((key) => {
                stateMappings[key](key === value ? complaintsArr.data : []);
            });

            // setTotalComplaintsCount(complaintsArr.totalComplaintsCount);
            console.log("complaintsArr", complaintsArr);
        } catch (error) {
            console.error("Error fetching complaints:", error);
        }
    };

    const viewComplaintDetail = (complaint) => {
        // Your logic for handling the click event
        // debugger;
        setSelectedComplaint(complaint);
        setisComplaintOpen(true);
        console.log('View Complaint Detail:', complaint);
    };

    const initiatedata = (complaintID) => {
        console.log(complaintID);
        setisInitiateComplaintOpen(true);
        setinitialtedComplaintId(complaintID);
    }
    const changeAssignedDeveloper = (value) => {
        console.log("changeAssignedDeveloper", value);
        const selectedDeveloper = assigneeDevlopersList.find((developer) => developer.name === value);

        if (selectedDeveloper) {
            setAssignedDeveloperEmail(selectedDeveloper.email); // Set email
            setassignedDeveloperName(selectedDeveloper.name); // Set name
        }
    }
    const assignDeveloperForComplaint = async () => {
        try {
            if (assignedDeveloperName === "" || assignedDeveloperEmail === "") {
                return;
            }
            let reqObj = {
                complaintID: initialtedComplaintId,
                assigneeName: assignedDeveloperName,
                assigneeEmail: assignedDeveloperEmail,
                status: "IN_PROGRESS"
            };
            console.log(reqObj);
            // return;
            const assignDeveloperForComplaintRes = await updateComplaintStatus(reqObj);
            console.log(assignDeveloperForComplaintRes);
            if (assignDeveloperForComplaintRes) {
                setisInitiateComplaintOpen(false);
                setinitialtedComplaintId('');
                getComplaintsList("DOCISNPLUSWEB");
            }
        } catch {

        }


    }

    const closeInitiateComplaint = () => {
        setisInitiateComplaintOpen(false);
        setresolvedComplaintModal(false);
        setinitialtedComplaintId('');
        setresolvedComplaintID('');
        setIsCompInvalidClicked(false);
        setIsCompResolvedClicked(false);
    }

    const resolvedComplaint = (complaintID, clickedValue) => {
        console.log(complaintID);
        setresolvedComplaintID(complaintID);
        setresolvedComplaintModal(true);
        setcomplaintExplanation('');
        if (clickedValue === "RESOLVED") {
            setIsCompResolvedClicked(true);
            setIsCompInvalidClicked(false);
        } else if (clickedValue === "INVALID") {
            setIsCompInvalidClicked(true);
            setIsCompResolvedClicked(false);
        }
    }

    const complaintResolution = async () => {
        try {
            let compStatus = "";
            if (isCompResolvedClicked) {
                compStatus = "ISSUE_RESOLVED";
            } else if (isCompInvalidClicked) {
                compStatus = "INVALID_ISSUE";
            }
            let reqObj = {
                complaintID: resolvedComplaintID,
                status: compStatus,
                comments: complaintExplanation
            }
            console.log("reqObj", reqObj);
            const updateComplaintStatusRes = await updateComplaintStatus(reqObj);
            console.log(updateComplaintStatusRes);
            if (updateComplaintStatusRes) {
                closeInitiateComplaint();
                getComplaintsList("DOCISNPLUSWEB");
            }

        } catch {

        }
    }


    const closeAllModals = () => {
        setSelectedComplaint(null);
        setisComplaintOpen(false);
        // debugger;
    };

    return (
        <div id="15818" className="row matop">
            <div className='row'>
                <div className="col-lg-2 col-md-2 col-3 stats-card">
                    <h5 className="screen-heading">Docisn Web</h5>
                    <Card className="doctors" >
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-between">
                                <h6  >Pending Complaints : </h6>
                                <p>{docsinWebPendingcomplaintsCount}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6  >Resolved Complaints : </h6>
                                <p>{docsinWebResolvedcomplaintsCount}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6  >Invalid Complaints : </h6>
                                <p>{docsinWebInvalidcomplaintsCount}</p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-lg-2 col-md-2 col-3 stats-card">
                    <h5 className="screen-heading">Docisn App</h5>
                    <Card className="doctors" >
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-between">
                                <h6  >Pending Complaints : </h6>
                                <p>{docsinAppPendingcomplaintsCount}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6  >Resolved Complaints : </h6>
                                <p>{docsinAppResolvedcomplaintsCount}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6  >Invalid Complaints : </h6>
                                <p>{docsinAppInvalidcomplaintsCount}</p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-lg-2 col-md-2 col-3 stats-card">
                    <h5 className="screen-heading">Clinic</h5>
                    <Card className="doctors" >
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-between">
                                <h6  >Pending Complaints : </h6>
                                <p>{clinicalPendingcomplaintsCount}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6  >Resolved Complaints : </h6>
                                <p>{clinicalResolvedcomplaintsCount}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6  >Invalid Complaints : </h6>
                                <p>{clinicalInvalidcomplaintsCount}</p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-lg-2 col-md-2 col-3 stats-card">
                    <h5 className="screen-heading">Pharma</h5>
                    <Card className="doctors" >
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-between">
                                <h6  >Pending Complaints : </h6>
                                <p>{pharmaPendingcomplaintsCount}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6  >Resolved Complaints : </h6>
                                <p>{pharmaResolvedcomplaintsCount}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6  >Invalid Complaints : </h6>
                                <p>{pharmaInvalidcomplaintsCount}</p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-lg-2 col-md-2 col-3 stats-card">
                    <h5 className="screen-heading">Lab</h5>
                    <Card className="doctors" >
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-between">
                                <h6  >Pending Complaints : </h6>
                                <p>{labPendingcomplaintsCount}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6  >Resolved Complaints : </h6>
                                <p>{labResolvedcomplaintsCount}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6  >Invalid Complaints : </h6>
                                <p>{labInvalidcomplaintsCount}</p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-lg-2 col-md-2 col-3 stats-card">
                    <h5 className="screen-heading">Patients</h5>
                    <Card className="doctors" >
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-between">
                                <h6>Pending Complaints : </h6>
                                <p>{patientsPendingcomplaintsCount}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6  >Resolved Complaints : </h6>
                                <p>{patientsResolvedcomplaintsCount}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6  >Invalid Complaints : </h6>
                                <p>{patientsInvalidcomplaintsCount}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <div className='row stats-card'>
                <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
                    <Tab label="Docisn Plus Web Complaints" />
                    <Tab label="Docisn Plus App Complaints" />
                    <Tab label="Docisn Clinic Complaints" />
                    <Tab label="Docisn Arex Complaints" />
                    <Tab label="Docisn Lab Complaints" />
                    <Tab label="Docisn Complaints" />
                </Tabs>



                <div id="13941" className="row table-header user-heading d-flex">
                    <div id="13942" className="col-2 heading-label table-header-text">DATE</div>
                    <div id="13943" className="col-2 heading-id-label table-header-text">RAISED BY</div>
                    <div id="13944" className="col-3 heading-label table-header-text">SUBJECT</div>
                    <div id="13945" className="col-3 heading-label table-header-text">STATUS</div>
                    <div id="13948" className="col-2 heading-actions table-header-text">Actions</div>
                </div>

                {docisnWebComplaintsList.length > 0 && docisnWebComplaintsList.map((complaint, index) => (
                    <div key={index} className="row user-details d-flex card-body">
                        <div id="13952" className="col-2 d-flex">
                            <div id="13954" className="user-name table-data-text">{moment(new Date(complaint.createdOn)).format("DD/MM/YYYY")}</div>
                        </div>
                        <div id="13956" className="col-2 user-mobile table-data-text">{complaint.providerName}</div>

                        <div id="13958" className="col-3 user-email table-data-text">{complaint.title}</div>
                        <div id="13959" className="col-3 user-email table-data-text">{complaint.status}</div>
                        <div id="13960" className="col-2 d-flex">
                            <VisibilityIcon className="complaint-eyeicon" id="doctoreye" onClick={() => viewComplaintDetail(complaint)} />
                            {
                                complaint.status === 'COMPLAINT_RECIEVED' ?
                                    (<button type="button" className="btn-primary initiate-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => initiatedata(complaint._id)}>Initiate</button>) : ('')
                            }
                            {
                                complaint.status === 'IN_PROGRESS' ?
                                    (<button type="button" className="btn-primary resolve-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => resolvedComplaint(complaint._id, "RESOLVED")}>Resolved</button>) : ('')
                            }
                            {
                                complaint.status === 'IN_PROGRESS' ?
                                    (<button type="button" className="btn-primary invalid-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => resolvedComplaint(complaint._id, "INVALID")}>Invalid</button>) : ('')
                            }

                        </div>
                    </div>
                ))}

                {docisnAppComplaintsList.length > 0 && docisnAppComplaintsList.map((complaint, index) => (
                    <div key={index} className="row user-details d-flex card-body">
                        <div id="13952" className="col-2 d-flex">
                            <div id="13954" className="user-name table-data-text">{moment(new Date(complaint.createdOn)).format("DD/MM/YYYY")}</div>
                        </div>
                        <div id="13956" className="col-2 user-mobile table-data-text">{complaint.providerName}</div>

                        <div id="13958" className="col-3 user-email table-data-text">{complaint.title}</div>
                        <div id="13959" className="col-3 user-email table-data-text">{complaint.status}</div>
                        <div id="13960" className="col-2 d-flex">
                            <VisibilityIcon className="complaint-eyeicon" id="doctoreye" onClick={() => viewComplaintDetail(complaint)} />
                            {
                                complaint.status === 'COMPLAINT_RECIEVED' ?
                                    (<button type="button" className="btn-primary initiate-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => initiatedata(complaint._id)}>Initiate</button>) : ('')
                            }
                            {
                                complaint.status === 'IN_PROGRESS' ?
                                    (<button type="button" className="btn-primary resolve-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => resolvedComplaint(complaint._id, "RESOLVED")}>Resolved</button>) : ('')
                            }
                            {
                                complaint.status === 'IN_PROGRESS' ?
                                    (<button type="button" className="btn-primary invalid-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => resolvedComplaint(complaint._id, "INVALID")}>Invalid</button>) : ('')
                            }
                        </div>
                    </div>
                ))}

                {clinicComplaintsList.length > 0 && clinicComplaintsList.map((complaint, index) => (
                    <div key={index} className="row user-details d-flex card-body">
                        <div id="13952" className="col-2 d-flex">
                            <div id="13954" className="user-name table-data-text">{moment(new Date(complaint.createdOn)).format("DD/MM/YYYY")}</div>
                        </div>
                        <div id="13956" className="col-2 user-mobile table-data-text">{complaint.providerName}</div>

                        <div id="13958" className="col-3 user-email table-data-text">{complaint.title}</div>
                        <div id="13959" className="col-3 user-email table-data-text">{complaint.status}</div>
                        <div id="13960" className="col-2 d-flex">
                            <VisibilityIcon className="complaint-eyeicon" id="doctoreye" onClick={() => viewComplaintDetail(complaint)} />
                            {
                                complaint.status === 'COMPLAINT_RECIEVED' ?
                                    (<button type="button" className="btn-primary initiate-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => initiatedata(complaint._id)}>Initiate</button>) : ('')
                            }
                            {
                                complaint.status === 'IN_PROGRESS' ?
                                    (<button type="button" className="btn-primary resolve-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => resolvedComplaint(complaint._id, "RESOLVED")}>Resolved</button>) : ('')
                            }
                            {
                                complaint.status === 'IN_PROGRESS' ?
                                    (<button type="button" className="btn-primary invalid-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => resolvedComplaint(complaint._id, "INVALID")}>Invalid</button>) : ('')
                            }
                        </div>
                    </div>
                ))}

                {pharmaComplaintsList.length > 0 && pharmaComplaintsList.map((complaint, index) => (
                    <div key={index} className="row user-details d-flex card-body">
                        <div id="13952" className="col-2 d-flex">
                            <div id="13954" className="user-name table-data-text">{moment(new Date(complaint.createdOn)).format("DD/MM/YYYY")}</div>
                        </div>
                        <div id="13956" className="col-2 user-mobile table-data-text">{complaint.providerName}</div>

                        <div id="13958" className="col-3 user-email table-data-text">{complaint.title}</div>
                        <div id="13959" className="col-3 user-email table-data-text">{complaint.status}</div>
                        <div id="13960" className="col-2 d-flex">
                            <VisibilityIcon className="complaint-eyeicon" id="doctoreye" onClick={() => viewComplaintDetail(complaint)} />
                            {
                                complaint.status === 'COMPLAINT_RECIEVED' ?
                                    (<button type="button" className="btn-primary initiate-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => initiatedata(complaint._id)}>Initiate</button>) : ('')
                            }
                            {
                                complaint.status === 'IN_PROGRESS' ?
                                    (<button type="button" className="btn-primary resolve-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => resolvedComplaint(complaint._id, "RESOLVED")}>Resolved</button>) : ('')
                            }
                            {
                                complaint.status === 'IN_PROGRESS' ?
                                    (<button type="button" className="btn-primary invalid-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => resolvedComplaint(complaint._id, "INVALID")}>Invalid</button>) : ('')
                            }
                        </div>
                    </div>
                ))}

                {labComplaintsList.length > 0 && labComplaintsList.map((complaint, index) => (
                    <div key={index} className="row user-details d-flex card-body">
                        <div id="13952" className="col-2 d-flex">
                            <div id="13954" className="user-name table-data-text">{moment(new Date(complaint.createdOn)).format("DD/MM/YYYY")}</div>
                        </div>
                        <div id="13956" className="col-2 user-mobile table-data-text">{complaint.providerName}</div>

                        <div id="13958" className="col-3 user-email table-data-text">{complaint.title}</div>
                        <div id="13959" className="col-3 user-email table-data-text">{complaint.status}</div>
                        <div id="13960" className="col-2 d-flex">
                            <VisibilityIcon className="complaint-eyeicon" id="doctoreye" onClick={() => viewComplaintDetail(complaint)} />
                            {
                                complaint.status === 'COMPLAINT_RECIEVED' ?
                                    (<button type="button" className="btn-primary initiate-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => initiatedata(complaint._id)}>Initiate</button>) : ('')
                            }
                            {
                                complaint.status === 'IN_PROGRESS' ?
                                    (<button type="button" className="btn-primary resolve-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => resolvedComplaint(complaint._id, "RESOLVED")}>Resolved</button>) : ('')
                            }
                            {
                                complaint.status === 'IN_PROGRESS' ?
                                    (<button type="button" className="btn-primary invalid-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => resolvedComplaint(complaint._id, "INVALID")}>Invalid</button>) : ('')
                            }
                        </div>
                    </div>
                ))}

                {patientsComplaintsList.length > 0 && patientsComplaintsList.map((complaint, index) => (
                    <div key={index} className="row user-details d-flex card-body">
                        <div id="13952" className="col-2 d-flex">
                            <div id="13954" className="user-name table-data-text">{moment(new Date(complaint.createdOn)).format("DD/MM/YYYY")}</div>
                        </div>
                        <div id="13956" className="col-2 user-mobile table-data-text">{complaint.providerName}</div>

                        <div id="13958" className="col-3 user-email table-data-text">{complaint.title}</div>
                        <div id="13959" className="col-3 user-email table-data-text">{complaint.status}</div>
                        <div id="13960" className="col-2 d-flex">
                            <VisibilityIcon className="complaint-eyeicon" id="doctoreye" onClick={() => viewComplaintDetail(complaint)} />
                            {
                                complaint.status === 'COMPLAINT_RECIEVED' ?
                                    (<button type="button" className="btn-primary initiate-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => initiatedata(complaint._id)}>Initiate</button>) : ('')
                            }
                            {
                                complaint.status === 'IN_PROGRESS' ?
                                    (<button type="button" className="btn-primary resolve-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => resolvedComplaint(complaint._id, "RESOLVED")}>Resolved</button>) : ('')
                            }
                            {
                                complaint.status === 'IN_PROGRESS' ?
                                    (<button type="button" className="btn-primary invalid-btn ms-2" id="doc-initiatebtn"
                                        onClick={() => resolvedComplaint(complaint._id, "INVALID")}>Invalid</button>) : ('')
                            }
                        </div>
                    </div>
                ))}
            </div>
            {isInitiateComplaintOpen ? (
                <div className='initiateComp-popup'>
                    <div className='initiateComp-overlay'>
                        <div className='popup-header'>
                            <p className='popup-header-label'>Assign Developer</p>
                        </div>
                        <div className='row popup-content'>
                            <div className='row'>
                                <label className='select-lbl'>Name</label>
                                <select className='form-control' type="text"
                                    value={assignedDeveloperName}
                                    onChange={(e) => changeAssignedDeveloper(e.target.value)}
                                    required
                                >
                                    {/* Render the "Select" option */}
                                    <option key={-1} value={'select developer'}>Select</option>

                                    {/* Map through the assigneeDevlopersList array to render the other options */}
                                    {assigneeDevlopersList.length > 0 && assigneeDevlopersList.map((developer, index) => (
                                        <option key={index} value={developer.name}>{developer.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='row'>
                                <label className='select-lbl'>Email</label>
                                <input className='form-control' type="text"
                                    value={assignedDeveloperEmail}
                                    required
                                    readOnly />
                            </div>
                            <div className='d-flex justify-content-end mt-4'>
                                <button className='submit-btn' onClick={assignDeveloperForComplaint}>Submit</button>
                                <button className='cancel-btn' onClick={closeInitiateComplaint}>Cancel</button>
                            </div>
                        </div>
                    </div>

                </div>

            ) : ''}
            {
                resolvedComplaintModal ? (
                    <div className='initiateComp-popup'>
                        <div className='initiateComp-overlay'>
                            <div className='popup-header'>
                                <p className='popup-header-label'>Complaint Explanation</p>
                            </div>
                            <div className='row popup-content'>

                                <div className='row'>
                                    <label className='select-lbl'>Explanation</label>
                                    <input className='form-control' type="text"
                                        value={complaintExplanation}
                                        onChange={(e) => setcomplaintExplanation(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='d-flex justify-content-end mt-4'>
                                    <button className='submit-btn' onClick={complaintResolution}>Submit</button>
                                    <button className='cancel-btn' onClick={closeInitiateComplaint}>Cancel</button>
                                </div>
                            </div>
                        </div>

                    </div>
                ) : ''
            }
            {selectedComplaint !== null ? (<ComplaintDetails isOpen={isComplaintOpen} onClose={closeAllModals} complaint={selectedComplaint} />) : ''}
        </div>
    );
}

export default Complaints;