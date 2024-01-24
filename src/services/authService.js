import { api, adminAPIURL } from './httpHeaderInterceptor';

export async function login(reqobj) {


    try {
        const response = await api.post('/login', reqobj);
        const loginResponseData = response.data;
        const token = response.data.token;
        sessionStorage.setItem('token', token);
        if (!response.statusText === "OK") {
            throw new Error('Login request failed');
        }


        // Handle the response data
        console.log('Login successful service', loginResponseData);
        return loginResponseData;

    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export async function getDoctorProfile() {


    try {
        const response = await api.get('/getDoctorProfile');
        // debugger;
        if (!response.statusText === "OK") {
            throw new Error('Login request failed');
        }


        // Handle the response data
        console.log('getDoctorProfile service', response.data);
        return response.data;

    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export async function getAppointmentsByClinicAndDate(regNo, date) {


    try {
        const response = await api.get('/dashboard/getAppointmentsByClinicAndDate?clinicRegNo=' + regNo + '&date=' + date);
        // debugger;
        if (!response.statusText === "OK") {
            throw new Error('Login request failed');
        }


        // Handle the response data
        console.log('getAppointmentsByClinicAndDate service', response.data);
        return response.data;

    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export async function getAptInvoice(aptID) {
    try {
        const response = await api.get('/billing/getInvoice?appointmentID=' + aptID);
        // debugger;
        if (!response.statusText === "OK") {
            throw new Error('Login request failed');
        }


        // Handle the response data
        console.log('getAptInvoice service', response.data);
        return response.data;

    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export async function cancelAppointmentByProvider(obj) {
    try {
        const response = await api.post('/appointment/cancelAppointmentByProvider', obj);
        // debugger;
        if (!response.statusText === "OK") {
            throw new Error('Login request failed');
        }


        // Handle the response data
        console.log('cancelAppointmentByProvider service', response.data);
        return response.data;

    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export async function getClinicsList() {
    try {
        const response = await api.get('/providerevents/V2/clinicNames');
        // debugger;
        if (!response.statusText === "OK") {
            throw new Error('Login request failed');
        }


        // Handle the response data
        console.log('cancelAppointmentByProvider service', response.data);
        return response.data;

    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export async function showAvailabileTimeSlots(provider, date, clinicId) {
    try {
        const response = await api.get('/appointment/v2/showAvailableTimeSlots?provider=' +
            provider +
            '&date=' +
            date +
            '&clinicId=' +
            clinicId);
        // debugger;
        if (!response.statusText === "OK") {
            throw new Error('Login request failed');
        }


        // Handle the response data
        console.log('showAvailabileTimeSlots service', response.data);
        return response.data;

    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}
export async function fetchPatient(value) {
    try {
        const response = await api.get('/appointment/V1/fetchPatient?phoneNumber=' + value);
        // debugger;
        if (!response.statusText === "OK") {
            throw new Error('Login request failed');
        }


        // Handle the response data
        console.log('fetchPatient service', response.data);
        return response.data;

    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export async function proceedToPayment(obj) {
    try {
        const response = await api.post('/appointment/V2/appointmentBookingByProvider', obj);
        // debugger;
        if (!response.statusText === "OK") {
            throw new Error('Login request failed');
        }


        // Handle the response data
        console.log('proceedToPayment service', response.data);
        return response.data;

    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export async function adminLogin(reqobj) {


    try {
        const response = await adminAPIURL.post('/admin/login', reqobj);
        const loginResponseData = response.data;
        const token = response.data.token;
        sessionStorage.setItem('token', token);
        if (!response.statusText === "OK") {
            throw new Error('adminLogin request failed');
        }


        // Handle the response data
        console.log('adminLogin successful service', loginResponseData);
        // debugger;
        return loginResponseData;

    } catch (error) {
        console.error('adminLogin failed:', error);
        throw error;
    }
}
