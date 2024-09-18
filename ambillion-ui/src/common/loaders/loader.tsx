import logo from 'assets/images/logo-icon.svg';

/**
 * A functional component that displays a loading spinner with a logo.
 *
 * @returns {JSX.Element} The loader component with an image.
 */
export const Loader = () => {
    return (
        <div className="preloader">
            <img src={logo} alt="loader" className="lds-ripple img-fluid" />
        </div>
    );
};

/**
 * A functional component that displays a custom spinner for loading indication.
 *
 * @returns {JSX.Element} The custom loader component with a spinner.
 */
export const CustomLoader = () => {
    return (
        <div className="d-flex justify-content-center mt-4">
            <div className="spinner-border" role="status"></div>
        </div>
    );
};
