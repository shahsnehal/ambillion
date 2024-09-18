/* eslint-disable @typescript-eslint/no-explicit-any */
import { EncryptStorage } from 'encrypt-storage';

// Initialize encryption storage with a key and prefix.
const key: string = process.env.REACT_APP_KEY || '';
export const encryptStorage = new EncryptStorage(key, {
    prefix: '@ambillion'
});

/**
 * Stores an item in local storage with encryption.
 *
 * @param {string} key - The key under which to store the item.
 * @param {string | object} data - The data to store. Can be a string or an object.
 */
export const setLocalStorage = (key: string, data: string | object) => {
    encryptStorage.setItem(key, data);
};

/**
 * Retrieves an item from local storage with decryption.
 *
 * @param {string} key - The key of the item to retrieve.
 * @returns {any} The retrieved item, or null if an error occurs.
 */
export const getLocalStorage = (key: string) => {
    try {
        const item = encryptStorage.getItem<any>(key);
        return item;
    } catch (error) {
        // Clear storage if an error occurs during retrieval.
        encryptStorage.clear();
        return null;
    }
};

/**
 * Clears all items from local storage.
 */
export const removeLocalStorage = () => {
    encryptStorage.clear();
};
