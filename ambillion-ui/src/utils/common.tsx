/* eslint-disable @typescript-eslint/no-explicit-any */
import { ROUTES } from 'constants/common';
import { removeLocalStorage } from './localStorage';
import { ProductCustomField } from 'reduxSaga/modules/product-module/type/types';

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

export const getProductCustomeFields = (customeFields: any): ProductCustomField[] => {
    const environment = process.env.REACT_APP_NODE_ENV;

    if (!customeFields) {
        return []; // Return an empty array if customeFields is undefined or null
    }

    if (typeof customeFields === 'string') {
        // If customeFields is a string (expected in development environment)
        if (environment === 'development') {
            try {
                return JSON.parse(customeFields) as ProductCustomField[];
            } catch (error) {
                return [];
            }
        }
        // If the string format is unexpected, return an empty array
        return [];
    } else if (Array.isArray(customeFields)) {
        // If customeFields is already an array (expected in production environment)
        if (environment === 'production') {
            return customeFields as ProductCustomField[];
        }
        // If the array format is unexpected, return an empty array
        return [];
    } else if (environment === 'production' && customeFields.product_custom_fields) {
        // Handle the case where customeFields is an object with product_custom_fields property
        return customeFields.product_custom_fields as ProductCustomField[];
    }

    return []; // Default to an empty array if none of the conditions are met
};
