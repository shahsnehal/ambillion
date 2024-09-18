import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { apiUrl, localStorageKey } from 'constants/common';
import { toast } from 'react-toastify';
import { getLocalStorage } from 'utils/localStorage';

/**
 * Custom type extending AxiosRequestConfig to include headers.
 *
 * @typedef {Object} AdaptAxiosRequestConfig
 * @property {AxiosRequestHeaders} headers - The headers for the request.
 */
type AdaptAxiosRequestConfig = AxiosRequestConfig & {
    headers: AxiosRequestHeaders;
};

/**
 * Creates an Axios instance with a base URL and default headers.
 *
 * @type {AxiosInstance} The configured Axios instance.
 */
const axiosInstance = axios.create({
    baseURL: apiUrl.endPoint,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Request interceptor to attach authorization token to each request.
 *
 * @param {AdaptAxiosRequestConfig} config - The Axios request configuration.
 * @returns {Promise<AdaptAxiosRequestConfig>} The updated request configuration with the token.
 */
axiosInstance.interceptors.request.use(
    async (config: AdaptAxiosRequestConfig) => {
        // Retrieve the access token from localStorage
        const accessToken = getLocalStorage(localStorageKey.JWT_TOKEN);
        if (accessToken) {
            // Attach the token to the Authorization header if it exists
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config; // Proceed with the updated request configuration
    },
    (error) => {
        return Promise.reject(new Error('Request error: ' + error.message));
    }
);

/**
 * Response interceptor to handle successful responses and errors globally.
 *
 * @param {AxiosResponse} response - The Axios response object.
 * @returns {Promise<any>} The response data or a rejected promise in case of error.
 */
/* eslint-disable no-underscore-dangle */
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Check if the response code indicates success
        const responseCode = response?.data?.code;
        if ([200, 201, 202, 203].includes(responseCode)) {
            // Display a success message if present in the response
            const responseMessage = response?.data?.message;
            if (responseMessage) toast.success(responseMessage);
        }
        return response.data; // Return the response data to be used by the calling code
    },
    async (error) => {
        // Handle and display errors from the response
        const data = error ?? error?.response ? error?.response?.data : null; // Fallback to error object if response data is not available
        if (error.code && !data) {
            // Display error message if no response data is available
            toast.error(error.message);
        } else if (data?.error) {
            // Display error message from response data if available
            toast.error(data?.message);
        }
        return Promise.reject(data); // Reject the promise with the error data for further handling
    }
);

export default axiosInstance;
