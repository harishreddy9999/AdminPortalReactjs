import axios from 'axios';

// Function to create an instance of axios with a specified base URL
const createAxiosInstance = (baseURL) => {
    const api = axios.create({
        baseURL: baseURL,
    });

    // Apply the headers using an interceptor
    api.interceptors.request.use(
        (config) => {
            // Retrieve the token from localStorage or wherever you store it
            const token = sessionStorage.getItem('token');

            // Set the token in the headers
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return api;
};

// Example usage with different base URLs
// const api = createAxiosInstance('https://acianadocisnclinicapiprodv1-staging.azurewebsites.net');
// const adminAPIURL = createAxiosInstance('https://acianadocisnadminapiprod-staging.azurewebsites.net');
// const labAPIURL = createAxiosInstance('https://acianadocisnlabapiprod-staging.azurewebsites.net');
// const apiInstance4 = createAxiosInstance('https://yetanotherapi.com/api');


const api = createAxiosInstance('http://20.193.129.237:7080/api/clinicapi');
const adminAPIURL = createAxiosInstance('http://20.193.129.237:7080/api/adminapi');
const labAPIURL = createAxiosInstance('http://20.193.129.237:7080/api/labapi');
const apiInstance4 = createAxiosInstance('https://yetanotherapi.com/api');

// Export the API instances
export { api, adminAPIURL, labAPIURL, apiInstance4 };
