import React from 'react';
import Verifications from './Admin-verifications';
import Complaints from './Admin-complaints';


export function AdminMainContent({ selectedComponent }) {
    let componentToRender;

    switch (selectedComponent) {
        case 'Verifications':
        case null:
            componentToRender = <Verifications />;
            break;
        case 'Complaints':
            componentToRender = <Complaints />;
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
