import React, { Component } from 'react';

type ErrorBoundaryProps = {
    children?: React.ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

/**
 * A component that catches JavaScript errors in its child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 *
 * @component
 * @example
 * return (
 *   <ErrorBoundary>
 *     <MyComponent />
 *   </ErrorBoundary>
 * )
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    /**
     * @constructor
     * @param {ErrorBoundaryProps} props - Props passed to the ErrorBoundary component.
     */
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    /**
     * Updates the state when an error is caught.
     *
     * @returns {ErrorBoundaryState} Updated state with `hasError: true`.
     */
    static getDerivedStateFromError() {
        return { hasError: true };
    }

    /**
     * Refreshes the page when the refresh button is clicked.
     * Reloads the window to reset the state and UI.
     */
    refreshThePage = () => {
        window.location.reload();
    };

    /**
     * Logs error details to the console or an error reporting service.
     *
     * @param {Error} error - The error that was thrown.
     * @param {React.ErrorInfo} errorInfo - Additional error information such as stack trace.
     */
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // You can log the error here, or send it to an error reporting service
        // eslint-disable-next-line no-console
        console.log(error, errorInfo);
    }

    /**
     * Renders the fallback UI if an error has been caught,
     * otherwise renders the children components.
     *
     * @returns {React.ReactNode} The rendered UI, either the fallback or the children.
     */
    render() {
        if (this.state.hasError) {
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
                                            width="500"
                                        />
                                        <h1 className="fw-semibold mb-7 fs-9">Opps!!!</h1>
                                        <h4 className="fw-semibold mb-7">Something Went Wrong</h4>
                                        <a
                                            className="btn btn-primary"
                                            onClick={this.refreshThePage}
                                            role="button"
                                        >
                                            Refresh
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}
