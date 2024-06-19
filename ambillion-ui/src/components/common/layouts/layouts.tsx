// import Header from './Header';
// import SideBar from './SideBar';

import { Icon } from '@iconify/react';
import { Header } from './header/header';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Layout = () => (
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
                            <a className="sidebar-link" href="main/index2.html">
                                <Icon
                                    icon="solar:user-circle-line-duotone"
                                    className="aside-icon"
                                />
                                <span className="hide-menu">USER LIST</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a
                                className="sidebar-link"
                                // href="main/page-faq.html"
                                aria-expanded="false"
                            >
                                <div className="d-flex">
                                    <Icon icon="solar:question-circle-linear" />
                                </div>
                                <span className="hide-menu">SERVICES</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a
                                className="sidebar-link"
                                // href="main/page-faq.html"
                                aria-expanded="false"
                            >
                                <div className="d-flex">
                                    <Icon icon="solar:question-circle-linear" />
                                </div>
                                <span className="hide-menu">FAQ</span>
                            </a>
                        </li>
                        {/* <li className="sidebar-item">
                            <a className="sidebar-link" href="main/index3.html">
                                <Icon icon="solar:box-minimalistic-linear" className="aside-icon" />
                                <span className="hide-menu">Analytical</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="main/index4.html">
                                <Icon icon="solar:buildings-2-linear" className="aside-icon" />
                                <span className="hide-menu">Campaign</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="main/index5.html">
                                <Icon icon="solar:basketball-linear" className="aside-icon" />
                                <span className="hide-menu">Modern</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="main/index6.html">
                                <Icon icon="solar:cart-large-2-linear" className="aside-icon" />
                                <span className="hide-menu">Ecommerce</span>
                            </a>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </aside>
        <Header />
    </div>
);

export default Layout;
