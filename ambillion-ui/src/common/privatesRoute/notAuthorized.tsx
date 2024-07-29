import React from 'react';
import { localStorageKey, ROUTES, userRoles } from 'constants/common';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from 'utils/localStorage';

export const NotAuthorized: React.FC = () => {
    const navigate = useNavigate();
    const userProfile = getLocalStorage(localStorageKey.USER_PROFILE);
    const handleNavigation = () => {
        const { role_name: userRole } = userProfile;
        switch (userRole) {
            case userRoles.ADMIN:
                navigate(ROUTES.USERS);
                break;
            case userRoles.MANUFACTURER:
                navigate(ROUTES.PRODUCTSLIST);
                break;
            case userRoles.OFFICER:
                navigate(ROUTES.PRODUCTS);
                break;
            default:
                navigate(ROUTES.LOGIN);
        }
    };

    return (
        <div id="main-wrapper">
            <div className="position-relative overflow-hidden min-vh-100 w-100 d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className="row justify-content-center w-100">
                        <div className="col-lg-4">
                            <div className="text-center">
                                <h1 className="fw-semibold mb-3 fs-9">401</h1>
                                <h4 className="fw-semibold mb-7">Access Denied</h4>
                                <p className="mb-4">We are sorry, your request is unauthorized.</p>
                                <a
                                    className="sidebar-link btn btn-primary"
                                    id="get-url"
                                    role="button"
                                    onClick={handleNavigation}
                                >
                                    Go to Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
