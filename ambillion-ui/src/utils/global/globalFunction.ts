import { ROUTES } from 'constants/common';

export const userLogout = (navigate: (path: string) => void) => {
    navigate(ROUTES.LOGIN);
    setTimeout(() => {
        localStorage.clear();
    }, 5);
};

type StorageValue = string | number | boolean | object | null;

export const setLocalStorageItem = (key: string, value: StorageValue): void => {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
};

export const getLocalStorageItem = <T>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
        return null;
    }
};

// const profileID = getLocalStorageItem<string>('profileID');
// const userRole = getLocalStorageItem<string>('role');
// const accessToken = getLocalStorageItem<string>('accessToken');

export const getUserRole = (): string | null => {
    return localStorage.getItem('role');
};

export const hasRole = (role: string): boolean => {
    const userRole = getUserRole();
    return userRole === role;
};
