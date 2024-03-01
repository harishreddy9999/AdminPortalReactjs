import { labAPIURL, api } from './httpHeaderInterceptor';
import { adminAPIURL,clinicalAPIURL } from './httpHeaderInterceptor';

export async function getDefaultPanelsAPI(text, page, size) {


    try {
        const response = await labAPIURL.get('/admin/V2/getDefaultActivePanels?searchText=' + text + '&page=' + page + '&size=' + size);
        const getDefaultPanelsRes = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getDefaultPanelsRes request failed');
        }


        // Handle the response data
        // console.log('getDefaultPanelsRes successful service', getDefaultPanelsRes);
        // debugger;
        return getDefaultPanelsRes;

    } catch (error) {
        console.error('getDefaultPanelsRes failed:', error);
        throw error;
    }
}


export async function getDefaultSamplesAPI() {


    try {
        const response = await labAPIURL.get('/panels/getDefaultSamples');
        const getDefaultSamplesRes = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getDefaultSamplesRes request failed');
        }


        // Handle the response data
        // console.log('getDefaultPanelsRes successful service', getDefaultPanelsRes);
        // debugger;
        return getDefaultSamplesRes;

    } catch (error) {
        console.error('getDefaultPanelsRes failed:', error);
        throw error;
    }
}


export async function addDefaultPanelsAPI(obj) {


    try {
        const response = await labAPIURL.post('/admin/addDefaultPanels', obj);
        const addDefaultPanelsRes = response.data;

        if (!response.statusText === "OK") {
            throw new Error('addDefaultPanelsRes request failed');
        }


        // Handle the response data
        // console.log('getDefaultPanelsRes successful service', getDefaultPanelsRes);
        // debugger;
        return addDefaultPanelsRes;

    } catch (error) {
        console.error('addDefaultPanelsRes failed:', error);
        throw error;
    }
}


export async function getAllCustomDrugsAPI(page, size, text) {


    try {
        const response = await api.get('/drugs/getAllCustomDrugs?page=' + page + '&size=' + size + '&searchText=' + text);
        const getAllCustomDrugsRes = response.data;

        if (!response.statusText === "OK") {
            throw new Error('addDefaultPanelsRes request failed');
        }


        // Handle the response data
        // console.log('getDefaultPanelsRes successful service', getDefaultPanelsRes);
        // debugger;
        return getAllCustomDrugsRes;

    } catch (error) {
        console.error('getAllCustomDrugsRes failed:', error);
        throw error;
    }
}

export async function deleteAdminPanelAPI(obj) {


    try {
        const response = await labAPIURL.post('/admin/deletePanel', obj);
        const deleteAdminPanelRes = response.data;

        if (!response.statusText === "OK") {
            throw new Error('deleteAdminPanelRes request failed');
        }


        // Handle the response data
        // console.log('getDefaultPanelsRes successful service', getDefaultPanelsRes);
        // debugger;
        return deleteAdminPanelRes;

    } catch (error) {
        console.error('deleteAdminPanelRes failed:', error);
        throw error;
    }
}


export async function getAdmintestsAPI(searchtext, page, size) {


    try {
        const response = await labAPIURL.get('/admin/getDefaultIndependentTest?page=' + page + '&size=' + size + '&searchText=' + searchtext);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getAdmintestsAPI request failed');
        }


        // Handle the response data
        // console.log('getDefaultPanelsRes successful service', getDefaultPanelsRes);
        // debugger;
        return data;

    } catch (error) {
        console.error('getAdmintestsAPI failed:', error);
        throw error;
    }
}
export async function getWellnessProgramsAPI() {


    try {
        const response = await adminAPIURL.get('/wellness/getWellnessPrograms?programID=');
        const getWellnessProgramsRes = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getWellnessProgramsRes request failed');
        }
        return getWellnessProgramsRes;

    } catch (error) {
        console.error('getWellnessProgramsRes failed:', error);
        throw error;
    }
}
export async function getspecalityAPI() {


    try {
        const response = await clinicalAPIURL.get('/specialtyDropDown');
        const getspecalityRes = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getspecalityRes request failed');
        }
        return getspecalityRes;

    } catch (error) {
        console.error('getspecalityRes failed:', error);
        throw error;
    }
}
export async function savePackageAPI(obj) {


    try {
        const response = await adminAPIURL.post('/wellness/wellnessPackage',obj);
        const savePackageRes = response.data;

        if (!response.statusText === "OK") {
            throw new Error('savePackageRes request failed');
        }
        return savePackageRes;

    } catch (error) {
        console.error('savePackageRes failed:', error);
        throw error;
    }
}


