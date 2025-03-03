import { Icon } from '@iconify/react';
import { localStorageKey, ROUTES } from 'constants/common';
import { logout } from 'utils/common';
import { getLocalStorage } from 'utils/localStorage';
import logo from 'assets/images/logo-icon.svg';
import { useNavigate } from 'react-router-dom';

/**
 * Header component that displays the top navigation bar with user profile and sidebar toggle.
 *
 * @component
 * @returns {JSX.Element} The rendered Header component.
 *
 * @example
 * <Header />
 */
export const Header = () => {
    // Retrieve user profile from localStorage
    const userProfile = getLocalStorage(localStorageKey.USER_PROFILE);
    const { name: userName, email, role_name: roleName, profile_image: profileImage } = userProfile;
    const navigate = useNavigate();

    /**
     * Handles logout action by calling the logout function.
     */
    const handleLogout = () => {
        logout();
    };

    const handleViewProfile = () => {
        navigate(ROUTES.PROFILE);
    };

    /**
     * Toggles the sidebar visibility and adjusts sidebar type attribute.
     */
    const handleSidebar = () => {
        const mainWrapper = document.getElementById('main-wrapper');
        if (mainWrapper) {
            mainWrapper.classList.toggle('show-sidebar');
        }
        const dataTheme = document.body.getAttribute('data-sidebartype');
        if (dataTheme === 'full') {
            document.body.setAttribute('data-sidebartype', 'mini-sidebar');
        } else {
            document.body.setAttribute('data-sidebartype', 'full');
        }
    };

    return (
        <>
            <header className="topbar custom-topbar card rounded-0 border-0">
                <div className="with-vertical">
                    <nav className="navbar navbar-expand-lg px-0 py-0 justify-content-between">
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="d-none d-lg-block">
                                <div className="brand-logo d-flex align-items-center justify-content-between">
                                    <a className="text-nowrap logo-img d-flex align-items-center gap-6">
                                        <b className="logo-icon">
                                            <i className="wi wi-sunset"></i>
                                            <img
                                                src={logo}
                                                alt="homepage"
                                                width={178}
                                                className="light-logo"
                                            />
                                        </b>
                                    </a>
                                </div>
                            </div>
                            <ul className="navbar-nav align-items-center">
                                <li className="nav-item nav-icon-hover-bg rounded-circle">
                                    <a
                                        className="nav-link sidebartoggler"
                                        id="headerCollapse"
                                        href="javascript:void(0)"
                                        onClick={handleSidebar}
                                    >
                                        <Icon icon="solar:list-broken" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="d-block d-lg-none">
                            <div className="brand-logo d-flex align-items-center justify-content-between">
                                <a
                                    href="javascript:void(0);"
                                    className="text-nowrap logo-img d-flex align-items-center gap-6"
                                >
                                    <b className="logo-icon">
                                        <i className="wi wi-sunset"></i>

                                        <img
                                            src={logo}
                                            alt="homepage"
                                            width={160}
                                            className="light-logo"
                                        />
                                    </b>
                                </a>
                            </div>
                        </div>
                        <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-center">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link"
                                    href="javascript:void(0)"
                                    id="drop2"
                                    aria-expanded="false"
                                >
                                    <img
                                        src={profileImage}
                                        alt="user"
                                        className="profile-pic rounded-circle round-30"
                                    />
                                </a>
                                <div
                                    className="dropdown-menu pt-0 content-dd overflow-hidden pt-0 dropdown-menu-end user-dd"
                                    aria-labelledby="drop2"
                                >
                                    <div
                                        className="profile-dropdown position-relative py-2"
                                        data-simplebar=""
                                    >
                                        <div className="py-3 border-bottom">
                                            <div className="d-flex align-items-center px-3">
                                                <img
                                                    src={profileImage}
                                                    className="rounded"
                                                    width="50"
                                                    height="50"
                                                    alt="ample-img"
                                                />
                                                <div className="ms-1">
                                                    <h5 className="mb-0 fs-3">
                                                        {userName} ({''} {roleName} {''})
                                                    </h5>
                                                    <p className="mb-0 text-muted">{email}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <li className="dropdown-item d-flex align-items-center cursor-link">
                                            <Icon
                                                icon="carbon:user-profile"
                                                className="me-2 fs-5"
                                            />
                                            <a
                                                onClick={handleViewProfile}
                                                className="text-decoration-none"
                                            >
                                                View Profile
                                            </a>
                                        </li>
                                        <li className="dropdown-item d-flex align-items-center cursor-link">
                                            <Icon
                                                icon="solar:logout-2-outline"
                                                className="me-2 fs-5"
                                            />
                                            <a
                                                onClick={handleLogout}
                                                className="text-decoration-none"
                                            >
                                                Sign Out
                                            </a>
                                        </li>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <aside className="left-sidebar with-horizontal">
                <div>
                    <nav id="sidebarnavh" className="sidebar-nav scroll-sidebar container-fluid">
                        <ul id="sidebarnav">
                            <li className="sidebar-item">
                                <a
                                    className="sidebar-link has-arrow"
                                    href="javascript:void(0)"
                                    aria-expanded="false"
                                >
                                    <span className="d-flex">
                                        <Icon icon="solar:screencast-2-outline" className="fs-6" />
                                    </span>
                                    <span className="hide-menu">DASHBOARD</span>
                                </a>
                                <ul aria-expanded="false" className="collapse first-level">
                                    <li className="sidebar-item">
                                        <a
                                            href="javascript:void(0)"
                                            className="sidebar-link sublink"
                                        >
                                            <div className="round-16 d-flex align-items-center justify-content-center">
                                                <Icon icon="solar:stop-circle-line-duotone" />
                                            </div>
                                            <span className="hide-menu">USER LIST</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-item">
                                        <a href="index2.html" className="sidebar-link sublink">
                                            <div className="round-16 d-flex align-items-center justify-content-center">
                                                <Icon icon="solar:stop-circle-line-duotone" />
                                            </div>
                                            <span className="hide-menu">SERVICES</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-item">
                                        <a
                                            href="javascript:void(0)"
                                            className="sidebar-link sublink"
                                        >
                                            <div className="round-16 d-flex align-items-center justify-content-center">
                                                <Icon icon="solar:stop-circle-line-duotone" />
                                            </div>
                                            <span className="hide-menu">FAQ</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
};
