/* eslint-disable @typescript-eslint/no-explicit-any */
import { EncryptStorage } from 'encrypt-storage';
const key: string = process.env.REACT_APP_KEY || '';
export const encryptStorage = new EncryptStorage(key, {
    prefix: '@ambillion'
});

export const setLocalStorage = (key: string, data: string | object) => {
    encryptStorage.setItem(key, data);
};

export const getLocalStorage = (key: string) => {
    try {
        const item = encryptStorage.getItem<any>(key);
        return item;
    } catch (error) {
        encryptStorage.clear();
        return null;
    }
};
export const removeLocalStorage = () => {
    encryptStorage.clear();
};
