import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { apiUrl } from 'constants/common';
import { toast } from 'react-toastify';
// import { refreshAccessToken } from './globalFunction';

type AdaptAxiosRequestConfig = AxiosRequestConfig & {
    headers: AxiosRequestHeaders;
};

const axiosInstance = axios.create({
    baseURL: apiUrl.endPoint,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
    async (config: AdaptAxiosRequestConfig) => {
        const accessToken = localStorage.getItem('accessToken') ?? null;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(new Error('Request error: ' + error.message));
    }
);

// Response interceptor for API calls
/* eslint-disable no-underscore-dangle */
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        const responseCode = response?.data?.code;
        if ([200, 201, 202, 203].includes(responseCode)) {
            const responseMessage = response?.data?.message;
            if (responseMessage) toast.success(responseMessage);
        }
        return response;
    },
    async (error) => {
        const data = error ?? error.response ? error.response.data : null;
        if (error.code && !data) {
            // toast.error(generic.status[error.code]);
            return Promise.reject(data);
        } else if (data && data.message) {
            toast.error(data.message);
            return Promise.reject(data);
        }
    }
);

export default axiosInstance;
