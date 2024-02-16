import React, { useEffect, useState } from "react";
import ScreeningHeader from "./screening-header";
import '../../App.css';
import '../../Styles/screening.css';
import { getPatientScreeningDetailsAPI } from '../../services/patientScreeningSrv';
import ScreeningHOPI from "./ScreeningHOPI";
import ScreeningVitals from "./ScreeningVitals";
import ScreeningOverview from "./ScreeningOverview";

const Screening = () => {
    const [appoinmentType, setappoinmentType] = useState('');
    const [appointmentID, setappointmentID] = useState('');
    const [specialization, setspecialization] = useState('');
    const [regNo, setRegNo] = useState('');
    const [hopiSelected, sethopiSelected] = useState(false);
    const [vitalsSelected, setvitalsSelected] = useState(false);
    const [overviewSelected, setoverviewSelected] = useState(false);

    useEffect(() => {
        setappoinmentType(sessionStorage.getItem('appoinmentType'));
        setappointmentID(sessionStorage.getItem('AppointmentID'));
        console.log(appointmentID, specialization, appoinmentType, "appoinmentType")
        setspecialization(JSON.parse(sessionStorage.getItem('specilization')));
        getPatientScreeningDetails(appointmentID);
    }, [appointmentID])

    const getPatientScreeningDetails = async (appointmentID) => {

        if (appointmentID) {
            // debugger;
            const getPatientScreeningDetailsRes = await getPatientScreeningDetailsAPI(appointmentID);
            console.log("getPatientScreeningDetailsRes", getPatientScreeningDetailsRes);
            setRegNo(getPatientScreeningDetailsRes.appointmentDetails[0].clinicRegNo)
        }
    };

    const selectTab = (value) => {
        sethopiSelected(false);
        setvitalsSelected(false);
        setoverviewSelected(false);
        switch (value) {
            case "HOPI":
                sethopiSelected(true);
                break;
            case "VITALS":
                setvitalsSelected(true);
                break;
            case "OVERVIEW":
                setoverviewSelected(true);
                break;
            default:
                // Handle default case if needed
                break;
        }
    }
    return (
        <div className="row">
            <div className="col-12">
                {regNo && <ScreeningHeader regNo={regNo} />}

            </div>
            <div className="col-12 screening-mainPage">
                <div className="row">
                    <div className=""></div>
                </div>
                <div className="row">
                    <div className="screening-sidebar">
                        <div className="screening-tabs-row">
                            <div onClick={() => selectTab('HOPI')}
                                className={hopiSelected ? 'screening-tab-list activeTab' : 'screening-tab-list'}>
                                {
                                    hopiSelected ? (
                                        <img src="../images/screening-images/Hopi-Icon-Active.png"
                                            className="screening-tab-icon" alt="hopi-active-icon" />
                                    ) : (
                                        <img src="../images/screening-images/reason for visit-Icon.png"
                                            className="screening-tab-icon" alt="hopi-icon" />
                                    )
                                }


                                <span className="screening-tab-text">Reason for Visit</span>
                            </div>
                            <div onClick={() => selectTab('VITALS')}
                                className={vitalsSelected ? 'screening-tab-list activeTab' : 'screening-tab-list'}>
                                {
                                    vitalsSelected ? (
                                        <img src="../images/screening-images/vitals-Icon-active.svg"
                                            className="screening-tab-icon" alt="vitals-active-icon" />
                                    ) : (
                                        <img src="../images/screening-images/vitals-Icon.svg"
                                            className="screening-tab-icon" alt="vitals-icon" />
                                    )
                                }


                                <span className="screening-tab-text">Vitals</span>
                            </div>
                            <div onClick={() => selectTab('OVERVIEW')}
                                className={overviewSelected ? 'screening-tab-list activeTab' : 'screening-tab-list'}>
                                {
                                    overviewSelected ? (
                                        <img src="../images/screening-images/overview-Active-Icon.svg"
                                            className="screening-tab-icon" alt="overview-active-icon" />
                                    ) : (
                                        <img src="../images/screening-images/Overview-Icon.svg"
                                            className="screening-tab-icon" alt="overview-icon" />
                                    )
                                }


                                <span className="screening-tab-text">Overview</span>
                            </div>
                        </div>
                    </div>
                    <div className="screening-maincontent">
                        {
                            hopiSelected ? (
                                <ScreeningHOPI />
                            ) : ''
                        }
                        {
                            vitalsSelected ? (
                                <ScreeningVitals />
                            ) : ''
                        }
                        {
                            overviewSelected ? (
                                <ScreeningOverview />
                            ) : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Screening;