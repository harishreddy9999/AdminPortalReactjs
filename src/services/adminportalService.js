import { adminAPIURL } from './httpHeaderInterceptor';

export async function getVerificationStats() {


    try {
        const response = await adminAPIURL.get('/dashboard/getStatistics');
        const getVerificationStatsDats = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getVerificationStats request failed');
        }


        // Handle the response data
        console.log('getVerificationStats successful service', getVerificationStatsDats);
        // debugger;
        return getVerificationStatsDats;

    } catch (error) {
        console.error('adminLogin failed:', error);
        throw error;
    }
}

export async function getAllUnverifiedProfiles() {


    try {
        const response = await adminAPIURL.get('/unverified/getAllUnverifiedProfiles');
        const getAllUnverifiedProfilesData = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getAllUnverifiedProfilesData request failed');
        }


        // Handle the response data
        // console.log('getAllUnverifiedProfiles successful service', getAllUnverifiedProfilesData);
        // debugger;
        return getAllUnverifiedProfilesData;

    } catch (error) {
        console.error('adminLogin failed:', error);
        throw error;
    }
}


export async function getCustomerComplaints() {


    try {
        const response = await adminAPIURL.get('/complaints/getAllComplaintsCount');
        const getCustomerComplaintsData = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getCustomerComplaintsData request failed');
        }


        // Handle the response data
        console.log('getCustomerComplaintsData successful service', getCustomerComplaintsData);
        // debugger;
        return getCustomerComplaintsData;

    } catch (error) {
        console.error('adminLogin failed:', error);
        throw error;
    }
}


export async function getAssigneeDevlopers() {


    try {
        const response = await adminAPIURL.get('/complaints/getAllAssignees');
        const getAssigneeDevlopersData = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getAssigneeDevlopersData request failed');
        }


        // Handle the response data
        console.log('getAssigneeDevlopersData successful service', getAssigneeDevlopersData);
        // debugger;
        return getAssigneeDevlopersData;

    } catch (error) {
        console.error('adminLogin failed:', error);
        throw error;
    }
}

export async function getcomplaintsFrom(value) {


    try {
        const response = await adminAPIURL.get('/complaints/complaintsFrom?complaintsFrom=' + value);
        const getcomplaintsFromData = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getcomplaintsFromData request failed');
        }


        // Handle the response data
        console.log('getcomplaintsFromData successful service', getcomplaintsFromData);
        // debugger;
        return getcomplaintsFromData;

    } catch (error) {
        console.error('getcomplaintsFromData failed:', error);
        throw error;
    }
}

export async function verifyProfiles(obj) {


    try {
        const response = await adminAPIURL.post('/dashboard/verifyProfiles', obj);
        const verifyProfilesData = response.data;

        if (!response.statusText === "OK") {
            throw new Error('verifyProfilesData request failed');
        }


        // Handle the response data
        console.log('verifyProfilesData successful service', verifyProfilesData);
        // debugger;
        return verifyProfilesData;

    } catch (error) {
        console.error('getcomplaintsFromData failed:', error);
        throw error;
    }
}

export async function updateComplaintStatus(obj) {


    try {
        const response = await adminAPIURL.post('/complaints/updateStatus', obj);
        const updateComplaintStatusDate = response.data;

        if (!response.statusText === "OK") {
            throw new Error('updateComplaintStatusDate request failed');
        }


        // Handle the response data
        console.log('updateComplaintStatusDate successful service', updateComplaintStatusDate);
        // debugger;
        return updateComplaintStatusDate;

    } catch (error) {
        console.error('updateComplaintStatusDate failed:', error);
        throw error;
    }
}

export async function getAllCouponsDataAPI(couponFilter, page, size, startDate, endDate, isActive) {


    try {
        const response = await adminAPIURL.get('/coupon/getCouponDetails?couponFor=' + couponFilter + '&page=' + page + '&size=' + size + '&startDate=' + startDate + '&endDate=' + endDate + '&isActive=' + isActive);
        const updateComplaintStatusDate = response.data;

        if (!response.statusText === "OK") {
            throw new Error('updateComplaintStatusDate request failed');
        }


        // Handle the response data
        console.log('updateComplaintStatusDate successful service', updateComplaintStatusDate);
        // debugger;
        return updateComplaintStatusDate;

    } catch (error) {
        console.error('updateComplaintStatusDate failed:', error);
        throw error;
    }
}


export async function createCouponAPI(obj) {


    try {
        const response = await adminAPIURL.post('/coupon/addCouponDetails', obj);
        const createCouponRes = response.data;

        if (!response.statusText === "OK") {
            throw new Error('createCouponRes request failed');
        }


        // Handle the response data
        console.log('createCouponRes successful service', createCouponRes);
        // debugger;
        return createCouponRes;

    } catch (error) {
        console.error('createCouponRes failed:', error);
        throw error;
    }
}