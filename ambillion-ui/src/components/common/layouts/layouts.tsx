// import Header from './Header';
// import SideBar from './SideBar';

import { Header } from './header/header';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Layout = (children: any) => (
    <div className="layout">
        <Header />
        {/* <div className="container">
            <div className="main-container">{children} </div>
        </div> */}
    </div>
);

export default Layout;
