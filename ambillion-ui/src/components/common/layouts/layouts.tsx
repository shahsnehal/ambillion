import { Icon } from '@iconify/react';
import { Header } from './header/header';
import { Breadcrumb } from '../breadCrumb/breadCrumb';
import { localStorageKey, ROUTES, userRoles } from 'constants/common';
import { useNavigate, useLocation } from 'react-router-dom';
import { Footer } from './footer/footer';
import { getLocalStorage } from 'utils/localStorage';

/**
 * Layout component that provides the main structure for the page,
 * including the sidebar, header, breadcrumb, and footer.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered within the layout.
 * @param {string} props.title - The title to be displayed in the breadcrumb.
 * @returns {JSX.Element} The rendered Layout component.
 *
 * @example
 * <Layout title="Dashboard">
 *     <DashboardContent />
 * </Layout>
 */
export const Layout = ({ children, title }: { children: React.ReactNode; title: string }) => {
    const navigate = useNavigate();
    const location = useLocation();
    // Retrieve user profile from localStorage
    const userProfile = getLocalStorage(localStorageKey.USER_PROFILE);
    const {
        first_name: Name,
        last_name: lastName,
        role_name: userRole,
        profile_image: profileImage
    } = userProfile;
    /**
     * Determines if the given route is currently active based on the URL path.
     *
     * @param {string} route - The route to check.
     * @returns {boolean} True if the route is active, false otherwise.
     */
    const isActive = (route: string) => location.pathname.startsWith(route);

    return (
        <div id="main-wrapper">
            <aside className="left-sidebar with-vertical">
                <div>
                    <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                        <ul id="sidebarnav">
                            <li className="sidebar-item sidebar-profile pt-2">
                                <a
                                    className="sidebar-link opacity-100 gap-2"
                                    href="javascript:void(0)"
                                    aria-expanded="false"
                                >
                                    <span className="d-flex">
                                        <img
                                            src={profileImage}
                                            className="rounded"
                                            width="30"
                                            alt="user"
                                        />
                                    </span>
                                    <span className="hide-menu fw-medium">
                                        {Name} {lastName}
                                    </span>
                                </a>
                            </li>
                            <li className="nav-small-cap"></li>

                            {userRole === userRoles.ADMIN && (
                                <li className="sidebar-item cursor-link">
                                    <a
                                        className={`sidebar-link ${isActive(ROUTES.USERS) ? 'active' : ''}`}
                                        id="get-url"
                                        onClick={() => navigate(ROUTES.USERS)}
                                    >
                                        <Icon
                                            icon="solar:user-circle-line-duotone"
                                            className="aside-icon fs-6"
                                        />
                                        <span className="hide-menu">USERS</span>
                                    </a>
                                </li>
                            )}

                            <li className="sidebar-item cursor-link">
                                <a
                                    className={`sidebar-link ${isActive(ROUTES.PRODUCTS) ? 'active' : ''}`}
                                    id="get-url"
                                    onClick={() => navigate(ROUTES.PRODUCTS)}
                                >
                                    <Icon icon="gridicons:product" className="aside-icon fs-6" />
                                    <span className="hide-menu">PRODUCTS</span>
                                </a>
                            </li>

                            {userRole === userRoles.ADMIN && (
                                <li className="sidebar-item cursor-link">
                                    <a
                                        className={`sidebar-link ${isActive(ROUTES.PRODUCT_CATEGORIES) ? 'active' : ''}`}
                                        id="get-url"
                                        onClick={() => navigate(ROUTES.PRODUCT_CATEGORIES)}
                                    >
                                        <Icon icon="bx:category" className="aside-icon fs-6" />
                                        <span className="hide-menu">CATEGORIES</span>
                                    </a>
                                </li>
                            )}

                            {userRole === userRoles.ADMIN && (
                                <li className="sidebar-item cursor-link">
                                    <a
                                        className={`sidebar-link ${isActive(ROUTES.PRODUCT_DOCUMENTTYPE) ? 'active' : ''}`}
                                        id="get-url"
                                        onClick={() => navigate(ROUTES.PRODUCT_DOCUMENTTYPE)}
                                    >
                                        <Icon
                                            icon="mdi:file-document-outline"
                                            className="aside-icon fs-6"
                                        />
                                        <span className="hide-menu">DOCUMENT TYPE</span>
                                    </a>
                                </li>
                            )}

                            {/* <li className="sidebar-item cursor-link">
                                <a className="sidebar-link" aria-expanded="false">
                                    <div className="d-flex">
                                        <Icon
                                            icon="solar:question-circle-linear"
                                            className="aside-icon fs-6"
                                        />
                                    </div>
                                    <span className="hide-menu">FAQ</span>
                                </a>
                            </li> */}
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
