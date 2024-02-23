import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../../Styles/Admin-verifications.css';
import Card from '@mui/material/Card';
import { getVerificationStats, getAllUnverifiedProfiles } from '../../services/adminportalService';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AdminLabDetails from '../Admin/Admin-LabDetails';
import AdminSelectedDoctorDetails from '../Admin/Admin-SelectedDoctorDetails';
import VisibilityIcon from '@material-ui/icons/Visibility';
// import Modal from 'react-modal';


function NewVerifications() {

    const [verifiedDoctorsCount, setVerifiedDoctorsCount] = useState([]);
    const [unVerifiefDoctorsCount, setunVerifiefDoctorsCount] = useState([]);
    const [rejectedDoctorsCount, setrejectedDoctorsCount] = useState([]);
    const [totalDoctorsCount, settotalDoctorsCount] = useState([]);
    const [verifiedClinicsCount, setverifiedClinicsCount] = useState([]);
    const [unVerifiedClinicsCount, setunVerifiedClinicsCount] = useState([]);
    const [rejectedClinicsCount, setrejectedClinicsCount] = useState([]);
    const [totalClinicProfilesCount, settotalClinicProfilesCount] = useState([]);
    const [verifiedLabProfilesCount, setverifiedLabProfilesCount] = useState([]);
    const [unVerifiedLabProfilesCount, setunVerifiedLabProfilesCount] = useState([]);
    const [rejectedLabProfilesCount, setrejectedLabProfilesCount] = useState([]);
    const [totalLabProfilesCount, settotalLabProfilesCount] = useState([]);
    const [verifiedPharmacyProfiles, setverifiedPharmacyProfiles] = useState([]);
    const [totalPharmacyCount, settotalPharmacyCount] = useState([]);
    const [value, setValue] = useState(0);
    const [clinicUnverifiedList, setClinicUnverifiedList] = useState([]);
    const [doctorsUnverifiedList, setDoctorsUnverifiedList] = useState([]);
    const [labsUnverifiedList, setLabsUnverifiedList] = useState([]);
    const [pharmacyUnverifiedList, setPharmacyUnverifiedList] = useState([]);
    const [isLabDetailsOpen, setIsLabDetailsOpen] = useState(false);
    const [selectedLab, setSelectedLab] = useState(null);
    const [isDoctorDetailsOpen, setIsDoctorDetailsOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const viewLabDetails = (lab) => {
        // debugger;
        console.log("labdetails", lab)
        setSelectedLab(lab);
        setIsLabDetailsOpen(true);
    }

    const viewDoctorDetails = (doctor) => {
        // debugger;
        console.log("doctordetails", doctor)
        setSelectedDoctor(doctor);
        setIsDoctorDetailsOpen(true);
    }
    const closeAllModals = () => {
        setIsLabDetailsOpen(false);
        setSelectedLab(null);
        setSelectedDoctor(null);
        setIsDoctorDetailsOpen(false);
        getStats();
        unverifiedProfiles();
        // debugger;
    };

    const getStats = async () => {
        try {
            const response = await getVerificationStats();
            console.log(response);
            setVerifiedDoctorsCount(response.doctors.verifiedDoctorsCount);
            setunVerifiefDoctorsCount(response.doctors.unVerifiefDoctorsCount);
            setrejectedDoctorsCount(response.doctors.rejectedDoctorsCount);
            settotalDoctorsCount(response.doctors.totalDoctorsCount);
            setverifiedClinicsCount(response.clinicProfiles.verifiedClinicsCount);
            setunVerifiedClinicsCount(response.clinicProfiles.unVerifiedClinicsCount);
            setrejectedClinicsCount(response.clinicProfiles.rejectedClinicsCount);
            settotalClinicProfilesCount(response.clinicProfiles.totalClinicProfilesCount);
            setverifiedLabProfilesCount(response.labProfiles.verifiedLabProfilesCount);
            setunVerifiedLabProfilesCount(response.labProfiles.unVerifiedLabProfilesCount);
            setrejectedLabProfilesCount(response.labProfiles.rejectedLabProfilesCount);
            settotalLabProfilesCount(response.labProfiles.totalLabProfilesCount);
            setverifiedPharmacyProfiles(response.pharmacy.verifiedPharmacyProfiles);
            settotalPharmacyCount(response.pharmacy.totalPharmacyCount);
            // debugger;
        } catch (error) {
            console.error('Error fetching doctor profile:', error);
        }
    };

    const unverifiedProfiles = async () => {
        try {
            const data = await getAllUnverifiedProfiles();
            setDoctorsUnverifiedList([]);
            setClinicUnverifiedList([]);
            setLabsUnverifiedList([]);
            setPharmacyUnverifiedList([]);
            // Use functional update to ensure working with the latest state
            setClinicUnverifiedList(prevList => [...prevList, ...data.clinicList]);
            setDoctorsUnverifiedList(prevList => [...prevList, ...data.doctorsList]);
            setLabsUnverifiedList(prevList => [...prevList, ...data.labProfiles]);
            setPharmacyUnverifiedList(prevList => [...prevList, ...data.pharmacyProfileList]);
            console.log("unverifiedProfiles", data);
        } catch (error) {
            console.error('Error fetching unverified profiles:', error);
        }
    }

    useEffect(() => {
        getStats();
    }, []);

    useEffect(() => {
        unverifiedProfiles();
    }, []);
    return (
        <div id="15818" className="row matop">
            <div className='row '>
            
                {/* <Tabs value={value} onChange={handleChange} className="Tabs" >
                    <Tab className={value === 0 ? "selected-tab" : "tab"} label={<span><img id="doctorImg" className="lineimg" src={value === 0 ? "../images/line.png" : ""} /> <img id="doctorImg" className="tabimg" src={value === 0 ? "../images/activemedical.svg" : "../images/medical.png"} alt='Doctor' />
                        <span className={value === 0 ? "selected-text" : "tabtext"}>Doctor</span></span>} />
                    <Tab className={value === 1 ? "selected-tab" : "tab"} label={<span><img id="doctorImg" className="lineimg" src={value === 1 ? "../images/line.png" : ""} /><img id="clinicImg" className="tabimg" src={value === 1 ? "../images/activehospital.png" : "../images/hospital.png"} alt='Clinic' />
                        <span className={value === 1 ? "selected-text" : "tabtext"}>Clinic</span></span>} />
                    <Tab className={value === 2 ? "selected-tab" : "tab"} label={<span><img id="doctorImg" className="lineimg" src={value === 2 ? "../images/line.png" : ""} /><img id="labImg" className="tabimg" src={value === 2 ? "../images/activelab.png" : "../images/lab.png"} alt='Laboratory' />
                        <span className={value === 2 ? "selected-text" : "tabtext"}>Laboratory</span></span>} />
                    <Tab className={value === 3 ? "selected-tab" : "tab"} label={<span><img id="doctorImg" className="lineimg" src={value === 3 ? "../images/line.png" : ""} /><img id="pharmacyImg" className="tabimg" src={value === 3 ? "../images/activepharmacy.png" : "../images/pharmacy.png"} alt='Pharmacy' />
                        <span className={value === 3 ? "selected-text" : "tabtext"}>Pharmacy</span></span>} />
                </Tabs> */}
                     <Tabs value={value} onChange={handleChange} className="vTabs" >
                    <Tab className={value === 0 ? "vselected-tab" : "vtab"} label={<span className={value === 0 ? "vselected-text" : "vtabtext"}>Doctor</span>} />
                    <Tab className={value === 1 ? "vselected-tab" : "vtab"} label={<span className={value === 1 ? "vselected-text" : "vtabtext"}>Clinic</span>} />
                    <Tab className={value === 2 ? "vselected-tab" : "vtab"} label={<span className={value === 2 ? "vselected-text" : "vtabtext"}>Laboratory</span>} />
                    <Tab className={value === 3 ? "vselected-tab" : "vtab"} label={<span className={value === 3 ? "vselected-text" : "vtabtext"}>Pharmacy</span>} />
                </Tabs>
            </div>
            <div className='row'>
                <div id="15855" className="col-lg-3 col-md-3 col-6">
                    <Card className="cards" id="m-card">
                        <div id="15820" className="d-flex">
                            <div id="15821" className="flex-grow-1">
                                <div>
                                    {value === 0 && <h5 id="h-vcount">{totalDoctorsCount}</h5>}
                                    {value === 1 && <h5 id="h-vcount">{totalClinicProfilesCount}</h5>}
                                    {value === 2 && <h5 id="h-vcount">{totalLabProfilesCount}</h5>}
                                    {value === 3 && <h5 id="h-vcount">{totalPharmacyCount}</h5>}
                                    <div id="15823" className='totaltext'>Total</div>
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
                                    {value === 0 && <h5 id="h-vcount">{verifiedDoctorsCount}</h5>}
                                    {value === 1 && <h5 id="h-vcount">{verifiedClinicsCount}</h5>}
                                    {value === 2 && <h5 id="h-vcount">{verifiedLabProfilesCount}</h5>}
                                    {value === 3 && <h5 id="h-vcount">{verifiedPharmacyProfiles}</h5>}
                                    <div id="15823" className='verifiedtext'>Verified </div>
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
                                    {value === 0 && <h5 id="h-vcount">{unVerifiefDoctorsCount}</h5>}
                                    {value === 1 && <h5 id="h-vcount">{unVerifiedClinicsCount}</h5>}
                                    {value === 2 && <h5 id="h-vcount">{unVerifiedLabProfilesCount}</h5>}
                                    {value === 3 && <h5 id="h-vcount">0</h5>}
                                    <div id="15823" className='unverifiedtext'>Unverified</div>
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
                <div id="15843" className="col-lg-3 col-md-3 col-6">
                    <Card className="cards" id="m-card">
                        <div id="15820" className="d-flex">
                            <div id="15821" className="flex-grow-1">
                                <div>
                                    {value === 0 && <h5 id="h-vcount">{rejectedDoctorsCount}</h5>}
                                    {value === 1 && <h5 id="h-vcount">{rejectedClinicsCount}</h5>}
                                    {value === 2 && <h5 id="h-vcount">{rejectedLabProfilesCount}</h5>}
                                    {value === 3 && <h5 id="h-vcount">0</h5>}
                                    <div id="15823" className='rejectedtext'>Rejected</div>
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
                </div>

            </div>
            <div className="maingriddetails">
                <div>
                    {value === 0 && <h5 id="h-vcount">Pending Doctor Profiles</h5>}
                    {value === 1 && <h5 id="h-vcount">Pending Clinic Profiles</h5>}
                    {value === 2 && <h5 id="h-vcount">Pending Laboratory Profiles</h5>}
                    {value === 3 && <h5 id="h-vcount">Pending Pharmacy Profiles</h5>}
                </div>


                <div className='row stats-card gridview'>
                    {value === 0 && (
                        <div id="13941" className="row table-header user-headings d-flex">
                            <div id="13942" className="col-2 heading-label table-header-text">Doctor Name</div>
                            <div id="13943" className="col-2 heading-id-label table-header-text">Specialization</div>
                            <div id="13944" className="col-2 heading-label table-header-text">MOBILE</div>
                            <div id="13945" className="col-2 heading-label table-header-text">Experience</div>
                            <div id="13946" className="col-2 heading-label table-header-text">City</div>
                            <div id="13948" className="col-2 heading-actions table-header-text">Actions</div>
                        </div>
                    )}

                    {value === 0 && doctorsUnverifiedList.map((doctor, index) => (
                        <div key={index} className="row user-detailss d-flex card-body">
                            <div id="13952" className="col-2 d-flex">
                                <div id="13954" className="user-name table-data-text">{doctor.firstName} {doctor.lastName}</div>
                            </div>
                            <div id="13956" className="col-2 user-mobile table-data-text">{doctor.specialization}</div>
                            <div id="13957" className="col-2 user-email table-data-text">{doctor.phoneNumber}</div>
                            <div id="13958" className="col-2 user-email table-data-text">{doctor.yearsOfExperience} yrs</div>
                            <div id="13959" className="col-2 user-email table-data-text">{doctor.city}</div>
                            <div id="13960" className="col-2 d-flex align-items-center">
                                <a className="viewdetails" onClick={() => viewDoctorDetails(doctor)}>
                                    <img id="1501346" src="../images/eye.png" className="eyeiconview" alt='eyeiconview' />
                                </a>
                                {/* <button className="provider-submit-btn" id="det-btn" onClick={() => viewDoctorDetails(doctor)}>View Details</button> */}
                            </div>
                        </div>
                    ))}

                    {value === 1 && (
                        <div id="13914" className="row table-header user-headings d-flex">
                            <div id="13915" className="col-2 heading-label table-header-text">Clinic Name</div>
                            <div id="13916" className="col-2 heading-id-label table-header-text">Registration No</div>
                            <div id="13917" className="col-2 heading-label table-header-text">Address</div>
                            <div id="13918" className="col-2 heading-label table-header-text">Registered Council</div>
                            <div id="13919" className="col-2 heading-label table-header-text">GST Number</div>
                            <div id="13921" className="col-2 heading-actions table-header-text">Actions</div>
                        </div>
                    )}
                    {value === 1 && clinicUnverifiedList.map((clinic, index) => (
                        <div key={index} className="row user-detailss d-flex card-body">
                            <div id="13925" className="col-2  d-flex">
                                <div id="13927" className="user-name table-data-text">{clinic.clinicName}</div>
                            </div>
                            <div id="13928" className="col-2 user-role table-data-text">{clinic.registrationNumber}</div>
                            <div id="13929" className="col-2 user-mobile table-data-text">{clinic.clinicAddress.address}</div>
                            <div id="13930" className="col-2 user-email table-data-text">{clinic.nameOfCouncil}</div>
                            <div id="13931" className="col-2 user-email table-data-text">{clinic.GSTNumber}</div>
                            
                            <div id="13932" className="col-2 d-flex align-items-center">
                                {/* <button className="provider-submit-btn" id="det-btn">View Details</button> */}
                                <a className="viewdetails" >
                                    <img id="1501346" src="../images/eye.png" className="eyeiconview" alt='eyeiconview' />
                                </a>
                                
                                </div>

                        </div>
                    ))}
                    {value === 2 && (
                        <div id="13969" className="row table-header user-headings d-flex">
                            <div id="13970" className="col-2 table-header-text">Lab Name</div>
                            <div id="13971" className="col-2 table-header-text">Lab License No</div>
                            <div id="13972" className="col-2 table-header-text">MOBILE</div>
                            <div id="13973" className="col-2 table-header-text">Contact Person</div>
                            <div id="13974" className="col-2 table-header-text">Email</div>
                            <div id="13976" className="col-2 table-header-text">Actions</div>
                        </div>
                    )}
                    {value === 2 && labsUnverifiedList.map((lab, index) => (
                        <div key={index} className="row user-detailss d-flex card-body">
                            <div id="13980" className="col-2  d-flex">
                                <div id="13982" className="user-name table-data-text">{lab.labName}</div>
                            </div>
                            <div id="13983" className="col-2 user-role table-data-text">{lab.nablLicenseNumber}</div>
                            <div id="13984" className="col-2 user-mobile table-data-text">{lab.phoneNumber}</div>
                            <div id="13985" className="col-2 user-email table-data-text">{lab.pathologistName}</div>
                            <div id="13987" className="col-2 user-email table-data-text">{lab.email}</div>
                            <div id="13988" className="col-2 d-flex align-items-center">
                                {/* <button onClick={() => viewLabDetails(lab)} className="provider-submit-btn" id="det-btn">View Details</button> */}
                                <a className="viewdetails" onClick={() => viewLabDetails(lab)}>
                                    <img id="1501346" src="../images/eye.png" className="eyeiconview" alt='eyeiconview' />
                                </a>
                            </div>
                        </div>
                    ))}
                    {value === 3 && (
                        <div id="13997" className="row user-headings table-header d-flex">
                            <div id="13998" className="col-2 heading-label table-header-text">Pharmacy Name</div>
                            <div id="13999" className="col-3 heading-id-label table-header-text">Pharmacy License No</div>
                            <div id="14000" className="col-2 heading-label table-header-text">MOBILE</div>
                            <div id="14001" className="col-2 heading-label table-header-text">Timings</div>
                            <div id="14003" className="col-2 heading-actions table-header-text">Actions</div>
                        </div>
                    )}
                    {value === 3 && pharmacyUnverifiedList.map((pharmacy, index) => (
                        <div key={index} className="row user-detailss d-flex card-body">
                            <div id="14007" className="col-2 col-lg-2 d-flex">
                                <div id="14009" className="user-name table-data-text">{pharmacy.pharmacyName}</div>
                            </div>
                            <div id="14010" className="col-3 user-role table-data-text">{pharmacy.licenseNumber}</div>
                            <div id="14011" className="col-2 user-mobile table-data-text">{pharmacy.mobile}</div>
                            <div id="14012" className="col-2 user-email table-data-text">{pharmacy.startTime} - {pharmacy.endTime}</div>
                            <div id="14013" className="col-2 d-flex align-items-center">
                                {/* <button className="provider-submit-btn" id="det-btn">View Details</button> */}
                                <a className="viewdetails" >
                                    <img id="1501346" src="../images/eye.png" className="eyeiconview" alt='eyeiconview' />
                                </a>
                                </div>

                        </div>
                    ))}
                </div>
            </div>

            {
                selectedLab ? (<AdminLabDetails isOpen={isLabDetailsOpen} onClose={closeAllModals} lab={selectedLab} />) : ''
            }
            {
                selectedDoctor ? (<AdminSelectedDoctorDetails isOpen={isDoctorDetailsOpen} onClose={closeAllModals} doctor={selectedDoctor} />) : ''
            }
        </div>

    );
}

export default NewVerifications;