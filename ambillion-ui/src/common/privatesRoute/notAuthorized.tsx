import React from 'react';
import { ROUTES } from 'constants/common';
import { useNavigate } from 'react-router-dom';

export const NotAuthorized: React.FC = () => {
    const navigate = useNavigate();

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
                                    onClick={() => {
                                        navigate(ROUTES.PRODUCTS);
                                    }}
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
