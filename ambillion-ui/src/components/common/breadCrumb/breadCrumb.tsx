import { ROUTES, userRoles } from 'constants/common';
import { getUserRole } from 'global/globalFunction';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type BreadcrumbProps = {
    title: string;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ title }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // Determine the home route based on user role
    const userRole = getUserRole();
    let homeRoute = ROUTES.DASHBOARD;
    let homeLabel = '';

    if (userRole === userRoles.ADMIN) {
        homeRoute = ROUTES.USERSLIST;
        homeLabel = 'users';
    } else if (userRole === userRoles.MANUFACTURER) {
        homeRoute = ROUTES.PRODUCTSBYUSERID;
        homeLabel = 'productsList';
    } else if (userRole === userRoles.OFFICER) {
        homeRoute = ROUTES.PRODUCTS;
        homeLabel = 'Products';
    }

    return (
        <div className="shadow-none position-relative overflow-hidden mb-4">
            <div className="d-sm-flex d-block justify-content-between align-items-center">
                <h5 className="mb-0 fw-semibold text-uppercase">{title}</h5>
                <nav aria-label="breadcrumb" className="d-flex align-items-center">
                    <ol className="breadcrumb d-flex align-items-center">
                        {pathnames.length > 0 && pathnames[0] !== homeLabel.toLowerCase() && (
                            <li className="breadcrumb-item">
                                <a
                                    className="text-decoration-none custom-sidebar-link"
                                    onClick={() => {
                                        navigate(homeRoute);
                                    }}
                                >
                                    {homeLabel}
                                </a>
                            </li>
                        )}
                        {pathnames.map((value, index) => {
                            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                            const isLast = index === pathnames.length - 1;
                            return (
                                <li
                                    key={to}
                                    className={`breadcrumb-item ${isLast ? 'text-primary' : ''}`}
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {isLast ? (
                                        value.charAt(0).toUpperCase() + value.slice(1)
                                    ) : (
                                        <a className="text-decoration-none" href={to}>
                                            {value.charAt(0).toUpperCase() + value.slice(1)}
                                        </a>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </div>
        </div>
    );
};
