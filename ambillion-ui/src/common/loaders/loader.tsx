import React from 'react';

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
