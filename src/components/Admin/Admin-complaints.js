import React, { useEffect, useState, useCallback } from 'react';
import '../../App.css';
import '../../Styles/Admin-complaints.css';
import Card from '@mui/material/Card';
import { getCustomerComplaints, getAssigneeDevlopers, getcomplaintsFrom } from '../../services/adminportalService';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
    // const [assigneeDevlopersList, setAssigneeDevlopersList] = useState([]);
    const [complaintsList, setComplaintsList] = useState([]);
    // const [totalComplaintsCount, setTotalComplaintsCount] = useState([]);
    const [value, setValue] = useState(0);

    const handleChange = useCallback((newValue) => {
        console.log(newValue)
        setValue(newValue);
        let complaintsFrom = "";
        if (newValue === 0) {
            complaintsFrom = "DOCISNPLUSWEB";
        } else if (newValue === 1) {
            complaintsFrom = "DOCISNPLUSAPP";
        } else if (newValue === 2) {
            complaintsFrom = "DOCISNFRONTDESK";
        } else if (newValue === 3) {
            complaintsFrom = "DOCISNAREX";
        } else if (newValue === 4) {
            complaintsFrom = "DOCISNLAB";
        } else if (newValue === 5) {
            complaintsFrom = "DOCISN";
        }
        // debugger;
        getComplaintsList(complaintsFrom);
    }, []);

    useEffect(() => {
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
                    handleChange(0)
                }
            } catch {

            }
        }

        getComplaints();

    }, [handleChange]);

    useEffect(() => {
        const getDevelopers = async () => {
            try {
                const response = await getAssigneeDevlopers();
                console.log("getDevelopers", response);
                // const assigneeDevlopersList = response;
                // setAssigneeDevlopersList(response)
            } catch {

            }
        }
        getDevelopers();
    }, []);



    const getComplaintsList = async (value) => {
        try {
            const complaintsArr = await getcomplaintsFrom(value);
            setComplaintsList(complaintsArr.data);
            // setTotalComplaintsCount(complaintsArr.totalComplaintsCount);
            console.log("complaintsArr", complaintsArr);
            // debugger;
        } catch {

        }
    }
    return (
        <div id="15818" className="row matop">
            <div className='row'>
                <div className="col-lg-3 col-md-3 col-4 stats-card">
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
                <div className="col-lg-3 col-md-3 col-4 stats-card">
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
                <div className="col-lg-3 col-md-3 col-4 stats-card">
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
                <div className="col-lg-3 col-md-3 col-4 stats-card">
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
                <div className="col-lg-3 col-md-3 col-4 stats-card">
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
                <div className="col-lg-3 col-md-3 col-4 stats-card">
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

                {complaintsList.map((complaint, index) => (
                    <div key={index} className="row user-details d-flex card-body">
                        <div id="13952" className="col-2 d-flex">
                            <div id="13954" className="user-name table-data-text">{complaint.createdOn}</div>
                        </div>
                        <div id="13956" className="col-2 user-mobile table-data-text">{complaint.providerName}</div>

                        <div id="13958" className="col-3 user-email table-data-text">{complaint.title}</div>
                        <div id="13959" className="col-3 user-email table-data-text">{complaint.status}</div>
                        <div id="13960" className="col-2 d-flex align-items-center">
                            <button className="btn provider-submit-btn" id="det-btn">View Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Complaints;