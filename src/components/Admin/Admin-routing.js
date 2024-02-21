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


export function AdminMainContent({ selectedComponent, handleComponentSelect }) {
    let componentToRender;
    // debugger;
    switch (selectedComponent) {
        case 'Verifications':
        case null:
            componentToRender = <Verifications />;
            break;
        case 'NewComplaints':
            componentToRender = <NewComplaints />;
            break;
        case 'Coupons':
            componentToRender = <AdminCoupons />;
            break;
        case 'Panels':
            componentToRender = <PanlesList handleComponentSelect={handleComponentSelect} />;
            break;
        case 'AddNewPanel':
            componentToRender = <CreatePanel />;
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

        default:
            componentToRender = null;
    }

    return (
        <div className="row" style={{ paddingInline: '0px' }}>
            {componentToRender}
        </div>
    );
}
