import { Login } from 'components/login/login';
import { localStorageKey, ROUTES } from 'constants/common';
import { Navigate } from 'react-router-dom';
import { getLocalStorage } from 'utils/localStorage';

export const LoginPage = () => {
    const jwtToken = getLocalStorage(localStorageKey.JWT_TOKEN);
    const redirectPath = ROUTES.PRODUCTS;
    if (jwtToken) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Login />;
};
