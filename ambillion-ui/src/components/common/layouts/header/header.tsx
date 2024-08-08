import { Icon } from '@iconify/react';
import { localStorageKey } from 'constants/common';
import { logout } from 'utils/common';
import { getLocalStorage } from 'utils/localStorage';

export const Header = () => {
    const userProfile = getLocalStorage(localStorageKey.USER_PROFILE);
    const { name: userName, email, role_name: roleName, profile_image: profileImage } = userProfile;

    const handleLogout = () => {
        logout();
    };

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
                    <nav className="navbar navbar-expand-lg px-0 py-0">
                        <div className="d-none d-lg-block">
                            <div className="brand-logo d-flex align-items-center justify-content-between">
                                <a className="text-nowrap logo-img d-flex align-items-center gap-6">
                                    <b className="logo-icon">
                                        <i className="wi wi-sunset"></i>
                                        <img
                                            src="assets/images/logos/logo-icon.svg"
                                            alt="homepage"
                                            width={210}
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
                        <div className="d-block d-lg-none">
                            <div className="brand-logo d-flex align-items-center justify-content-between">
                                <a
                                    href="javascript:void(0);"
                                    className="text-nowrap logo-img d-flex align-items-center gap-6"
                                >
                                    <b className="logo-icon">
                                        <i className="wi wi-sunset"></i>

                                        <img
                                            src="assets/images/logos/logo-icon.svg"
                                            alt="homepage"
                                            width={160}
                                            className="light-logo"
                                        />
                                    </b>
                                </a>
                            </div>
                        </div>
                        <a
                            className="navbar-toggler p-0 border-0 nav-icon-hover-bg rounded-circle"
                            href="javascript:void(0)"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="p-2">
                                <i className="ti ti-dots fs-7"></i>
                            </span>
                        </a>
                        <div
                            className="collapse navbar-collapse justify-content-end"
                            id="navbarNav"
                        >
                            <div className="d-flex align-items-center justify-content-between">
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
                                                className="profile-pic rounded round-30"
                                            />
                                        </a>
                                        <div
                                            className="dropdown-menu pt-0 content-dd overflow-hidden pt-0 dropdown-menu-end user-dd"
                                            aria-labelledby="drop2"
                                        >
                                            <div
                                                className="profile-dropdown position-relative"
                                                data-simplebar=""
                                            >
                                                <div className=" py-3 border-bottom">
                                                    <div className="d-flex align-items-center px-3">
                                                        <img
                                                            src={profileImage}
                                                            className="rounded"
                                                            width="50"
                                                            height="50"
                                                            alt="user"
                                                        />
                                                        <div className="ms-3">
                                                            <h5 className="mb-0 fs-4">
                                                                {userName} ( {roleName} )
                                                            </h5>
                                                            <p className="mb-0 d-flex align-items-center text-muted">
                                                                {email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="message-body pb-3">
                                                    <div className="px-3 pt-3">
                                                        <div className="h6 mb-0 dropdown-item py-8 px-3 rounded-2 link">
                                                            <a
                                                                href="javascript:void(0)"
                                                                className=" d-flex  align-items-center "
                                                            >
                                                                My Profile
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="px-3">
                                                        <div className="h6 mb-0 dropdown-item py-8 px-3 rounded-2 link">
                                                            <a
                                                                href="javascript:void(0)"
                                                                className=" d-flex  align-items-center  "
                                                            >
                                                                Account Settings
                                                            </a>
                                                        </div>
                                                        <div className="h6 mb-0 dropdown-item py-8 px-3 rounded-2 link">
                                                            <a
                                                                onClick={handleLogout}
                                                                className="d-flex align-items-center custom-sidebar-link"
                                                            >
                                                                Sign Out
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
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
