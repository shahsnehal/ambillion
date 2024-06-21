// import Header from './Header';
// import SideBar from './SideBar';

import { Icon } from '@iconify/react';
import { Header } from './header/header';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Layout = ({ children }: any) => (
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
                                <span className="hide-menu fw-medium">James White </span>
                            </a>
                        </li>
                        <li className="nav-small-cap">
                            <Icon icon="solar:menu-dots-bold" className="nav-small-cap-icon fs-4" />
                            <span className="hide-menu">HOME</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="" id="get-url">
                                <Icon icon="solar:screencast-2-linear" className="aside-icon" />
                                <span className="hide-menu">DASHBOARD</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="javascript:void(0)">
                                <Icon
                                    icon="solar:user-circle-line-duotone"
                                    className="aside-icon"
                                />
                                <span className="hide-menu">USER LIST</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" aria-expanded="false">
                                <div className="d-flex">
                                    <Icon icon="solar:question-circle-linear" />
                                </div>
                                <span className="hide-menu">SERVICES</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
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
                    <div className="shadow-none position-relative overflow-hidden mb-4">
                        <div className="d-sm-flex d-block justify-content-between align-items-center">
                            <h5 className="mb-0 fw-semibold text-uppercase">Dashboard</h5>
                            <nav aria-label="breadcrumb" className="d-flex align-items-center">
                                <ol className="breadcrumb d-flex align-items-center">
                                    <li className="breadcrumb-item">
                                        <a
                                            className="text-decoration-none"
                                            href="javascript:void(0)"
                                        >
                                            Home
                                        </a>
                                    </li>
                                    <li
                                        className="breadcrumb-item text-primary"
                                        aria-current="page"
                                    >
                                        Dashboard
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row">{children}</div>
                </div>
                <footer className="footer py-3 bg-white border-top text-center">
                    All Rights Reserved by Ambillion.
                </footer>
            </div>
        </div>
    </div>
);

export default Layout;
