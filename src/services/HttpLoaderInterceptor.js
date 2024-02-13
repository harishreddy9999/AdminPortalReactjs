// HttpLoaderInterceptor.js
import axios from 'axios';
import { useContext } from 'react';
import { LoaderContext } from './LoaderContext';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        debugger;
        const { setIsLoading } = useContext(LoaderContext);
        setIsLoading(true);
        return config;
    },
    (error) => {
        console.error('Error in request interceptor', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        const { setIsLoading } = useContext(LoaderContext);
        setIsLoading(false);
        return response;
    },
    (error) => {
        console.error('Error in response interceptor', error);
        const { setIsLoading } = useContext(LoaderContext);
        setIsLoading(false);
        return Promise.reject(error);
    }
);

export default axiosInstance;
