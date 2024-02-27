import React from 'react';
import PatientsList from './PatientsList';


export function MainContent({ selectedComponent, handleComponentSelect }) {
    let componentToRender;
    // debugger;
    switch (selectedComponent) {
        case 'Patients':
        case null:
            componentToRender = <PatientsList />;
            break;

        // case 'Panels':
        // componentToRender = <PanlesList handleComponentSelect={handleComponentSelect} />;
        // break;


        default:
            componentToRender = null;
    }

    return (
        <div className="row" style={{ paddingInline: '0px' }}>
            {componentToRender}
        </div>
    );
}

export default MainContent;
