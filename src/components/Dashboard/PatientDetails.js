import React, { useState, useEffect } from 'react';
import '../../App.css';
// import { searchMyPatientsAPI, calculateAge } from '../../services/userPatientsSrv';
// import moment from 'moment';
import { useParams } from 'react-router-dom';


const PatientDetails = () => {

    const { id } = useParams();
    const { name } = useParams();

    return (
        <div className='row'>
            <p>Patient Details</p>
            <p>ID: {id}</p>
            <p>Name: {name}</p>
        </div>
    )
}

export default PatientDetails;