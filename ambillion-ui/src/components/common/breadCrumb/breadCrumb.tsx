import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type BreadcrumbProps = {
    title: string;
};

/**
 * Breadcrumb component that displays the current path as a breadcrumb trail.
 *
 * @component
 * @param {BreadcrumbProps} props - Component props.
 * @param {string} props.title - The title to display on the breadcrumb.
 * @returns {JSX.Element} The rendered Breadcrumb component.
 *
 * @example
 * <Breadcrumb title="Dashboard" />
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({ title }) => {
    const location = useLocation();
    const navigate = useNavigate();
    // Split the current pathname into segments, excluding numeric values
    const pathnames = location.pathname.split('/').filter((x) => x && isNaN(Number(x)));

    return (
        <div className="shadow-none position-relative overflow-hidden mb-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <h5 className="mb-0 fw-semibold text-uppercase">{title}</h5>
                <nav aria-label="breadcrumb" className="mt-2 mt-sm-0">
                    <ol className="breadcrumb d-flex flex-wrap align-items-center">
                        {pathnames.map((value, index) => {
                            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                            const isLast = index === pathnames.length - 1;

                            return (
                                <li
                                    key={to}
                                    className={`breadcrumb-item ${!isLast ? 'text-primary' : ''}`}
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {isLast ? (
                                        <span>
                                            {value.charAt(0).toUpperCase() + value.slice(1)}
                                        </span>
                                    ) : (
                                        <a
                                            className="text-decoration-none text-primary cursor-link"
                                            onClick={() => navigate(to)}
                                        >
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
