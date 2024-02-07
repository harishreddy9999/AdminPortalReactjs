import React from 'react';
import { Outlet } from 'react-router-dom';
import Home from './Home';

function MainContent() {

    // debugger;
    return (
        <div className="row">
            <div className='col-6'>
                Main content
                <Home />
            </div>
            <div className='col-6'>
                <Outlet />
            </div>
            {/* {componentToRender} */}

        </div>
    );
}

export default MainContent;
