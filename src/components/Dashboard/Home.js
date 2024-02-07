import React, { useEffect, useState } from 'react';
import { getDoctorProfile, getAppointmentsByClinicAndDate, getAptInvoice } from '../../services/authService';
import moment from 'moment';
import '../../Styles/home.css';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CancelDialog from './CancelAptDialog';
import BookAppointmentComponent from './BookAppointment';
// import { ThemeContext } from '@mui/system';

function Home() {
    const [doctorClinicList, setDoctorClinicList] = useState([]);
    const [selectedClinic, setSelectedClinic] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [cancelingAppointment, setCancelingAppointment] = useState(null);
    const [isBookAppointment, setIsBookAppointment] = useState(false);

    // const handlePackagesListClick = () => {
    //     // debugger;
    //     handleComponentSelect('Packages');
    // };
    useEffect(() => {


        const fetchDoctorProfile = async () => {
            try {
                const response = await getDoctorProfile();
                console.log("home component", response);
                const clinicInformation = response.doctor[0].clinicInformation;
                for (let i = 0; i < clinicInformation.length; i++) {
                    if (!clinicInformation[i].subscriptionStatus) {
                        clinicInformation.splice(i, 1);
                        i--; // Decrement i to account for the removed element
                    }
                }
                setDoctorClinicList(clinicInformation);
                if (clinicInformation.length > 0) {

                    const clinicRegNo = clinicInformation[0].regNo;
                    setSelectedClinic(clinicRegNo);
                    const today = new Date();
                    const formattedDate = today.toISOString().split('T')[0];
                    setSelectedDate(formattedDate);
                    fetchAppointments(clinicRegNo, formattedDate);
                }
            } catch (error) {
                console.error('Error fetching doctor profile:', error);
            }
        };

        fetchDoctorProfile();
    }, []);
    const fetchAppointments = async (clinicRegNo, currentDate) => {
        try {
            const aptsByDate = await getAppointmentsByClinicAndDate(clinicRegNo, currentDate);
            aptsByDate.forEach(el => {
                var formattedDate = moment(
                    el.patientDOB
                ).format('YYYY-MM-DD');
                el.patientAge = moment().diff(formattedDate, 'years', false);
                el.vistType = el.appointmentType.includes('FOLLOWUP') ? 'FOLLOWUP' : 'NEW'
            })
            console.log("aptsByDate", aptsByDate);
            setAppointments(aptsByDate);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };
    const handleSelectClinic = (event) => {
        const clinicRegNo = event.target.value;
        setSelectedClinic(clinicRegNo);
        fetchAppointments(clinicRegNo, selectedDate);
    };

    const handleDateChange = (event) => {
        const currentDate = event.target.value;
        setSelectedDate(currentDate);
        fetchAppointments(selectedClinic, currentDate);
    };



    const handleClick = (event, apt) => {
        console.log("handleclick", apt)
        setAnchorEl(event.currentTarget);
        setSelectedAppointment(apt);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const rescheduleApt = (appointment) => {
        console.log("Reschedule appointment:", appointment);
        // Implement your reschedule logic here
        handleClose(); // Close the menu after performing the action
    };
    const getInvoice = async (appointment) => {
        console.log("getInvoice appointment:", appointment);
        const invoiceDetails = await getAptInvoice(appointment.appointmentID);
        console.log("invoiceDetails", invoiceDetails);
        if (invoiceDetails.invoiceBase64 !== "") {
            const byteCharacters = atob(invoiceDetails.invoiceBase64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });    // Create a data URL for the blob    
            const pdfData = URL.createObjectURL(blob);    // Open the PDF in a new browser tab    
            window.open(pdfData, '_blank', `width=900,height=700`);
        }
        handleClose(); // Close the menu after performing the action
    }

    const openCancelDialog = (appointment) => {
        console.log("openCancelDialog", appointment);
        setCancelingAppointment(appointment);
        setCancelDialogOpen(true);

    };

    const closeCancelDialog = () => {
        setCancelDialogOpen(false);
        setCancelingAppointment(null);
        setAnchorEl(null);
    };
    const handleCancelConfirmed = (appointment) => {
        // Implement your cancel logic here
        console.log('Cancelled appointment:', appointment);
        closeCancelDialog(); // Close the dialog after confirmation
        setAnchorEl(null);
    };

    const openBookAppointmentDialog = () => {
        setIsBookAppointment(true);
    };

    // Function to close the dialog
    const closeBookAppointmentDialog = () => {
        setIsBookAppointment(false);
    };


    return (
        <div className='container'>
            {/* <h2>Home</h2>
            <p>Welcome to the Home page!</p> */}
            {doctorClinicList.length > 0 && (
                <div className='row'>
                    <div className='col-lg-4'>
                        <label>Select Clinic</label>
                        <select className='form-control' value={selectedClinic} onChange={handleSelectClinic}>
                            <option value="">Select a clinic</option>
                            {doctorClinicList.map((profile) => (
                                <option key={profile.regNo} value={profile.regNo}>
                                    {profile.clinicName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='col-lg-4'>
                        <label>Select Date</label>
                        <input className='form-control' type='date' value={selectedDate} onChange={handleDateChange} />
                    </div>
                    <div className='col-lg-4 book-apt-btn-row'>
                        <button className='btn btn-primary book-apt-btn' onClick={openBookAppointmentDialog}>Book Appointment</button>
                    </div>
                </div>
            )}

            <div className="row">
                <div id="tablehead" className="table-header p-0">
                    <div id="101" className="row">
                        <div className="col-xl-2 col-lg-3 col-md-3 table-header-text d-flex" id="patientheading">PATIENT</div>
                        <div className="col-xl-9 col-lg-8 col-md-8 ps-0" id="tableheader">
                            <div className="row" id="tableheaderrow">
                                <div className="col-lg-3 col-md-3 table-header-text" id="dateandtimeheading">DATE & TIME
                                </div>
                                <div className="col-lg-3 col-md-3 table-header-text d-flex" id="visittypeheading">VISIT TYPE</div>
                                <div className="col-lg-3 col-md-3 table-header-text d-flex" id="consTypeheading">
                                    CONSULTATION TYPE
                                </div>
                                <div className="col-lg-3 col-md-3 table-header-text" id="paymentheading">PAYMENT</div>
                            </div>
                        </div>
                        <div className="col-xl-1 col-lg-1 col-md-1 table-header-text" id="actionheading">ACTION</div>
                    </div>
                </div>
                {appointments.map((appointment, index) => (
                    <div key={index} className="col-12 mb-4">

                        <div className="card-body p-0" id="cardbody">
                            <div className="row align-items-center" id="cardbodyrow">
                                <div className="col-xl-2 col-lg-3 col-md-3 d-flex ps-1 pt-1" id="patienttext">
                                    <div id="patinetprofile">
                                        {appointment.profilePicture === '' ? (
                                            appointment.gender === 'Male' ? (
                                                <img src="../images/man-avatar.1de9adcd.svg" id="pat-img-male" className="patient-img" alt="Male Avatar" />
                                            ) : (
                                                <img src="../images/women-patient.svg" id="pat-img-female" className="patient-img" alt="Female Avatar" />
                                            )
                                        ) : (
                                            <img src={appointment.profilePicture} id="pt-img-empty" className="patient-img" alt="Patient Avatar" />
                                        )}
                                    </div>

                                    <div id="patinenameandgebder" className="d-flex flex-column justify-content-center">
                                        <div className="card-text" id="cardpatinetname">{appointment.patientName}</div>
                                        <div className="gendertext" id="gendertext">{appointment.gender}<span>,{appointment.patientAge}</span></div>
                                    </div>
                                </div>
                                <div className="col-xl-9 col-lg-8 col-md-8 ps-0">
                                    <div className="row" id="cardbodyappointmentdetails">
                                        <div className="col-lg-3 col-md-3 ps-0" id="dateandtimetext">
                                            {appointment.date ? (
                                                <div className="card-text">{appointment.date.substring(0, 10)}</div>
                                            ) : (
                                                <div className="card-text">N/A</div>
                                            )}
                                            <div className="time-text">{appointment.slot_starts}-{appointment.slot_ends}</div>
                                        </div>

                                        <div className="col-lg-3 col-md-3 card-text1" id="visittypetext">{appointment.vistType}
                                        </div>
                                        <div className='col-lg-3 col-md-3 card-text1' id="visittypetext">
                                            {appointment.appointmentType === 'WALKIN' || appointment.appointmentType === 'FOLLOWUP-WALKIN' ? (
                                                <div>WALKIN</div>
                                            ) : (
                                                <div>VIDEO</div>
                                            )}
                                        </div>

                                        <div className='col-lg-3 col-md-3 paid-text card-text1'>
                                            {appointment.paymentStatus !== 'SKIP_PAYMENTS' ? (
                                                <div className='pendingText'>PAID</div>
                                            ) : (
                                                <div>PENDING</div>
                                            )}
                                        </div>


                                    </div>
                                </div>
                                <div className="col-lg-1 col-md-1 card-text d-flex align-items-center" id="action">
                                    <IconButton
                                        aria-controls={`simple-menu-${index}`}
                                        aria-haspopup="true"
                                        onClick={(event) => handleClick(event, appointment)}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id={`simple-menu-${index}`}
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >

                                        <MenuItem onClick={() => rescheduleApt(selectedAppointment)}>Reschedule</MenuItem>
                                        <MenuItem onClick={() => getInvoice(selectedAppointment)}>Invoice</MenuItem>
                                        <MenuItem onClick={() => openCancelDialog(selectedAppointment)}>Cancel</MenuItem>

                                    </Menu>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div className='row'>
                <button className='submit-btn' onClick={handlePackagesListClick}>Show Packages List</button>
            </div> */}
            {cancelDialogOpen ? <CancelDialog
                open={cancelDialogOpen}
                onCancel={closeCancelDialog}
                appointment={cancelingAppointment}
                handleCancelConfirmed={handleCancelConfirmed}
            /> : <div />}

            {isBookAppointment ? <BookAppointmentComponent
                open={isBookAppointment}
                onCancel={closeBookAppointmentDialog} /> : <div />}

        </div>
    );
}

export default Home;


