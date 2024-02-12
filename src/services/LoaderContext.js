import React, { createContext, useState, useContext } from 'react';

// Create context
const LoaderContext = createContext();

// Create provider component
export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const showLoader = () => {
        setIsLoading(true);
    };

    const hideLoader = () => {
        setIsLoading(false);
    };

    return (
        <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
            {children}
        </LoaderContext.Provider>
    );
};

// Custom hook to use loader context
export const useLoader = () => {
    return useContext(LoaderContext);
};
