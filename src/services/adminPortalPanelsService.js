import { labAPIURL, api } from './httpHeaderInterceptor';

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