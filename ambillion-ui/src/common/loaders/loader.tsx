import logo from 'assets/images/logo-icon.svg';

export const Loader = () => {
    return (
        <div className="preloader">
            <img src={logo} alt="loader" className="lds-ripple img-fluid" />
        </div>
    );
};

export const CustomLoader = () => {
    return (
        <div className="d-flex justify-content-center mt-4">
            <div className="spinner-border" role="status"></div>
        </div>
    );
};
