import React from 'react';
import Verifications from './Admin-newverifications';
import NewComplaints from './Admin-newcomplaints';
import AdminCoupons from './Admin-Coupons';
import PanlesList from './Admin-PanelsList';
import CreatePanel from './Admin-CreatePanel';
import CustomDrugs from './Admin-CustomDrugs';
import HealthTips from './Admin-Healthtips.js';
import Wellness from './Admin-Wellness.js';
import WellnessGoals from './Admin-WellnessGoals.js';
import AdminUsersList from './Admin-UsersList.js';
import AdminSubscripions from './Admin-Subscriptions.js';
import AdminTests from './Admin-Tests.js';
import AddSingleParameterTest from './Admin-AddSingleParameterTest.js'
import AdminsList from './Admin-AdminsList.js';
import SubscriptionPackages from './Admin-SubscriptionPackages.js';
import AddMultiParameterTest from './Admin-AddMultiParameterTest.js'


export function AdminMainContent({ selectedComponent, handleComponentSelect }) {
    let componentToRender;
    // debugger;
    if (!selectedComponent) {
        selectedComponent = sessionStorage.getItem("activeLink")
    }
    console.log("selectedComponent", selectedComponent, handleComponentSelect);
    // debugger;
    switch (selectedComponent) {
        case 'Verifications':
        case null:
            componentToRender = <Verifications />;
            break;
        case 'Complaints':
            componentToRender = <NewComplaints />;
            break;
        case 'Coupons':
            componentToRender = <AdminCoupons />;
            break;
        case 'Panels':
            componentToRender = <PanlesList handleComponentSelect={handleComponentSelect} />;
            break;

        case 'AddNewPanel':
            componentToRender = <CreatePanel handleComponentSelect={handleComponentSelect} />;
            break;

        case 'CustomDrugs':
            componentToRender = <CustomDrugs />;
            break;
        case 'Healthtips':
            componentToRender = <HealthTips />;
            break;
        case 'Wellness':
            componentToRender = <Wellness />;
            break;
        case 'WellnessGoals':
            componentToRender = <WellnessGoals />;
            break;
        case 'Users':
            componentToRender = <AdminUsersList />;
            break;
        case 'Subscriptions':
            componentToRender = <AdminSubscripions />;
            break;
        case 'Tests':
            componentToRender = <AdminTests handleComponentSelect={handleComponentSelect} />;
            break;
            case 'AddSingleParameterTest':
                componentToRender = <AddSingleParameterTest />;
                break;
                case 'AddMultiParameterTest':
                    componentToRender = <AddMultiParameterTest />;
                    break;
        case 'Admins':
            componentToRender = <AdminsList />;
            break;
        case 'SubscriptionPackages':
            componentToRender = <SubscriptionPackages />;
            break;

        default:
            componentToRender = null;
    }

    return (
        <div className="row" style={{ paddingInline: '0px' }}>
            {componentToRender}
        </div>
    );
}
