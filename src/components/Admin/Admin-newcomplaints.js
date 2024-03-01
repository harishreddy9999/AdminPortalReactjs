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

function NewComplaints() {

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
        // console.log("innerText", newValue.target.innerText)

        //  debugger;
        let complaintsFrom = "";
        if (newValue === "Docisn Plus Web") {
            setValue(0);
            complaintsFrom = "DOCISNPLUSWEB";
        } else if (newValue === "Docisn Plus App") {
            setValue(1);
            complaintsFrom = "DOCISNPLUSAPP";
        }
        else if (newValue === "Docisn Patients") {
            setValue(2);
            complaintsFrom = "DOCISN";
        } else if (newValue === "Docisn Clinic") {
            setValue(3);
            complaintsFrom = "DOCISNFRONTDESK";
        } else if (newValue === "Docisn Laboratory") {
            setValue(4);
            complaintsFrom = "DOCISNLAB";
        } else if (newValue === "Docisn Rx") {
            setValue(5);
            complaintsFrom = "DOCISNAREX";
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
            <div className='row '>


                {/* <Tabs value={value} onChange={handleChange} className="Tabs" >
                    <Tab className={value === 0 ? "selected-tab" : "tab"} label={<span><img id="doctorImg" className="lineimg" src={value === 0 ? "../images/line.png" : ""} /> <img id="doctorImg" className="tabimg" src={value === 0 ? "../images/activemedical.svg" : "../images/medical.png"} alt='Doctor' />
                        <span className={value === 0 ? "selected-text" : "tabtext"}>Docisn Plus Web</span></span>} />
                    <Tab className={value === 1 ? "selected-tab" : "tab"} label={<span><img id="doctorImg" className="lineimg" src={value === 1 ? "../images/line.png" : ""} /><img id="clinicImg" className="tabimg" src={value === 1 ? "../images/activehospital.png" : "../images/hospital.png"} alt='Clinic' />
                        <span className={value === 1 ? "selected-text" : "tabtext"}>Docisn Plus App</span></span>} />
                    <Tab className={value === 2 ? "selected-tab" : "tab"} label={<span><img id="doctorImg" className="lineimg" src={value === 2 ? "../images/line.png" : ""} /><img id="labImg" className="tabimg" src={value === 2 ? "../images/activelab.png" : "../images/lab.png"} alt='Laboratory' />
                        <span className={value === 2 ? "selected-text" : "tabtext"}>Docisn Patients </span></span>} />
                    <Tab className={value === 3 ? "selected-tab" : "tab"} label={<span><img id="doctorImg" className="lineimg" src={value === 3 ? "../images/line.png" : ""} /><img id="pharmacyImg" className="tabimg" src={value === 3 ? "../images/activepharmacy.png" : "../images/pharmacy.png"} alt='Pharmacy' />
                        <span className={value === 3 ? "selected-text" : "tabtext"}>Docisn Clinic</span></span>} />
                    <Tab className={value === 4 ? "selected-tab" : "tab"} label={<span><img id="doctorImg" className="lineimg" src={value === 4 ? "../images/line.png" : ""} /><img id="pharmacyImg" className="tabimg" src={value === 4 ? "../images/activepharmacy.png" : "../images/pharmacy.png"} alt='Pharmacy' />
                        <span className={value === 4 ? "selected-text" : "tabtext"}>Docisn Laboratory</span></span>} />
                    <Tab className={value === 5 ? "selected-tab" : "tab"} label={<span><img id="doctorImg" className="lineimg" src={value === 5 ? "../images/line.png" : ""} /><img id="pharmacyImg" className="tabimg" src={value === 5 ? "../images/activepharmacy.png" : "../images/pharmacy.png"} alt='Pharmacy' />
                        <span className={value === 5 ? "selected-text" : "tabtext"}>Docisn Rx</span></span>} />
                </Tabs> */}
                 {/* <Tabs value={value} onChange={handleChange} className="cTabs" >
                    <Tab className={value === 0 ? "cselected-tab" : "ctab"} label={<span className={value === 0 ? "cselected-text" : "ctabtext"}>Docisn Plus Web</span>} />
                    <Tab className={value === 1 ? "cselected-tab" : "ctab"} label={<span className={value === 1 ? "cselected-text" : "ctabtext"}>Docisn Plus App</span>} />
                    <Tab className={value === 2 ? "cselected-tab" : "ctab"} label={<span className={value === 2 ? "cselected-text" : "ctabtext"}>Docisn Patients </span>} />
                    <Tab className={value === 3 ? "cselected-tab" : "ctab"} label={<span className={value === 3 ? "cselected-text" : "ctabtext"}>Docisn Clinic</span> }/>
                    <Tab className={value === 4 ? "cselected-tab" : "ctab"} label={<span className={value === 4 ? "cselected-text" : "ctabtext"}>Docisn Laboratory</span>}/>
                    <Tab className={value === 5 ? "cselected-tab" : "ctab"} label={<span className={value === 5 ? "cselected-text" : "ctabtext"}>Docisn Rx</span>}/>
                </Tabs> */}

<div class="col-8 tabsContainers">
                    <div id="13399" className={value === 0 ? 'activetabs' : "tabSections"}
                    onClick={() => handleChange('Docisn Plus Web')} >
                        <span id="doc">Docisn Plus Web</span></div>
                    <div id="13400" className={value === 1 ? 'activetabs' : "tabSections"}
                     onClick={() => handleChange('Docisn Plus App')}>
                        <span id="pat">Docisn Plus App</span></div>
                    <div id="13401" className={value === 2 ? 'activetabs' : "tabSections"}
                     onClick={() => handleChange('Docisn Patients')}>
                        <span id="pharma">Docisn Patients</span>
                    </div>
                    <div id="13402" className={value === 3 ? 'activetabs' : "tabSections"}
                     onClick={() => handleChange('Docisn Clinic')}>
                        <span id="labs">Docisn Clinic</span></div>
                    <div id="13403" className={value === 4 ? 'activetabs' : "tabSections"}
                     onClick={() => handleChange('Docisn Laboratory')}>
                        <span id="clinics">Docisn Laboratory</span></div>
                        <div id="13403" className={value === 5 ? 'activetabs' : "tabSections"}
                     onClick={() => handleChange('Docisn Rx')}>
                        <span id="clinics">Docisn Rx</span></div>
                </div>
            </div>

            <div className='row'>
                <div id="15855" className="col-lg-3 col-md-3 col-6">
                    <Card className="cards" id="m-card">
                        <div id="15820" className="d-flex">
                            <div id="15821" className="flex-grow-1">
                                <div>
                                    {value === 0 && <h5 id="h-vcount">{docsinWebPendingcomplaintsCount}</h5>}
                                    {value === 1 && <h5 id="h-vcount">{docsinAppPendingcomplaintsCount}</h5>}
                                    {value === 2 && <h5 id="h-vcount">{patientsPendingcomplaintsCount}</h5>}
                                    {value === 3 && <h5 id="h-vcount">{clinicalPendingcomplaintsCount}</h5>}
                                    {value === 4 && <h5 id="h-vcount">{labPendingcomplaintsCount}</h5>}
                                    {value === 5 && <h5 id="h-vcount">{pharmaPendingcomplaintsCount}</h5>}
                                    <div id="15823" >Pending</div>
                                </div>
                            </div>
                            <div>
                                <span>
                                    <img id="1501346" src="../images/podium.png"
                                        className="iconbackground" alt='podium' />
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
                <div id="15819" className="col-lg-3 col-md-3 col-6">
                    <Card className="cards" id="m-card">
                        <div id="15820" className="d-flex">
                            <div id="15821" className="flex-grow-1">
                                <div>
                                    {value === 0 && <h5 id="h-vcount">{docsinWebResolvedcomplaintsCount}</h5>}
                                    {value === 1 && <h5 id="h-vcount">{docsinAppResolvedcomplaintsCount}</h5>}
                                    {value === 2 && <h5 id="h-vcount">{patientsResolvedcomplaintsCount}</h5>}
                                    {value === 3 && <h5 id="h-vcount">{clinicalResolvedcomplaintsCount}</h5>}
                                    {value === 4 && <h5 id="h-vcount">{labResolvedcomplaintsCount}</h5>}
                                    {value === 5 && <h5 id="h-vcount">{pharmaResolvedcomplaintsCount}</h5>}
                                    <div id="15823" >Resolved </div>
                                </div>
                            </div>
                            <div>
                                <span>
                                    <img id="1501346" src="../images/verify.png"
                                        className="vereifyiconbackground" alt='verification' />
                                </span>
                            </div>
                        </div>
                    </Card>

                </div>
                <div id="15831" className="col-lg-3 col-md-3 col-6">
                    <Card className="cards" id="m-card">
                        <div id="15820" className="d-flex">
                            <div id="15821" className="flex-grow-1">
                                <div>
                                    {value === 0 && <h5 id="h-vcount">{docsinWebInvalidcomplaintsCount}</h5>}
                                    {value === 1 && <h5 id="h-vcount">{docsinAppInvalidcomplaintsCount}</h5>}
                                    {value === 2 && <h5 id="h-vcount">{patientsInvalidcomplaintsCount}</h5>}
                                    {value === 3 && <h5 id="h-vcount">{clinicalInvalidcomplaintsCount}</h5>}
                                    {value === 4 && <h5 id="h-vcount">{labInvalidcomplaintsCount}</h5>}
                                    {value === 5 && <h5 id="h-vcount">{pharmaInvalidcomplaintsCount}</h5>}
                                    <div id="15823" >Invalid</div>
                                </div>
                            </div>
                            <div>
                                <span>
                                    <img id="1501346" src="../images/reject.png"
                                        className="rejecticonbackground" alt='reject' />
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
                {/* <div id="15843" className="col-lg-3 col-md-3 col-6">
                <Card className="cards" id="m-card">
                        <div id="15820" className="d-flex">
                            <div id="15821" className="flex-grow-1">
                                <div>
                                {value === 0 &&  <h5 id="h-vcount">--</h5>}
                                {value === 1 &&  <h5 id="h-vcount">{rejectedClinicsCount}</h5>}
                                {value === 2 &&  <h5 id="h-vcount">{rejectedLabProfilesCount}</h5>}
                                {value === 3 &&  <h5 id="h-vcount">--</h5>}
                                {value === 2 &&  <h5 id="h-vcount">{totalLabProfilesCount}</h5>}
                                {value === 3 &&  <h5 id="h-vcount">{clinicalPendingcomplaintsCount}</h5>}
                                    <div id="15823" >Rejected</div>
                                </div>
                            </div>
                            <div>
                            <span>
                            <img id="1501346" src="../images/rejected.png"
                                className="rejectediconbackground" alt='rejected' />
                            </span>
                            </div>
                        </div>
                    </Card>
                </div> */}

            </div>
            <div className="maingriddetails">
                <div>
                    {value === 0 && <h5 id="h-vcount">Docisn Plus Web Complaints</h5>}
                    {value === 1 && <h5 id="h-vcount">Docisn Plus App Complaints</h5>}
                    {value === 2 && <h5 id="h-vcount">Docisn Patients Complaints</h5>}
                    {value === 3 && <h5 id="h-vcount">Docisn Clinic  Complaints</h5>}
                    {value === 4 && <h5 id="h-vcount">Docsin Laboratory Complaints</h5>}
                    {value === 5 && <h5 id="h-vcount">Docisn rx Complaints</h5>}
                </div>

                <div className='row stats-card gridview'>

                    <div id="13941" className="row table-header user-heading d-flex">
                        <div id="13942" className="col-1 heading-label table-header-text index">#</div>
                        <div id="13942" className="col-2 heading-label table-header-text">DATE</div>
                        <div id="13943" className="col-2 heading-id-label table-header-text">RAISED BY</div>
                        <div id="13944" className="col-3 heading-label table-header-text">SUBJECT</div>
                        <div id="13945" className="col-2 heading-label table-header-text">STATUS</div>
                        <div id="13948" className="col-2 heading-actions table-header-text">Actions</div>
                    </div>

                    {docisnWebComplaintsList.length > 0 && docisnWebComplaintsList.map((complaint, index) => (
                        <div key={index} className="row user-detailss d-flex card-body">
                            <div id="13952" className="col-1 d-flex index">
                                {index + 1}
                            </div>
                            <div id="13952" className="col-2 d-flex">
                                <div id="13954" className="user-name table-data-text">{moment(new Date(complaint.createdOn)).format("DD/MM/YYYY")}</div>
                            </div>
                            <div id="13956" className="col-2 user-mobile table-data-text">{complaint.providerName}</div>

                            <div id="13958" className="col-3 user-email table-data-text">{complaint.title}</div>
                            <div id="13959" className="col-2 user-email table-data-text">
                                {
                                    complaint.status === 'ISSUE_RESOLVED' ?
                                        <span className='showresolved'>Resolved</span> : ('')
                                }
                                {
                                    complaint.status === 'IN_PROGRESS' ?
                                        <span className='showinprogess'>In Progress</span> : ('')
                                }
                                {
                                    complaint.status === 'COMPLAINT_RECIEVED' ?
                                        <span className='showcomplaintrecieved'>Recieved</span> : ('')
                                }
                                {
                                    complaint.status === 'INVALID_ISSUE' ?
                                        <span className='showinvalidissue'>Invalid</span> : ('')
                                }

                            </div>
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
                        <div key={index} className="row user-detailss d-flex card-body">
                            <div id="13952" className="col-1 d-flex index" >
                                {index + 1}
                            </div>
                            <div id="13952" className="col-2 d-flex">
                                <div id="13954" className="user-name table-data-text">{moment(new Date(complaint.createdOn)).format("DD/MM/YYYY")}</div>
                            </div>
                            <div id="13956" className="col-2 user-mobile table-data-text">{complaint.providerName}</div>

                            <div id="13958" className="col-3 user-email table-data-text">{complaint.title}</div>
                            <div id="13959" className="col-2 user-email table-data-text">
                                {
                                    complaint.status === 'ISSUE_RESOLVED' ?
                                        <span className='showresolved'>Resolved</span> : ('')
                                }
                                {
                                    complaint.status === 'IN_PROGRESS' ?
                                        <span className='showinprogess'>In Progress</span> : ('')
                                }
                                {
                                    complaint.status === 'COMPLAINT_RECIEVED' ?
                                        <span className='showcomplaintrecieved'>Recieved</span> : ('')
                                }
                                {
                                    complaint.status === 'INVALID_ISSUE' ?
                                        <span className='showinvalidissue'>Invalid</span> : ('')
                                }
                            </div>
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
                        <div key={index} className="row user-detailss d-flex card-body">
                            <div id="13952" className="col-1 d-flex index">
                                {index + 1}
                            </div>
                            <div id="13952" className="col-2 d-flex">
                                <div id="13954" className="user-name table-data-text">{moment(new Date(complaint.createdOn)).format("DD/MM/YYYY")}</div>
                            </div>
                            <div id="13956" className="col-2 user-mobile table-data-text">{complaint.providerName}</div>

                            <div id="13958" className="col-3 user-email table-data-text">{complaint.title}</div>
                            <div id="13959" className="col-2 user-email table-data-text">
                                {
                                    complaint.status === 'ISSUE_RESOLVED' ?
                                        <span className='showresolved'>Resolved</span> : ('')
                                }
                                {
                                    complaint.status === 'IN_PROGRESS' ?
                                        <span className='showinprogess'>In Progress</span> : ('')
                                }
                                {
                                    complaint.status === 'COMPLAINT_RECIEVED' ?
                                        <span className='showcomplaintrecieved'>Recieved</span> : ('')
                                }
                                {
                                    complaint.status === 'INVALID_ISSUE' ?
                                        <span className='showinvalidissue'>Invalid</span> : ('')
                                }
                            </div>
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
                        <div key={index} className="row user-detailss d-flex card-body">
                            <div id="13952" className="col-1 d-flex index">
                                {index + 1}
                            </div>
                            <div id="13952" className="col-2 d-flex">
                                <div id="13954" className="user-name table-data-text">{moment(new Date(complaint.createdOn)).format("DD/MM/YYYY")}</div>
                            </div>
                            <div id="13956" className="col-2 user-mobile table-data-text">{complaint.providerName}</div>

                            <div id="13958" className="col-3 user-email table-data-text">{complaint.title}</div>
                            <div id="13959" className="col-2 user-email table-data-text">
                                {
                                    complaint.status === 'ISSUE_RESOLVED' ?
                                        <span className='showresolved'>Resolved</span> : ('')
                                }
                                {
                                    complaint.status === 'IN_PROGRESS' ?
                                        <span className='showinprogess'>In Progress</span> : ('')
                                }
                                {
                                    complaint.status === 'COMPLAINT_RECIEVED' ?
                                        <span className='showcomplaintrecieved'>Recieved</span> : ('')
                                }
                                {
                                    complaint.status === 'INVALID_ISSUE' ?
                                        <span className='showinvalidissue'>Invalid</span> : ('')
                                }</div>
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
                        <div key={index} className="row user-detailss d-flex card-body">
                            <div id="13952" className="col-1 d-flex index">
                                {index + 1}
                            </div>
                            <div id="13952" className="col-2 d-flex">
                                <div id="13954" className="user-name table-data-text">{moment(new Date(complaint.createdOn)).format("DD/MM/YYYY")}</div>
                            </div>
                            <div id="13956" className="col-2 user-mobile table-data-text">{complaint.providerName}</div>

                            <div id="13958" className="col-3 user-email table-data-text">{complaint.title}</div>
                            <div id="13959" className="col-2 user-email table-data-text">
                                {
                                    complaint.status === 'ISSUE_RESOLVED' ?
                                        <span className='showresolved'>Resolved</span> : ('')
                                }
                                {
                                    complaint.status === 'IN_PROGRESS' ?
                                        <span className='showinprogess'>In Progress</span> : ('')
                                }
                                {
                                    complaint.status === 'COMPLAINT_RECIEVED' ?
                                        <span className='showcomplaintrecieved'>Recieved</span> : ('')
                                }
                                {
                                    complaint.status === 'INVALID_ISSUE' ?
                                        <span className='showinvalidissue'>Invalid</span> : ('')
                                }
                            </div>
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
                        <div key={index} className="row user-detailss d-flex card-body">
                            <div id="13952" className="col-1 d-flex index">
                                {index + 1}
                            </div>
                            <div id="13952" className="col-2 d-flex">
                                <div id="13954" className="user-name table-data-text">{moment(new Date(complaint.createdOn)).format("DD/MM/YYYY")}</div>
                            </div>
                            <div id="13956" className="col-2 user-mobile table-data-text">{complaint.providerName}</div>

                            <div id="13958" className="col-3 user-email table-data-text">{complaint.title}</div>
                            <div id="13959" className="col-2 user-email table-data-text">
                                {
                                    complaint.status === 'ISSUE_RESOLVED' ?
                                        <span className='showresolved'>Resolved</span> : ('')
                                }
                                {
                                    complaint.status === 'IN_PROGRESS' ?
                                        <span className='showinprogess'>In Progress</span> : ('')
                                }
                                {
                                    complaint.status === 'COMPLAINT_RECIEVED' ?
                                        <span className='showcomplaintrecieved'>Recieved</span> : ('')
                                }
                                {
                                    complaint.status === 'INVALID_ISSUE' ?
                                        <span className='showinvalidissue'>Invalid</span> : ('')
                                }
                            </div>
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

export default NewComplaints;