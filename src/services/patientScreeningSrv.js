import { api } from './httpHeaderInterceptor';

export async function getPatientScreeningDetailsAPI(appointmentID) {


    try {
        const response = await api.get('/screening/getPatientScreeningDetails?appointmentID=' + appointmentID);
        // debugger;
        if (!response.statusText === "OK") {
            throw new Error('Login request failed');
        }


        // Handle the response data
        console.log('getPatientScreeningDetailsAPI service', response.data);
        return response.data;

    } catch (error) {
        console.error('getPatientScreeningDetailsAPI failed:', error);
        throw error;
    }
}


export async function doctorProfilePicAPI(id, role) {


    try {
        const response = await api.get('/getProfilePic?id=' + id + '&role=' + role);
        // debugger;
        if (!response.statusText === "OK") {
            throw new Error('Login request failed');
        }


        // Handle the response data
        console.log('getPatientScreeningDetailsAPI service', response.data);
        return response.data;

    } catch (error) {
        console.error('getPatientScreeningDetailsAPI failed:', error);
        throw error;
    }
}

export async function getVitalDetailsAPI(appointmentID) {


    try {
        const response = await api.get('/screening/v2/getVitalDetails?appointmentID=' + appointmentID);
        // debugger;
        if (!response.statusText === "OK") {
            throw new Error('Login request failed');
        }


        // Handle the response data
        console.log('getVitalDetailsAPI service', response.data);
        return response.data;

    } catch (error) {
        console.error('getVitalDetailsAPI failed:', error);
        throw error;
    }
}

export async function updateVitalAPI(obj) {


    try {
        const response = await api.post('/screening/V2/updateVitalsFromProvider', obj);
        // debugger;
        if (!response.statusText === "OK") {
            throw new Error('Login request failed');
        }


        // Handle the response data
        console.log('updateVitalAPI service', response.data);
        return response.data;

    } catch (error) {
        console.error('updateVitalAPI failed:', error);
        throw error;
    }
}


export async function fetchPatientDetailsAPI(value) {


    try {
        const response = await api.get('/appointment/V1/fetchPatient?phoneNumber=' + value);
        // debugger;
        if (!response.statusText === "OK") {
            throw new Error('fetchPatientDetailsAPI request failed');
        }


        // Handle the response data
        console.log('fetchPatientDetailsAPI service', response.data);
        return response.data;

    } catch (error) {
        console.error('updateVitalAPI failed:', error);
        throw error;
    }
}