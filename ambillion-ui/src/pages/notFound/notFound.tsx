import { ROUTES } from 'constants/common';
import { useNavigate } from 'react-router-dom';

/**
 * A functional component that displays a 404 Not Found page.
 *
 * @component
 * @example
 * return (
 *   <NotFound />
 * )
 */
export const NotFound = () => {
    // Initialize the navigate function from react-router-dom
    const navigate = useNavigate();
    return (
        <div id="main-wrapper">
            <div className="position-relative overflow-hidden min-vh-100 w-100 d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className="row justify-content-center w-100">
                        <div className="col-lg-4">
                            <div className="text-center">
                                <img
                                    src="../assets/images/backgrounds/errorimg.svg"
                                    alt="ample-img"
                                    className="img-fluid mb-3"
                                    width="400"
                                />
                                <h1 className="fw-semibold mb-7 fs-9">Opps! 404</h1>
                                <h4 className="fw-semibold mb-7">page not found</h4>
                                <a
                                    className="sidebar-link btn btn-primary"
                                    id="get-url"
                                    role="button"
                                    onClick={() => {
                                        navigate(ROUTES.LOGIN);
                                    }}
                                >
                                    Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
