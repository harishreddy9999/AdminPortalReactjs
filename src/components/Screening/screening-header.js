import React, { useEffect, useState } from "react";
import { doctorProfilePicAPI } from '../../services/patientScreeningSrv';
import '../../App.css';
import '../../Styles/screening-header.css';


const ScreeningHeader = ({ regNo }) => {

    const [drFirstName, setdrFirstName] = useState('');
    const [drLastName, setdrLastName] = useState('');
    const [doctorSpeciality, setdoctorSpeciality] = useState('');
    const [clinicLogo, setclinicLogo] = useState('');
    const [clinicCity, setclinicCity] = useState('');
    const [clinicName, setclinicName] = useState('');
    const [clinicStreet, setclinicStreet] = useState('');
    const [doctorGender, setdoctorGender] = useState('');
    const [doctorPictureUrl, setdoctorPictureUrl] = useState('');

    useEffect(() => {
        const doctorDetails = JSON.parse(sessionStorage.getItem("user"));
        setdrFirstName(doctorDetails.firstName);
        setdrLastName(doctorDetails.lastName);
        setdoctorSpeciality(doctorDetails.specialization);
        // debugger;
        const selectedClinic = doctorDetails.clinicInformation.filter(t => t.regNo === regNo)[0];
        setclinicLogo(selectedClinic.clinicLogo);
        setclinicCity(selectedClinic.address.city);
        setclinicStreet(selectedClinic.address.street);
        setclinicName(selectedClinic.clinicName);
        setdoctorGender(sessionStorage.getItem("Gender"));
        console.log("clinicLogo", clinicLogo)
        getProfilePic('', 'DOCTOR');
    }, [clinicLogo]);

    const getProfilePic = async () => {
        const doctorProfilePicRes = await doctorProfilePicAPI();
        console.log("doctorProfilePicRes", doctorProfilePicRes);
        if (doctorProfilePicRes.profilePic && doctorProfilePicRes.profilePic.length) {
            setdoctorPictureUrl(doctorProfilePicRes.profilePic);
        }
        else {
            if (doctorGender === "M") {
                setdoctorPictureUrl("../images/maledoctor.png");
            } else if (doctorGender === "F") {
                doctorProfilePicRes("../images/femaledoctor.png");
            } else {
                setdoctorPictureUrl('../images/doctoruser.png');
            }
        }
    }
    return (
        <div className="row">
            <div className="p-0 mat-card" id="card-head">
                <div className="row screening-header" id="header-row">
                    <div className="col-lg-9 col-md-10" id="clinicDetails-div">
                        <div className="row" id="">
                            <div className="col-lg-6 col-md-6 logo-div pt-1" id="clinicLogo-div">
                                <div className="d-flex align-items-center">
                                    {
                                        clinicLogo ? (
                                            <img src={clinicLogo} className="clinic-logo" id="clinicLogo" alt="clinic-logo" />
                                        ) : null
                                    }

                                    <div className="clinic-address">
                                        <div className="clinic-address ps-1">{clinicName}</div>
                                        <p className="clinic-address ps-1" id="clinicAddress">{clinicCity}</p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="col-lg-3 col-md-2 m-0 p-0" id="doc-detais-div">
                        <div className="d-flex" id="doc-detais-flex">
                            <div className="left-border" id="border"></div>
                            <div className="d-flex">
                                <div className="doctor-img-div" id="doc-pic">
                                    <img src={doctorPictureUrl} className="doctor-img" id="profile" alt="doctorPictureUrl" />
                                </div>
                                <div className="Doctor-details" id="doc-detais">
                                    <p className="doctor-name" id="doctor-name"> Dr. {drFirstName + " " + drLastName}</p>
                                    <p className="doc-speciality" id="speciality">{doctorSpeciality[0]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScreeningHeader;