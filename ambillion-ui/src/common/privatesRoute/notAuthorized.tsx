import React from 'react';
import { localStorageKey, ROUTES } from 'constants/common';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from 'utils/localStorage';

/**
 * Component for displaying a "Not Authorized" page.
 *
 * This component shows a 401 error message indicating that access is denied.
 * It provides a button that navigates the user to either the products page or the login page,
 * depending on the presence of a JWT token in local storage.
 *
 * @returns {React.FC} The NotAuthorized functional component.
 */
export const NotAuthorized: React.FC = () => {
    const navigate = useNavigate();
    // Retrieve JWT token from local storage.
    const jwtToken = getLocalStorage(localStorageKey.JWT_TOKEN);

    /**
     * Handles navigation based on the presence of a JWT token.
     *
     * Navigates to the products page if a JWT token is present,
     * otherwise navigates to the login page.
     */
    const handleNavigation = () => {
        if (jwtToken) {
            navigate(ROUTES.PRODUCTS);
        } else {
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
                                <button
                                    className="sidebar-link btn btn-primary"
                                    id="get-url"
                                    onClick={handleNavigation}
                                >
                                    Go to Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
