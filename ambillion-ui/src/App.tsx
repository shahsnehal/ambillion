import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Loader } from 'common/loaders/loader';
import Layout from 'components/common/layouts/layouts';
import { ProductDetail } from 'components/products/productDetails';
import { ROUTES, userRoles } from 'constants/common';
import { ErrorBoundary } from 'pages/errors/error';
import { ForgotPasswordPage } from 'pages/forgotPassword/forgotPassword';
import { LoginPage } from 'pages/login/login';
import { NotFound } from 'pages/notFound/notFound';
import { ProductsPage } from 'pages/products/products';
import { RegisterPage } from 'pages/register/register';
import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { UsersPage } from 'pages/users/users';
import ProtectedRoute from 'common/privatesRoute/protectedRoute';
import { NotAuthorized } from 'common/privatesRoute/notAuthorized';
import { ProductForm } from 'components/products/productForm';
import { ProductsListPage } from 'pages/officerproductsList/productsList';

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

                                    <Route path="/not-authorized" element={<NotAuthorized />} />
                                    <Route path="*" element={<NotFound />} />

                                    {/* Private routes */}
                                    <Route
                                        element={
                                            <ProtectedRoute allowedRoles={[userRoles.ADMIN]} />
                                        }
                                    >
                                        <Route
                                            path={ROUTES.USERSLIST}
                                            element={
                                                <Layout title="Users">
                                                    <UsersPage />
                                                </Layout>
                                            }
                                        />
                                    </Route>

                                    <Route
                                        element={
                                            <ProtectedRoute
                                                allowedRoles={[
                                                    userRoles.ADMIN,
                                                    userRoles.MANUFACTURER
                                                ]}
                                            />
                                        }
                                    >
                                        <Route
                                            path={ROUTES.PRODUCTSBYUSERID}
                                            element={
                                                <Layout title="product">
                                                    <ProductsPage />
                                                </Layout>
                                            }
                                        />

                                        <Route
                                            path={ROUTES.PRODUCTDETAILS}
                                            element={
                                                <Layout title="product detail">
                                                    <ProductDetail />
                                                </Layout>
                                            }
                                        />
                                    </Route>

                                    <Route
                                        element={
                                            <ProtectedRoute
                                                allowedRoles={[userRoles.MANUFACTURER]}
                                            />
                                        }
                                    >
                                        <Route
                                            path={ROUTES.ADDPRODUCT}
                                            element={
                                                <Layout title="add Product">
                                                    <ProductForm />
                                                </Layout>
                                            }
                                        />

                                        <Route
                                            path={ROUTES.EDITPRODUCT}
                                            element={
                                                <Layout title="Edit Product">
                                                    <ProductForm />
                                                </Layout>
                                            }
                                        />
                                    </Route>

                                    <Route
                                        element={
                                            <ProtectedRoute allowedRoles={[userRoles.OFFICER]} />
                                        }
                                    >
                                        <Route
                                            path={ROUTES.PRODUCTS}
                                            element={
                                                <Layout title="Products">
                                                    <ProductsListPage />
                                                </Layout>
                                            }
                                        />
                                    </Route>
                                </Route>
                                <Route></Route>
                            </>
                        }
                    </Routes>
                </React.Suspense>
            </BrowserRouter>
            <ToastContainer position="top-right" autoClose={2000} />
        </ErrorBoundary>
    );
}

export default App;
