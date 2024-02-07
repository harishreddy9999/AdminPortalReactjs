import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
// import Button from '@mui/material/Button';
import moment from 'moment';
import { withStyles } from '@mui/styles';
import '../../Styles/BookAppointment.css';
import { getClinicsList, showAvailabileTimeSlots, fetchPatient, proceedToPayment } from '../../services/authService';
// import { useState } from 'react';

const styles = (theme) => ({
    dialog: {
        // minWidth: '70%', // Set your minimum width here
        // minHeight: '400px', // Set your minimum height here
        // maxWidth: '600px', // Set your maximum width here
        // maxHeight: '600px', // Set your maximum height here

        minWidth: '70%',
        maxWidth: '80%',
        minHeight: '350px',
        maxHeight: '500px',
    },
});
let rescheduleData = [];
let consultationFee = 0;
let availableSlotsArr = [];
let mainPatientID = "";
let appointmentFor = "";
let familyMemID = "";
const BookAppointmentComponent = ({ open, onCancel, classes }) => {
    const [formData, setFormData] = useState({
        patientName: '',
        appointmentType: 'WALKIN',
        patientGender: '',
        patientAge: '',
        secondaryMobileNumber: '',
        patientDOB: '',
        relationShip: '',
        mobileNumber: '',
        email: '',
        aadharNumber: '',
        appointmentDate: '',
        appointmentTime: '',
        clinicName: '',
        symptoms: [[]]
    });
    let [clinicDetails, setclinicDetails] = useState([]);
    let [selectedClinic, setselectedClinic] = useState("");
    let [selectedDate, setselectedDate] = useState("");
    let [clinicRegNo, setclinicRegNo] = useState("");
    let [availableSlots, setavailableSlots] = useState([]);
    let [fetchPatientData, setfetchPatientData] = useState([]);
    let [disablePatientName, setdisablePatientName] = useState(false);
    let [disableRelation, setdisableRelation] = useState(false);
    let [disableEmail, setdisableEmail] = useState(false);
    let [disablegender, setdisablegender] = useState(false);
    let [disableDob, setdisableDob] = useState(false);
    let [disableAge, setdisableAge] = useState(false);
    let [disableSecondaryNumber, setdisableSecondaryNumber] = useState(false);


    const today = moment(new Date()).format('YYYY-MM-DD');
    const minDate = moment(new Date()).format('YYYY-MM-DD');
    let dte = new Date();
    dte.setDate(dte.getDate() - 1);
    // console.log(dte.toString());
    const maxDOB = moment(dte.toString()).format('YYYY-MM-DD');
    let max = new Date();
    max.setDate(max.getDate() + 15);
    const maxDate = moment(max.toString()).format('YYYY-MM-DD');
    // debugger;
    const providerID = sessionStorage.getItem('providerID');
    // console.log("bookapt", maxDOB, maxDate, today, minDate, providerID);
    useEffect(() => {


        const fetchClinicsList = async () => {
            try {
                const res = await getClinicsList();
                console.log("getClinicsList", res);
                if (res && res.length > 0) {
                    // debugger
                    let clinicNames = [];
                    clinicDetails = [];
                    setclinicDetails([]);
                    clinicNames = res[0].clinicInformation;
                    clinicNames.forEach((el) => {
                        if (el.subscriptionStatus) {
                            clinicDetails.push(el)
                        }
                    });
                    setclinicDetails(clinicDetails);
                    setselectedClinic(clinicDetails[0]._id);
                    setclinicRegNo(clinicDetails[0].regNo);
                    consultationFee = clinicDetails[0].consultationFee
                    setselectedDate(today);
                    setFormData({
                        ...formData,
                        appointmentDate: today,
                        clinicName: clinicDetails[0]._id,
                    });

                    console.log("clinicDetails", clinicDetails, selectedClinic, clinicRegNo, clinicDetails[0]._id, clinicDetails[0].regNo)
                }
            } catch (error) {
                console.error('Error fetching doctor profile:', error);
            }
        };
        fetchClinicsList();
    }, []);

    useEffect(() => {
        if (clinicRegNo || selectedDate) {
            getSlots();
        }
    }, [clinicRegNo, selectedDate]);

    const getSlots = async () => {
        try {
            // let rescheduleData;
            availableSlotsArr = [];
            console.log("getslots", clinicRegNo, selectedDate)
            const res = await showAvailabileTimeSlots(providerID, selectedDate, clinicRegNo);
            // debugger;
            setFormData({
                ...formData,
                appointmentTime: "",
            });
            if (res.hasOwnProperty("message") && res.message == "No slots available") {
                setavailableSlots([]);
                return;
            }
            rescheduleData = res;
            //console.log("rescheduleData", this.rescheduleData)
            if (
                rescheduleData.available == undefined ||
                rescheduleData.available == ''
            ) {
                return;
            }
            rescheduleData.available.forEach((element) => {
                if (rescheduleData.booked.filter((t) => t[0] == element[0]).length == 0) {
                    var dateSet = new Date(selectedDate);
                    dateSet.setHours(element[0].split(':')[0]);
                    dateSet.setMinutes(element[0].split(':')[1]);
                    if (!moment(new Date(), 'HH:mm').isAfter(moment(dateSet, 'HH:mm'))) {
                        let obj = {};
                        obj.value = element[0];
                        obj.time = moment(element[0], ["HH.mm"]).format("hh:mm a");
                        availableSlotsArr.push(obj);
                    }
                }
            });
            setavailableSlots(availableSlotsArr)
            console.log("availableSlots", availableSlots)
        } catch {

        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        // debugger;
        console.log("change", name, value)
        if (name == "mobileNumber") {
            searchWithMobile(value)
        }
        if (name == "appointmentDate") {
            setselectedDate(value);
        }
        if (name == "clinicName") {
            const clinicSelected = clinicDetails.filter((t) => t._id == value)[0];
            consultationFee = clinicSelected.consultationFee;
            setselectedClinic(clinicSelected._id);
            setclinicRegNo(clinicSelected.regNo);
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const searchWithMobile = async (value) => {
        if (value != undefined) {
            if (value.length == 0) {
                //   this.showPatients = false
            }
        }
        if (value && value.length == 10) {
            // debugger;
            let fetchPatientDataArr = [];
            const data = await fetchPatient(value);
            if (data.primaryUserDetails.length > 0) {
                let obj = {};
                obj.email = data.primaryUserDetails[0].email;
                obj.phoneNumber = data.primaryUserDetails[0].phoneNumber;
                obj.mainUserID = data.primaryUserDetails[0]._id;
                obj.name = data.primaryUserDetails[0].demographicInfo.firstName + " " + data.primaryUserDetails[0].demographicInfo.lastName;
                obj.relation = "SELF";
                obj.aadharNumber = data.primaryUserDetails[0].demographicInfo.aadharNumber;
                obj.gender = data.primaryUserDetails[0].demographicInfo.gender;
                if (data.primaryUserDetails[0].demographicInfo.hasOwnProperty("dOB")) {
                    obj.dOB = moment(data.primaryUserDetails[0].demographicInfo.dOB).format("YYYY-MM-DD");
                }
                else {
                    obj.dOB = "";
                }
                obj.familyMemberID = "";
                fetchPatientDataArr.push(obj);
            }
            if (data.famMembers.length > 0) {
                for (var i = 0; i < data.famMembers.length; i++) {
                    let obj = {};
                    obj.email = data.famMembers[i].email;
                    obj.phoneNumber = data.famMembers[i].phoneNumber;
                    obj.mainUserID = data.famMembers[i].mainUserID;
                    obj.name = data.famMembers[i].name;
                    obj.relation = data.famMembers[i].relation;
                    obj.gender = data.famMembers[i].gender;
                    obj.dOB = data.famMembers[i].dOB;
                    obj.aadharNumber = "";
                    if (data.famMembers[i].hasOwnProperty("aadharNumber")) {
                        obj.aadharNumber = data.famMembers[i].aadharNumber;
                    }
                    obj.familyMemberID = data.famMembers[i].familyMemberID;
                    fetchPatientDataArr.push(obj);
                }

            }
            if (data.primaryUserDetails.length > 0) {
                let obj = {};
                obj.email = "";
                obj.phoneNumber = "";
                obj.mainUserID = data.primaryUserDetails[0]._id;
                obj.name = "";
                obj.relation = "Add new family memebers";
                obj.familyMemberID = "";
                fetchPatientDataArr.push(obj);
            }
            console.log("fetchPatientDataArr", fetchPatientDataArr)
            setfetchPatientData(fetchPatientDataArr);
        } else {
            console.log("value10")
            setdisablePatientName(false);
            setdisableRelation(false);
            setdisableEmail(false);
            setdisablegender(false);
            setdisableDob(false);
            setdisableAge(false);
            setdisableSecondaryNumber(false);
            setFormData({
                ...formData,
                patientName: '',
                patientGender: '',
                patientAge: '',
                secondaryMobileNumber: '',
                patientDOB: '',
                relationShip: '',
                email: '',
                aadharNumber: '',

            });
            console.log("value10", formData);

        }
    };

    const selectMember = async (x) => {
        console.log("selectMember", x)
        const selectedPatientDetails = x;
        setfetchPatientData([]);

        console.log("selectedPatientDetails", selectedPatientDetails)
        if (x.relation == "SELF") {
            // debugger;
            mainPatientID = "";
            setFormData({
                ...formData,
                patientName: x.name !== "" ? x.name : "",
                email: x.email !== "" ? x.email : "",
                patientGender: x.gender !== "" ? x.gender : "",
                patientDOB: x.dOB !== "" ? x.dOB : "",
                aadharNumber: x.aadharNumber !== "" ? x.aadharNumber : "",
                relationShip: "SELF"
            });
            setdisablePatientName(x.name !== "" ? true : false);
            setdisableRelation(true);
            setdisableEmail(x.email !== "" ? true : false);
            setdisablegender(x.gender !== "" ? true : false);
            setdisableDob(x.dOB !== "" ? true : false);
            setdisableAge(x.dOB !== "" ? true : false);
            setdisableSecondaryNumber(true);
        } else if (x.relation == "Add new family memebers") {
            mainPatientID = x.mainUserID;
            appointmentFor = "others";
            setFormData({
                ...formData,
                patientName: '',
                patientGender: '',
                patientAge: '',
                secondaryMobileNumber: '',
                patientDOB: '',
                relationShip: '',
                email: '',
                aadharNumber: '',

            });
            setdisablePatientName(false);
            setdisableRelation(false);
            setdisableEmail(false);
            setdisablegender(false);
            setdisableDob(false);
            setdisableAge(false);
            setdisableSecondaryNumber(false);
        } else {
            mainPatientID = x.mainUserID;
            appointmentFor = "family";
            familyMemID = x.familyMemberID;
            setFormData({
                ...formData,
                patientName: x.name !== "" ? x.name : "",
                email: x.email !== "" ? x.email : "",
                patientGender: x.gender !== "" ? x.gender : "",
                patientDOB: x.dOB !== null ? moment(new Date(x.dOB)).format("YYYY-MM-DD") : "",
                aadharNumber: x.aadharNumber !== "" ? x.aadharNumber : "",
                relationShip: x.relation !== "" ? x.relation : "",
                secondaryMobileNumber: x.phoneNumber
            });
            setdisablePatientName(x.name !== "" ? true : false);
            setdisableRelation(x.relationShip !== "" ? true : false);
            setdisableEmail(x.email !== "" ? true : false);
            setdisablegender(x.gender !== "" ? true : false);
            setdisableDob(x.dOB !== "" ? true : false);
            setdisableAge(x.dOB !== "" ? true : false);
            setdisableSecondaryNumber(x.phoneNumber !== "" ? true : false);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        // console.log(formData);
    };

    const bookAppointmentV2 = async (value) => {
        // debugger;

        const formValues = { ...formData };
        console.log("formData", formData, formValues, rescheduleData, mainPatientID);
        const slot_ends = rescheduleData.available.filter((t) => t[0] == formValues.appointmentTime)[0];
        let reqObj = {};
        if (mainPatientID !== "") {
            reqObj = {
                consultationFee: consultationFee,
                briefExplanation: "",
                appointmentType: formValues.appointmentType,
                date: formValues.appointmentDate,
                slot_starts: formValues.appointmentTime,
                slot_ends: slot_ends[1],
                clinicID: formValues.clinicName,
                clinicRegNo: clinicRegNo,
                email: formValues.email,
                phoneNumber: formValues.mobileNumber,
                name: formValues.patientName,
                mainPatientID: mainPatientID,
                familyMemberID: familyMemID,
                relation: formValues.relationShip,
                appointmentFor: appointmentFor,
                gender: formValues.patientGender,
                dOB: formValues.patientDOB,
                famPhoneNumber: formValues.secondaryMobileNumber,
                skipPayment: value == "SKIP" ? true : false,
                aadharNumber: formValues.aadharNumber,
            };
            console.log("reqObj", reqObj)
        } else {
            if (formValues.relationShip == "SELF") {
                reqObj = {
                    consultationFee: consultationFee,
                    briefExplanation: "",
                    appointmentType: formValues.appointmentType,
                    date: formValues.appointmentDate,
                    slot_starts: formValues.appointmentTime,
                    slot_ends: slot_ends[1],
                    clinicID: formValues.clinicName,
                    clinicRegNo: clinicRegNo,
                    email: formValues.email,
                    phoneNumber: formValues.mobileNumber,
                    name: formValues.patientName,
                    mainPatientID: mainPatientID,
                    familyMemberID: familyMemID,
                    relation: "self",
                    appointmentFor: "self",
                    gender: formValues.patientGender,
                    dOB: formValues.patientDOB,
                    famPhoneNumber: formValues.secondaryMobileNumber,
                    skipPayment: value == "SKIP" ? true : false,
                    aadharNumber: formValues.aadharNumber,
                };
                console.log("reqObj", reqObj)
            } else {
                reqObj = {
                    consultationFee: consultationFee,
                    briefExplanation: "",
                    appointmentType: formValues.appointmentType,
                    date: formValues.appointmentDate,
                    slot_starts: formValues.appointmentTime,
                    slot_ends: slot_ends[1],
                    clinicID: formValues.clinicName,
                    clinicRegNo: clinicRegNo,
                    email: formValues.email,
                    phoneNumber: formValues.mobileNumber,
                    name: formValues.patientName,
                    mainPatientID: mainPatientID,
                    familyMemberID: familyMemID,
                    relation: formValues.relationShip,
                    appointmentFor: "family",
                    gender: formValues.patientGender,
                    dOB: formValues.patientDOB,
                    famPhoneNumber: formValues.secondaryMobileNumber,
                    skipPayment: value == "SKIP" ? true : false,
                    aadharNumber: formValues.aadharNumber,
                };
                console.log("reqObj", reqObj)
            }
        }

        const data = await proceedToPayment(reqObj);
        console.log("proceedToPayment", data);
        if (value == "SKIP") {
            return;
        } else if (value == "PAY") {
            sessionStorage.setItem("AppointmentData", JSON.stringify(data));
            sessionStorage.setItem("skipPayments", "FALSE");
            //   this.router.navigate(['/dashboard/billGeneration']);

        }
    }

    return (
        <Dialog open={open} onClose={onCancel} classes={{ paper: classes.dialog }}>
            <div className='row dialog-title-row'>
                <div className='dialog-heading'>Book Appointment</div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='row dialog-content-row'>
                    <div className='col-4'>
                        <TextField
                            name="mobileNumber"
                            label="Mobile Number"
                            className='form-control'
                            type="text"
                            variant="outlined"
                            fullWidth
                            value={formData.mobileNumber}
                            onChange={handleChange}
                        />
                        {fetchPatientData.length > 0 ? (
                            <div className='list'>
                                {fetchPatientData.map((x, index) => (
                                    <p className='patient-name' style={{ display: x.name !== '' ? 'block' : 'none' }}
                                        onClick={() => selectMember(x)} key={index} value={index}>
                                        {x.name} - {x.relation}
                                    </p>
                                ))}
                                {fetchPatientData.map((x, index) => (
                                    <p className='patient-name' style={{ display: x.name === '' ? 'block' : 'none' }}
                                        onClick={() => selectMember(x)} key={index} value={index}>
                                        {x.relation}
                                    </p>
                                ))}
                            </div>
                        ) : null}
                    </div>
                    <div className='col-4'>
                        <TextField
                            name="patientName"
                            label="Patient Name"
                            variant="outlined"
                            fullWidth
                            className='form-control'
                            value={formData.patientName}
                            onChange={handleChange}
                            disabled={disablePatientName}
                        />
                    </div>
                    <div className='col-4'>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="appointmentType">Appointment Type</InputLabel>
                            <Select
                                name="appointmentType"
                                label="Appointment Type"
                                className='form-control'
                                value={formData.appointmentType}
                                onChange={handleChange}
                            >
                                <MenuItem value="VIDEO">Online</MenuItem>
                                <MenuItem value="WALKIN">InClinic</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='col-4'>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="patientGender">Patient Gender</InputLabel>
                            <Select
                                name="patientGender"
                                label="Patient Gender"
                                className='form-control'
                                value={formData.patientGender}
                                onChange={handleChange}
                                disabled={disablegender}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='col-4'>
                        <TextField
                            name="patientAge"
                            label="Patient Age"
                            className='form-control'
                            type="text"
                            variant="outlined"
                            fullWidth
                            value={formData.patientAge}
                            onChange={handleChange}
                            disabled={disableAge}
                        />
                    </div>
                    <div className='col-4'>
                        <TextField
                            name="secondaryMobileNumber"
                            label="Secondary Mobile Number"
                            className='form-control'
                            type="text"
                            variant="outlined"
                            fullWidth
                            value={formData.secondaryMobileNumber}
                            onChange={handleChange}
                            disabled={disableSecondaryNumber}
                        />
                    </div>
                    <div className='col-4'>
                        <TextField
                            name="patientDOB"
                            label="Patient Date of Birth"
                            className='form-control'
                            type="date"
                            variant="outlined"
                            fullWidth
                            value={formData.patientDOB}
                            onChange={handleChange}
                            disabled={disableDob}
                        />
                    </div>
                    <div className='col-4'>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="relationShip">Relationship</InputLabel>
                            <Select
                                name="relationShip"
                                label="Relationship"
                                className='form-control'
                                value={formData.relationShip}
                                onChange={handleChange}
                                disabled={disableRelation}
                            >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="SELF">Self</MenuItem>
                                <MenuItem value="Father">Father</MenuItem>
                                <MenuItem value="Mother">Mother</MenuItem>
                                <MenuItem value="Son">Son</MenuItem>
                                <MenuItem value="Brother">Brother</MenuItem>
                                <MenuItem value="Sister">Sister</MenuItem>
                                <MenuItem value="Wife">Wife</MenuItem>
                                <MenuItem value="Husband">Husband</MenuItem>
                                <MenuItem value="Grand Mother">Grand Mother</MenuItem>
                                <MenuItem value="Grand Father">Grand Father</MenuItem>
                                <MenuItem value="Uncle">Uncle</MenuItem>
                                <MenuItem value="Cousin">Cousin</MenuItem>
                                <MenuItem value="Friend">Friend</MenuItem>
                                <MenuItem value="Other Relative">Other Relative</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className='col-4'>
                        <TextField
                            name="email"
                            label="Email"
                            className='form-control'
                            type="text"
                            variant="outlined"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                            disabled={disableEmail}
                        />
                    </div>
                    <div className='col-4'>
                        <TextField
                            name="aadharNumber"
                            label="Aadhar Number"
                            className='form-control'
                            type="text"
                            variant="outlined"
                            fullWidth
                            value={formData.aadharNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='col-4'>
                        <TextField
                            name="appointmentDate"
                            label="Appointment Date"
                            className='form-control'
                            type="date"
                            variant="outlined"
                            fullWidth
                            value={formData.appointmentDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='col-4'>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="appointmentTime">Appointment Time</InputLabel>
                            <Select
                                name="appointmentTime"
                                label="Appointment Time"
                                className='form-control'
                                value={formData.appointmentTime}
                                onChange={handleChange}
                            >
                                <MenuItem value="">Select Time</MenuItem>
                                {availableSlots.map((slot) => (
                                    <MenuItem key={slot.value} value={slot.value}>
                                        {slot.time}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='col-4'>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="clinicName">Clinic Name</InputLabel>
                            <Select
                                name="clinicName"
                                label="Clinic Name"
                                className='form-control'
                                value={formData.clinicName}
                                onChange={handleChange}
                            >
                                {clinicDetails.map((clinic) => (
                                    <MenuItem key={clinic._id} value={clinic._id}>
                                        {clinic.clinicName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className='row d-flex justify-content-end'>
                    <button class="submitbtn skip-btn provider-submit-btn" id="submit" onClick={() => bookAppointmentV2("SKIP")}>
                        Later
                    </button>
                    <button class="submitbtn provider-submit-btn me-2" id="submit" onClick={() => bookAppointmentV2("PAY")}>
                        Bill Patient
                    </button>
                </div>
            </form>
        </Dialog>
    );
}

export default withStyles(styles)(BookAppointmentComponent);