import React, { useState, createContext, useContext } from 'react';
import axios from 'axios';

const HttpLoaderContext = createContext();

export const HttpLoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const showLoader = () => {
        debugger;
        setIsLoading(true);
    };

    const hideLoader = () => {
        debugger;
        setIsLoading(false);
    };

    // Wrapper around axios API calls
    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use(
        (config) => {
            showLoader(); // Show loader before each HTTP request
            return config;
        },
        (error) => {
            // hideLoader(); // Hide loader on request error
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            // hideLoader(); // Hide loader on successful response
            return response;
        },
        (error) => {
            hideLoader(); // Hide loader on response error
            return Promise.reject(error);
        }
    );

    return (
        <HttpLoaderContext.Provider value={{ isLoading, axiosInstance }}>
            {children}
            {isLoading && (
                <div className='loader-container'>
                    <div className="loader-overlay">
                        <img src='../images/provider_isometric.png' alt="Loading..." className="loader-img" />
                    </div>
                </div>
            )}
        </HttpLoaderContext.Provider>
    );
};

export const useHttpLoader = () => {
    return useContext(HttpLoaderContext);
};
