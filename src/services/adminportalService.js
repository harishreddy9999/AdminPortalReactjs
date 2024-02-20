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


export async function getAlltipsAPI() {


    try {
        const response = await adminAPIURL.get('/tips/allHealthTips');
        const getAlltipsAPIRes = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getAlltipsAPIRes request failed');
        }


        // Handle the response data
        console.log('getAlltipsAPIRes successful service', getAlltipsAPIRes);
        // debugger;
        return getAlltipsAPIRes;

    } catch (error) {
        console.error('createCouponRes failed:', error);
        throw error;
    }
}


export async function postHealthTipAPI(obj) {


    try {
        const response = await adminAPIURL.post('/tips/postHealthTip', obj);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('data request failed');
        }


        // Handle the response data
        console.log('postHealthTipAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('createCouponRes failed:', error);
        throw error;
    }
}


export async function createAdminHealthTipsAPI(obj) {


    try {
        const response = await adminAPIURL.post('/tips/addHealthTipByAdmin', obj);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('data request failed');
        }


        // Handle the response data
        console.log('createAdminHealthTipsAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('createAdminHealthTipsAPI failed:', error);
        throw error;
    }
}


export async function getWellnessProgrammesAPI() {


    try {
        const response = await adminAPIURL.get('/wellness/getWellnessPrograms?programID=');
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getWellnessProgrammesAPI request failed');
        }


        // Handle the response data
        console.log('getWellnessProgrammesAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('createCouponRes failed:', error);
        throw error;
    }
}


export async function getWellnessPackagesAPI() {


    try {
        const response = await adminAPIURL.get('/wellness/getWellnessPackages?programID=');
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getWellnessPackagesAPI request failed');
        }


        // Handle the response data
        console.log('getWellnessPackagesAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('getWellnessPackagesAPI failed:', error);
        throw error;
    }
}


export async function updateProgramActiveStatusAPI(obj) {


    try {
        const response = await adminAPIURL.post('/wellness/updateProgramActiveStatus', obj);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('updateProgramActiveStatusAPI request failed');
        }


        // Handle the response data
        console.log('updateProgramActiveStatusAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('updateProgramActiveStatusAPI failed:', error);
        throw error;
    }
}


export async function updatePackageActiveStatusAPI(obj) {


    try {
        const response = await adminAPIURL.post('/wellness/updatePackageActiveStatus', obj);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('updatePackageActiveStatusAPI request failed');
        }


        // Handle the response data
        console.log('updatePackageActiveStatusAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('updatePackageActiveStatusAPI failed:', error);
        throw error;
    }
}


export async function getGoalsAPI(searchtext, page, size) {


    try {
        const response = await adminAPIURL.get('/wellness/getwellnessGoals?searchText=' + searchtext + '&page=' + page + '&size=' + size);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getGoalsAPI request failed');
        }


        // Handle the response data
        console.log('getGoalsAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('getGoalsAPI failed:', error);
        throw error;
    }
}


export async function updateGoalsActiveStatusAPI(obj) {


    try {
        const response = await adminAPIURL.post('/wellness/updateGoalActiveStatus', obj);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('updateGoalsActiveStatusAPI request failed');
        }


        // Handle the response data
        console.log('updateGoalsActiveStatusAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('updateGoalsActiveStatusAPI failed:', error);
        throw error;
    }
}


export async function getTrackersAPI(searchtext, page, size) {


    try {
        const response = await adminAPIURL.get('/wellness/getwellnessTracker?searchText=' + searchtext + '&page=' + page + '&size=' + size);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getTrackersAPI request failed');
        }


        // Handle the response data
        console.log('getTrackersAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('getTrackersAPI failed:', error);
        throw error;
    }
}


export async function updateTrackerActiveStatusAPI(obj) {


    try {
        const response = await adminAPIURL.post('/wellness/updateTrackerActiveStatus', obj);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('updateTrackerActiveStatusAPI request failed');
        }


        // Handle the response data
        console.log('updateTrackerActiveStatusAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('updateTrackerActiveStatusAPI failed:', error);
        throw error;
    }
}