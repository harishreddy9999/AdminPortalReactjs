import React from 'react';
import Verifications from './Admin-verifications';
import Complaints from './Admin-complaints';
import AdminCoupons from './Admin-Coupons';
import PanlesList from './Admin-PanelsList';
import CreatePanel from './Admin-CreatePanel';
import CustomDrugs from './Admin-CustomDrugs';


export function AdminMainContent({ selectedComponent, handleComponentSelect }) {
    let componentToRender;
    // debugger;
    switch (selectedComponent) {
        case 'Verifications':
        case null:
            componentToRender = <Verifications />;
            break;
        case 'Complaints':
            componentToRender = <Complaints />;
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

        default:
            componentToRender = null;
    }

    return (
        <div className="row" style={{ paddingInline: '0px' }}>
            {componentToRender}
        </div>
    );
}
