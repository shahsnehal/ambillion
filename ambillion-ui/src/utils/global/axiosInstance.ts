import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { apiUrl, localStorageKey } from 'constants/common';
import { toast } from 'react-toastify';
import { getLocalStorage } from 'utils/localStorage';

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
        const accessToken = getLocalStorage(localStorageKey.JWT_TOKEN);
        // const accessToken: string | null = getLocalStorageItem<string>('accessToken');
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
        return response.data;
    },
    async (error) => {
        const data = error ?? error?.response ? error?.response?.data : null;
        if (error.code && !data) {
            toast.error(error.message);
        } else if (data?.error) {
            toast.error(data?.message);
        }
        return Promise.reject(data);
    }
);

export default axiosInstance;
