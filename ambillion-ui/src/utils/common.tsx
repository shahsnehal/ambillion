/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { localStorageKey, ROUTES, userDocumentTypes } from 'constants/common';
import { useState, useEffect } from 'react';
import { getLocalStorage, removeLocalStorage } from './localStorage';
import {
    ProductCustomField,
    ProductDocumentsProps
} from 'reduxSaga/modules/product-module/type/types';
import CryptoJS from 'crypto-js';
import { UserDocumentsWrapperProps } from 'reduxSaga/modules/userDocuments-module/type/types';
import ViewDocuments from 'components/documents/viewDocuments';

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
            if (Object.hasOwn(obj, key)) {
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
        const accessToken = getLocalStorage(localStorageKey.JWT_TOKEN); // Get the JWT token
        const response = await await fetch(fileUrl, {
            method: 'GET',
            credentials: 'include', // Include credentials (cookies) for authentication
            headers: {
                Authorization: `Bearer ${accessToken}` // Assuming you're using a Bearer token for auth
            }
        });
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
        return ''; // Return an empty string if error occurs
    }
};
/**
 * Custom hook for debouncing a value.
 *
 * @param value - The input value to debounce.
 * @param delay - The delay in milliseconds before updating the state.
 * @returns The debounced value.
 */
export const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Clean up the timeout if the value changes before the delay.
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

/**
 * UserDocumentsWrapper Component
 * This component transforms raw document data into a format compatible with ViewDocuments.
 *
 * @param documents - The raw documents to be transformed.
 * @param className - An optional custom CSS class to apply to the component.
 *
 * @returns A ViewDocuments component with transformed documents or a message if no documents are available.
 */
export const UserDocumentsWrapper: React.FC<UserDocumentsWrapperProps> = ({
    documents,
    className = ''
}) => {
    // If no documents are provided or the documents object is empty, return a message.
    if (!documents || Object.keys(documents).length === 0) {
        return <div>No Documents Available</div>;
    }

    // Transform the raw userDocuments into the ProductDocumentsProps format.
    const mappedDocuments: ProductDocumentsProps[] = documents.map((doc) => ({
        document_id: doc.documentName,
        document_name: doc.documentName,
        filetype: doc.documentType,
        contentpath: doc.documentData,
        audit_timestamp: doc.auditTimestamp || new Date().toISOString(),
        created_by: '',
        role: '',
        base64Data: doc.documentData
    }));

    // Return the ViewDocuments component with the mapped documents and optional custom className
    return <ViewDocuments className={className} documents={mappedDocuments} />;
};

/**
 * Checks if the user has all the required documents.
 *
 * This function compares the list of user documents against a set of required document types
 * and returns true if all required documents are present, otherwise false.
 *
 * @param userDocuments - An array of user documents to be checked. Each document is expected
 *                        to have a `filetype` property that specifies the document type.
 *
 * @returns A boolean indicating whether all required documents are present (`true` if all required documents are found, `false` otherwise).
 */
export const hasAllRequiredDocuments = (userDocuments: Array<any>): boolean => {
    const requiredDocuments = [
        userDocumentTypes.PAN_CARD,
        userDocumentTypes.GST_COPY,
        userDocumentTypes.BANK_AD_CODE,
        userDocumentTypes.IEC,
        userDocumentTypes.KYC_DOCUMENTS,
        userDocumentTypes.KYC_FORMAT
    ];

    const userDocumentTypesInResponse = userDocuments.map((doc) => doc.filetype);

    // Check if all required documents are present
    return requiredDocuments.every((docType) => userDocumentTypesInResponse.includes(docType));
};
