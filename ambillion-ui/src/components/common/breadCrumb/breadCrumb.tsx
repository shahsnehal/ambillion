import React from 'react';
import { useLocation } from 'react-router-dom';

type BreadcrumbProps = {
    title: string;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ title }) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <div className="shadow-none position-relative overflow-hidden mb-4">
            <div className="d-sm-flex d-block justify-content-between align-items-center">
                <h5 className="mb-0 fw-semibold text-uppercase">{title}</h5>
                <nav aria-label="breadcrumb" className="d-flex align-items-center">
                    <ol className="breadcrumb d-flex align-items-center">
                        <li className="breadcrumb-item">
                            <a className="text-decoration-none" href="/">
                                Home
                            </a>
                        </li>
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
