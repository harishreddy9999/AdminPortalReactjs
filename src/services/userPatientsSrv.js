import { api } from './httpHeaderInterceptor';
import moment from 'moment';


export async function searchMyPatientsAPI(name, page, size) {


    try {
        const response = await api.get('/patients/searchMyPatientsNew?searchText=' + name + "&page=" + page + "&size=" + size);
        const searchMyPatientsRes = response.data;

        if (!response.statusText === "OK") {
            throw new Error('searchMyPatientsRes request failed');
        }


        // Handle the response data
        // console.log('getDefaultPanelsRes successful service', getDefaultPanelsRes);
        // debugger;
        return searchMyPatientsRes;

    } catch (error) {
        console.error('searchMyPatientsRes failed:', error);
        throw error;
    }
}

export function calculateAge(patientDOB) {
    try {
        const formattedDate = moment(patientDOB, 'YYYY-MM-DD');
        const today = moment();
        const patientAge = today.diff(formattedDate, 'years', false);
        // const FormatedDOB = moment(patientDOB).format('YYYY-MM-DD')
        // const data = { patientAge: patientAge, FormatedDOB: FormatedDOB };
        return patientAge;
    } catch (error) {
        console.error('searchMyPatientsRes failed:', error);
        throw error;
    }
}


export async function getSpecialitiesAPI() {


    try {
        const response = await api.get('/specialtyDropDown');
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getSpecialitiesAPI request failed');
        }


        // Handle the response data
        // console.log('getDefaultPanelsRes successful service', getDefaultPanelsRes);
        // debugger;
        return data;

    } catch (error) {
        console.error('searchMyPatientsRes failed:', error);
        throw error;
    }
}