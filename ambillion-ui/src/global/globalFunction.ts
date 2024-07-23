import axios from 'axios';
import { apiUrl, ROUTES } from 'constants/common';

export const refreshAccessToken = (refreshToken: string) => {
    return axios.post(`${apiUrl.tokenRefresh}?refreshToken=${refreshToken}`);
};

export const userLogout = (navigate: (path: string) => void) => {
    navigate(ROUTES.LOGIN);
    setTimeout(() => {
        localStorage.clear();
    }, 5);
};

export const getUserRole = (): string | null => {
    return localStorage.getItem('role');
};

export const hasRole = (role: string): boolean => {
    const userRole = getUserRole();
    return userRole === role;
};