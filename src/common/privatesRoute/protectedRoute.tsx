import { localStorageKey, ROUTES } from 'constants/common';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getLocalStorage } from 'utils/localStorage';
import { logout } from 'utils/common';

type ProtectedRouteProps = {
    allowedRoles: string[];
};

/**
 * ProtectedRoute component that guards access to routes based on user roles and JWT token validity.
 *
 * This component checks if the user has a valid JWT token and if their role is included in the allowed roles.
 * If the token is expired or the user's role is not authorized, it redirects to the appropriate page.
 * If the user is not authenticated (no token), it redirects to the login page.
 * If the user is authenticated and authorized, it renders the child components.
 *
 * @param {ProtectedRouteProps} props - The props object containing allowed roles.
 * @returns {React.ReactElement} A React element that conditionally renders based on authentication and authorization status.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const userProfile = getLocalStorage(localStorageKey.USER_PROFILE) || {};
    const { role_name: userRole } = userProfile || null;
    const jwtToken = getLocalStorage(localStorageKey.JWT_TOKEN);
    if (jwtToken) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decodedJwtToken: any = jwtDecode(jwtToken);
        const currentTime = Date.now() / 1000;
        if (decodedJwtToken?.exp < currentTime) {
            // Logout the user if the JWT token is expired
            logout();
        } else if (!allowedRoles.includes(userRole || '')) {
            // Redirect to "Not Authorized" page if the user's role is not permitted
            return <Navigate to={ROUTES.NOT_AUTHORIZES} />;
        }
    } else {
        // Redirect to login page if no JWT token is found
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    // Render the child components if the user is authenticated and authorized
    return <Outlet />;
};

export default ProtectedRoute;
