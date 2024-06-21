import { Loader } from 'common/loaders/loader';
import Layout from 'components/common/layouts/layouts';
import { ROUTES } from 'constants/common';
import { DashboardPage } from 'pages/dashboard/dashboard';
import { ErrorBoundary } from 'pages/errors/error';
import { ForgotPasswordPage } from 'pages/forgotPassword/forgotPassword';
import { LoginPage } from 'pages/login/login';
import { NotFound } from 'pages/notFound/notFound';
import { RegisterPage } from 'pages/register/register';
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
                                    <Route path={ROUTES.BASEPATH} element={<LoginPage />} />
                                    <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                                    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                                    <Route
                                        path={ROUTES.FORGOT_PASSWORD}
                                        element={<ForgotPasswordPage />}
                                    />
                                    <Route
                                        path={ROUTES.DASHBOARD}
                                        element={
                                            <Layout>
                                                <DashboardPage />
                                            </Layout>
                                        }
                                    />
                                    <Route path="*" element={<NotFound />} />
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
