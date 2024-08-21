/* eslint-disable @typescript-eslint/no-explicit-any */
import { ROUTES } from 'constants/common';
import { removeLocalStorage } from './localStorage';

export const logout = () => {
    removeLocalStorage();
    window.location.href = ROUTES.BASEPATH;
};

export const trimValues = (obj: any): any => {
    if (obj === null || obj === undefined) return obj;

    if (typeof obj === 'string') {
        return obj.trim();
    }

    if (typeof obj === 'object') {
        const trimmedObject: any = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                trimmedObject[key] = trimValues(obj[key]);
            }
        }
        return trimmedObject;
    }

    return obj;
};
