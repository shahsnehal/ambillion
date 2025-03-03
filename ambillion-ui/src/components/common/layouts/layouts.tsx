import { Icon } from '@iconify/react';
import { Header } from './header/header';
import { Breadcrumb } from '../breadCrumb/breadCrumb';
import { localStorageKey, ROUTES, userRoles } from 'constants/common';
import { useNavigate, useLocation } from 'react-router-dom';
import { Footer } from './footer/footer';
import { getLocalStorage } from 'utils/localStorage';
import { hasAllRequiredDocuments } from 'utils/common';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reduxSaga/config/store';
import { useEffect } from 'react';
import { fetchUserDocumentsRequest } from 'reduxSaga/modules/userDocuments-module/action/actions';

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
    const dispatch = useDispatch();
    const location = useLocation();
    // Retrieve user profile from localStorage
    const userProfile = getLocalStorage(localStorageKey.USER_PROFILE);
    const {
        first_name: Name,
        last_name: lastName,
        role_name: userRole,
        profile_image: profileImage,
        userprofile_id: userId
    } = userProfile;
    const { userDocuments } = useSelector((state: RootState) => state.userDocumentsModule);

    /**
     * Determines if the given route is currently active based on the URL path.
     *
     * @param {string} route - The route to check.
     * @returns {boolean} True if the route is active, false otherwise.
     */
    const isActive = (route: string) => location.pathname.startsWith(route);

    /**
     * Fetches user documents when the user is a manufacturer and no documents are present.
     */
    useEffect(() => {
        if (userRole === userRoles.MANUFACTURER) {
            dispatch(fetchUserDocumentsRequest(userId));
        }
    }, []);

    const handleNavigate = () => {
        if (userRole === userRoles.MANUFACTURER) {
            const allDocumentsPresent = hasAllRequiredDocuments(userDocuments);

            if (allDocumentsPresent) {
                navigate(ROUTES.PRODUCTS);
            } else {
                toast.error('Please Upload Your Documents Before Accessing The Products Page.');
            }
        } else {
            // If the user is not a manufacturer, navigate directly to PRODUCTS
            navigate(ROUTES.PRODUCTS);
        }
    };

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
                                    onClick={handleNavigate}
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

                            {userRole === userRoles.ADMIN && (
                                <li className="sidebar-item cursor-link">
                                    <a
                                        className={`sidebar-link ${isActive(ROUTES.COUNTRIES) ? 'active' : ''}`}
                                        id="get-url"
                                        onClick={() => navigate(ROUTES.COUNTRIES)}
                                    >
                                        <Icon icon="mdi:flag" className="aside-icon fs-6" />
                                        <span className="hide-menu">COUNTRIES</span>
                                    </a>
                                </li>
                            )}

                            {userRole === userRoles.ADMIN && (
                                <li className="sidebar-item cursor-link">
                                    <a
                                        className={`sidebar-link ${isActive(ROUTES.HSN_CODES) ? 'active' : ''}`}
                                        id="get-url"
                                        onClick={() => navigate(ROUTES.HSN_CODES)}
                                    >
                                        <Icon icon="mdi:numeric" className="aside-icon fs-6" />
                                        <span className="hide-menu">HSN CODES</span>
                                    </a>
                                </li>
                            )}
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
