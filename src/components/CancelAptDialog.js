import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import moment from 'moment';
import { cancelAppointmentByProvider } from '../services/authService';

const CancelDialog = ({ open, onCancel, appointment, handleCancelConfirmed }) => {
    const [selectedAppointment, setSelectedAppointment] = useState(appointment);
    const [reason, setReason] = useState('');
    console.log("appointment 2", appointment)

    console.log("appointment", appointment)
    console.log("selectedAppointment", selectedAppointment);
    const handleConfirmClick = async () => {
        console.log("reason,", reason);
        let requestObj = {
            appointmentID: selectedAppointment.appointmentID,
            reasonForCancelling: reason,
        };
        const cancelAppointment = await cancelAppointmentByProvider(requestObj);
        console.log(cancelAppointment)
        if (cancelAppointment) {
            handleCancelConfirmed(selectedAppointment);
            // this.toaster.showSuccess(cancelAppointment.message, '');
        }
    };
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogContent>
                <p>Are you sure you want to cancel {selectedAppointment.patientName} appointment on {moment(new Date(selectedAppointment.date)).format("DD/MM/yyyy")} at time {selectedAppointment.slot_starts}</p>
                <div className='row'>
                    <div className='col-6'>
                        <label htmlFor="reason">Reason for Cancellation:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Dismiss
                </Button>
                <Button onClick={() => handleConfirmClick(appointment)} color="primary">
                    Yes, Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CancelDialog;
