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


export async function addNewTrackersAPI(obj) {


    try {
        const response = await adminAPIURL.post('/wellness/wellnessTrackers', obj);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('addNewTrackersAPI request failed');
        }


        // Handle the response data
        console.log('addNewTrackersAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('addNewTrackersAPI failed:', error);
        throw error;
    }
}


export async function addNewGoalsAPI(obj) {


    try {
        const response = await adminAPIURL.post('/wellness/wellnessGoals', obj);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('addNewTrackersAPI request failed');
        }


        // Handle the response data
        console.log('addNewTrackersAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('addNewTrackersAPI failed:', error);
        throw error;
    }
}


export async function getAllDoctorsInAdminAPI(text, size, page) {


    try {
        const response = await adminAPIURL.get('/doctor/getAllDoctors?searchText=' + text + '&size=' + size + '&page=' + page);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getAllDoctorsInAdminAPI request failed');
        }


        // Handle the response data
        console.log('getAllDoctorsInAdminAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('getAllDoctorsInAdminAPI failed:', error);
        throw error;
    }
}


export async function getAllPatientsInAdminAPI(text, size, page) {


    try {
        const response = await adminAPIURL.get('/patients/getAllPatients?searchText=' + text + '&size=' + size + '&page=' + page);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getAllPatientsInAdminAPI request failed');
        }


        // Handle the response data
        console.log('getAllPatientsInAdminAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('getAllPatientsInAdminAPI failed:', error);
        throw error;
    }
}


export async function getAllPharmaInAdminAPI(text, size, page) {


    try {
        const response = await adminAPIURL.get('/pharmacy/getAllPharmacies?searchText=' + text + '&size=' + size + '&page=' + page);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getAllPharmaInAdminAPI request failed');
        }


        // Handle the response data
        console.log('getAllPharmaInAdminAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('getAllPharmaInAdminAPI failed:', error);
        throw error;
    }
}


export async function getAllLabInAdminAPI(text, size, page) {


    try {
        const response = await adminAPIURL.get('/lab/getAllLabs?searchText=' + text + '&size=' + size + '&page=' + page);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getAllLabInAdminAPI request failed');
        }


        // Handle the response data
        console.log('getAllLabInAdminAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('getAllLabInAdminAPI failed:', error);
        throw error;
    }
}


export async function getAllClinicsInAdminAPI(text, size, page) {


    try {
        const response = await adminAPIURL.get('/clinics/getAllClinics?searchText=' + text + '&size=' + size + '&page=' + page);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getAllLabInAdminAPI request failed');
        }


        // Handle the response data
        console.log('getAllLabInAdminAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('getAllLabInAdminAPI failed:', error);
        throw error;
    }
}

export async function getAllClinicSubscriptionsAPI() {


    try {
        const response = await adminAPIURL.get('/subscription/getAllClinicSubscriptions');
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getAllClinicSubscriptionsAPI request failed');
        }


        // Handle the response data
        console.log('getAllClinicSubscriptionsAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('getAllClinicSubscriptionsAPI failed:', error);
        throw error;
    }
}

export async function getAllPharmacySubscriptionsAPI() {


    try {
        const response = await adminAPIURL.get('subscription/getAllPharmacySubscriptions');
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getAllPharmacySubscriptionsAPI request failed');
        }


        // Handle the response data
        console.log('getAllPharmacySubscriptionsAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('getAllPharmacySubscriptionsAPI failed:', error);
        throw error;
    }
}


export async function getAllConfiguredSubscriptionAPI() {


    try {
        const response = await adminAPIURL.get('/subscription/getAllSubscription');
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getAllConfiguredSubscriptionAPI request failed');
        }


        // Handle the response data
        console.log('getAllConfiguredSubscriptionAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('getAllConfiguredSubscriptionAPI failed:', error);
        throw error;
    }
}

export async function updateClinicSubscriptionAPI(obj) {


    try {
        const response = await adminAPIURL.post('/subscription/updateClinicSubscriptions', obj);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('updateClinicSubscriptionAPI request failed');
        }


        // Handle the response data
        console.log('updateClinicSubscriptionAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('updateClinicSubscriptionAPI failed:', error);
        throw error;
    }
}
export async function getAllPharmacyConfiguredSubscriptionAPI() {


    try {
        const response = await adminAPIURL.get('/subscription/getAllSubscription?applicationType=PHARMACY');
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getAllPharmacyConfiguredSubscriptionAPI request failed');
        }


        // Handle the response data
        console.log('getAllPharmacyConfiguredSubscriptionAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('getAllPharmacyConfiguredSubscriptionAPI failed:', error);
        throw error;
    }
}
export async function updatePharmacySubscriptionsAPI(obj) {


    try {
        const response = await adminAPIURL.post('/subscription/updatePharmacySubscriptions', obj);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('updateClinicSubscriptionAPI request failed');
        }


        // Handle the response data
        console.log('updateClinicSubscriptionAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('updateClinicSubscriptionAPI failed:', error);
        throw error;
    }
}




export async function activeCouponAPI(obj) {


    try {
        const response = await adminAPIURL.post('/coupon/activeCoupon', obj);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('activeCouponAPI request failed');
        }


        // Handle the response data
        console.log('activeCouponAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('activeCouponAPI failed:', error);
        throw error;
    }
}


export async function updateDrugDetailsAPI(obj) {


    try {
        const response = await adminAPIURL.post('/drugs/updateDrugDetails', obj);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('updateDrugDetailsAPI request failed');
        }


        // Handle the response data
        console.log('updateClinicSubscriptionAPI successful service', data);
        console.log('updateDrugDetailsAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('updateClinicSubscriptionAPI failed:', error);
        console.error('updateDrugDetailsAPI failed:', error);
        throw error;
    }
}


export async function getAllUserCouponsAPI() {


    try {
        const response = await adminAPIURL.get('/coupon/getCouponDetails?page=0&size=100');
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('getAllUserCouponsAPI request failed');
        }


        // Handle the response data
        console.log('getAllUserCouponsAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('getAllUserCouponsAPI failed:', error);
        throw error;
    }
}


export async function addUserCouponAPI(obj) {


    try {
        const response = await adminAPIURL.post('/coupon/addUserCoupon', obj);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('addUserCouponAPI request failed');
        }


        // Handle the response data
        console.log('addUserCouponAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('addUserCouponAPI failed:', error);
        throw error;
    }
}


export async function getwellnessenrollmentsAPI() {


    try {
        const response = await adminAPIURL.get('/enrollment/list');
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('addUserCouponAPI request failed');
        }


        // Handle the response data
        console.log('addUserCouponAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('addUserCouponAPI failed:', error);
        throw error;
    }
}


export async function verifyWellnessEnrollmnetAPI(obj) {


    try {
        const response = await adminAPIURL.post('/enrollment/verify', obj);
        const data = response.data;

        if (!response.statusText === "OK") {
            throw new Error('addUserCouponAPI request failed');
        }


        // Handle the response data
        console.log('addUserCouponAPI successful service', data);
        // debugger;
        return data;

    } catch (error) {
        console.error('addUserCouponAPI failed:', error);
        throw error;
    }
}