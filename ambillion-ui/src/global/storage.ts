// globalSetLocalStorage
export const setLocalStorage = (name: string, value: string): void => {
    localStorage.setItem(name, value);
};

// globalGetLocalStorage
export const getLocalStorage = <T>(key: string): T | null => {
    let storageData = localStorage.getItem(key) ?? null;
    if (storageData) {
        const isJSONstr = isValidJson(storageData);
        if (isJSONstr) storageData = JSON.parse(storageData);
    }
    return storageData as T | null;
};

// globalRemoveLocalStorage
export const removeLocalStorage = (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

// globalFunction to check if a string is valid JSON
const isValidJson = (data: string): boolean => {
    try {
        JSON.parse(data);
        return true;
    } catch (error) {
        return false;
    }
};
