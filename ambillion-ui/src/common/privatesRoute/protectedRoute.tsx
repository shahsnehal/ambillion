import { localStorageKey, ROUTES } from 'constants/common';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getLocalStorage } from 'utils/localStorage';
import { logout } from 'utils/common';

type ProtectedRouteProps = {
    allowedRoles: string[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const userProfile = getLocalStorage(localStorageKey.USER_PROFILE) || {};
    const { role_name: userRole } = userProfile || null;
    const jwtToken = getLocalStorage(localStorageKey.JWT_TOKEN);
    if (jwtToken) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decodedJwtToken: any = jwtDecode(jwtToken);
        const currentTime = Date.now() / 1000;
        if (decodedJwtToken?.exp < currentTime) {
            logout();
        } else if (!allowedRoles.includes(userRole || '')) {
            return <Navigate to={ROUTES.NOT_AUTHORIZES} />;
        }
    } else {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
