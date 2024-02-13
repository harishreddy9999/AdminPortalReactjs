// Loader.js
import React, { useContext } from 'react';
import { LoaderContext } from './LoaderContext';

function Loader() {
    const { isLoading } = useContext(LoaderContext);
    // debugger;
    return isLoading ? (
        <div className='loader-container'>
            <div className="loader-overlay">
                <img src='../images/provider_isometric.png' alt="Loading..." className="loader-img" />
            </div>
        </div>
    ) : null;
}

export default Loader;
