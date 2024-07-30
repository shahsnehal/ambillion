export const Loader = () => {
    return (
        <div className="preloader">
            <img
                src="../assets/images/logos/logo-icon.svg"
                alt="loader"
                className="lds-ripple img-fluid"
            />
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
