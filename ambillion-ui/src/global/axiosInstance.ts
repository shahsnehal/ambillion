import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { apiUrl } from 'constants/common';
import { toast } from 'react-toastify';
import { setLocalStorage, getLocalStorage } from './storage';
import { refreshAccessToken } from './globalFunction';

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
        const accessToken = getLocalStorage<string>('accessToken') ?? null;
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
            toast.success(responseMessage);
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        const refreshToken = getLocalStorage<string>('refreshToken') ?? null;

        if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshTokenResponse = await refreshAccessToken(refreshToken);

                const { accessToken: newAccessToken } = refreshTokenResponse.data;

                setLocalStorage('accessToken', newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                const refreshErrorMessage = 'Failed To Refresh Access. Please log in again.';
                return Promise.reject(new Error(refreshErrorMessage));
            }
        }

        const data = error.response?.data ?? null;
        let errorMessage = 'An unknown error occurred.';

        if (data?.message) {
            errorMessage = data.message;
            toast.error(errorMessage);
        }

        return Promise.reject(new Error(errorMessage));
    }
);

export default axiosInstance;
