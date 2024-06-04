import { Loader } from 'common/loaders/loader';
import { ROUTES } from 'constants/common';
import { ErrorBoundary } from 'pages/errors/error';
import { RegisterPage } from 'pages/register/register';
// import { RegisterPage } from 'pages/register/register';
import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <React.Suspense fallback={<Loader />}>
                    <Routes>
                        {
                            // Public routes
                            <>
                                <Route element={<Outlet />}>
                                    {/* <Route path={ROUTES.BASEPATH} element={<LoginPage />} /> */}
                                    <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                                </Route>
                                <Route></Route>
                            </>
                        }
                    </Routes>
                </React.Suspense>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
