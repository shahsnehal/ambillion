import { ROUTES } from 'constants/common';
import { getUserRole } from 'global/globalFunction';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

type ProtectedRouteProps = {
    allowedRoles: string[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const isAuthenticated = localStorage.getItem('accessToken');
    const userRole = getUserRole();

    if (!isAuthenticated) {
        toast.error('You are not authenticated. Please log in.');
        return <Navigate to={ROUTES.LOGIN} />;
    }

    if (!allowedRoles.includes(userRole || '')) {
        return <Navigate to={ROUTES.NOT_AUTHORIZES} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
