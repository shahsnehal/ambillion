import { Icon } from '@iconify/react';
import { Header } from './header/header';
import { Breadcrumb } from '../breadCrumb/breadCrumb';
import { localStorageKey, ROUTES, userRoles } from 'constants/common';
import { useNavigate, useLocation } from 'react-router-dom';
import { Footer } from './footer/footer';
import { getLocalStorage } from 'utils/localStorage';

export const Layout = ({ children, title }: { children: React.ReactNode; title: string }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const userProfile = getLocalStorage(localStorageKey.USER_PROFILE);
    const { first_name: Name, role_name: userRole } = userProfile;
    const isActive = (route: string) => location.pathname.startsWith(route);

    return (
        <div id="main-wrapper">
            <aside className="left-sidebar with-vertical">
                <div>
                    <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                        <ul id="sidebarnav">
                            <li className="sidebar-item sidebar-profile pt-2">
                                <a
                                    className="sidebar-link has-arrow opacity-100 gap-2"
                                    href="javascript:void(0)"
                                    aria-expanded="false"
                                >
                                    <span className="d-flex">
                                        <img
                                            src="assets/images/profile/user-1.jpg"
                                            className="rounded"
                                            width="30"
                                            alt="user"
                                        />
                                    </span>
                                    <span className="hide-menu fw-medium">{Name}</span>
                                </a>
                            </li>
                            <li className="nav-small-cap">
                                <Icon
                                    icon="solar:menu-dots-bold"
                                    className="nav-small-cap-icon fs-4"
                                />
                                <span className="hide-menu">HOME</span>
                            </li>

                            {userRole === userRoles.ADMIN && (
                                <li className="sidebar-item custom-sidebar-link">
                                    <a
                                        className={`sidebar-link ${isActive(ROUTES.USERS) ? 'active' : ''}`}
                                        id="get-url"
                                        onClick={() => navigate(ROUTES.USERS)}
                                    >
                                        <Icon
                                            icon="solar:user-circle-line-duotone"
                                            className="aside-icon"
                                        />
                                        <span className="hide-menu">USERS</span>
                                    </a>
                                </li>
                            )}

                            <li className="sidebar-item custom-sidebar-link">
                                <a
                                    className={`sidebar-link ${isActive(ROUTES.PRODUCTS) ? 'active' : ''}`}
                                    id="get-url"
                                    onClick={() => navigate(ROUTES.PRODUCTS)}
                                >
                                    <Icon icon="gridicons:product" className="aside-icon" />
                                    <span className="hide-menu">PRODUCTS</span>
                                </a>
                            </li>

                            <li className="sidebar-item custom-sidebar-link">
                                <a className="sidebar-link" aria-expanded="false">
                                    <div className="d-flex">
                                        <Icon icon="solar:question-circle-linear" />
                                    </div>
                                    <span className="hide-menu">FAQ</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
            <div className="page-wrapper custom-page-wrapper">
                <Header />
                <div className="body-wrapper">
                    <div className="container-fluid">
                        <Breadcrumb title={title} />
                        <div className="row">{children}</div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Layout;
