import React, { Component } from 'react';

interface ErrorBoundaryProps {
    children?: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    refreshThePage = () => {
        window.location.reload();
    };

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // You can log the error here, or send it to an error reporting service
        console.log(error, errorInfo);
    }

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
