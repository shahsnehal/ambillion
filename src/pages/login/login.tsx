import { Login } from 'components/login/login';
import { localStorageKey, ROUTES } from 'constants/common';
import { Navigate } from 'react-router-dom';
import { getLocalStorage } from 'utils/localStorage';

export const LoginPage = () => {
    const jwtToken = getLocalStorage(localStorageKey.JWT_TOKEN);
    const redirectPath = ROUTES.PRODUCTS;
    // Redirect to the products page if a JWT token is present
    if (jwtToken) {
        return <Navigate to={redirectPath} replace />;
    }
    // Render the Login component if no JWT token is present
    return <Login />;
};
