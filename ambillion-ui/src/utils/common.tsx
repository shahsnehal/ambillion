/* eslint-disable @typescript-eslint/no-explicit-any */
import { ROUTES } from 'constants/common';
import { removeLocalStorage } from './localStorage';
import { ProductCustomField } from 'reduxSaga/modules/product-module/type/types';
import CryptoJS from 'crypto-js';
/**
 * Logs out the user by clearing local storage and redirecting to the base path.
 */
export const logout = () => {
    removeLocalStorage();
    window.location.href = ROUTES.BASEPATH;
};

/**
 * Trims whitespace from string values in an object or array.
 *
 * This function recursively trims string values and handles both objects and arrays.
 *
 * @param {any} obj - The object or array to trim.
 * @returns {any} A new object or array with trimmed string values.
 */
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

/**
 * Gets the product custom fields from a string or array, depending on the environment.
 *
 * This function parses `customeFields` based on the environment and returns an array of `ProductCustomField`.
 *
 * @param {any} customeFields - The custom fields, which can be a string, array, or object.
 * @returns {ProductCustomField[]} An array of `ProductCustomField` or an empty array if parsing fails.
 */
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
        console.log('from if');
        if (environment === 'production') {
            return customeFields as ProductCustomField[];
        }
        // If the array format is unexpected, return an empty array
        return customeFields;
    } else if (environment === 'production' && customeFields.product_custom_fields) {
        // Handle the case where customeFields is an object with product_custom_fields property
        return customeFields.product_custom_fields as ProductCustomField[];
    }

    return []; // Default to an empty array if none of the conditions are met
};

/**
 * Encrypts data using AES encryption.
 * @param {any} data - The data to be encrypted.
 * @returns {object} The encrypted payload including the salt, IV, and ciphertext.
 */
export const encryptData = (data: any) => {
    const secretKey = process.env.REACT_APP_ENCRYPTION_KEY ?? '';
    const salt = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    const iv = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    const key = CryptoJS.PBKDF2(secretKey, CryptoJS.enc.Hex.parse(salt), {
        keySize: 128 / 32,
        iterations: 1000
    });

    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
        iv: CryptoJS.enc.Hex.parse(iv)
    });
    return {
        salt,
        iv,
        ciphertext: encrypted.ciphertext.toString(CryptoJS.enc.Base64)
    };
};

/**
 * Decrypts data using AES decryption.
 * @param {object} encryptedData - The encrypted payload including salt, IV, and ciphertext.
 * @returns {any} The decrypted data.
 */
export const decryptData = (encryptedData: { salt: string; iv: string; ciphertext: string }) => {
    const { salt, iv, ciphertext } = encryptedData;
    const secretKey = process.env.REACT_APP_ENCRYPTION_KEY ?? '';
    const key = CryptoJS.PBKDF2(secretKey, CryptoJS.enc.Hex.parse(salt), {
        keySize: 128 / 32,
        iterations: 1000
    });

    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Base64.parse(ciphertext) } as any,
        key,
        { iv: CryptoJS.enc.Hex.parse(iv) }
    );

    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};

export const getBase64FromFileUrl = async (fileUrl: string): Promise<string> => {
    try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string | null;
                if (result) {
                    resolve(result.split(',')[1] || ''); // Ensure it always returns a string
                } else {
                    reject(new Error('Failed to read file as base64'));
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error fetching or converting file to base64:', error);
        return ''; // Return an empty string if error occurs
    }
};
