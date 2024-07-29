import { ROUTES } from 'constants/common';
import { removeLocalStorage } from './localStorage';

export const logout = () => {
    removeLocalStorage();
    window.location.href = ROUTES.BASEPATH;
};
