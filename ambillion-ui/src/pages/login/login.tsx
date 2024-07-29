import { Login } from 'components/login/login';
import { localStorageKey, roleRedirects } from 'constants/common';
import { Navigate } from 'react-router-dom';
import { getLocalStorage } from 'utils/localStorage';

export const LoginPage = () => {
    const jwtToken = getLocalStorage(localStorageKey.JWT_TOKEN);
    const userProfile = getLocalStorage(localStorageKey.USER_PROFILE) || {};
    const { role_name: userRole } = userProfile || null;
    const redirectPath = roleRedirects[userRole];
    if (jwtToken) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Login />;
};
