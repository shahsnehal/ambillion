import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Loader } from 'common/loaders/loader';
import Layout from 'components/common/layouts/layouts';
import { ProductDetails } from 'components/products/productDetails';
import { ROUTES, userRoles } from 'constants/common';
import { ErrorBoundary } from 'pages/errors/error';
import { ForgotPasswordPage } from 'pages/forgotPassword/forgotPassword';
import { LoginPage } from 'pages/login/login';
import { NotFound } from 'pages/notFound/notFound';
import { RegisterPage } from 'pages/register/register';
import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { UsersPage } from 'pages/users/users';
import ProtectedRoute from 'common/privatesRoute/protectedRoute';
import { NotAuthorized } from 'common/privatesRoute/notAuthorized';
import { ProductForm } from 'components/products/productForm';
import { ProductsPage } from 'pages/products/products';
import { ProductCategoriesPage } from 'pages/productCategories/productCategories';
import { ProductDocumentTypePage } from 'pages/productDocumentType/productDocumentType';
import { CountriesPage } from 'pages/countries/countries';
import { ProductImportStatusDetails } from 'components/products/ProductImportStatusDetails';
import { HsnCodesPage } from 'pages/hsnCodes/hsnCodes';

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <React.Suspense fallback={<Loader />}>
                    {/* Defining routes for the application */}
                    <Routes>
                        {
                            // Public routes
                            <>
                                {/* Wrapper for public routes */}
                                <Route element={<Outlet />}>
                                    <Route path={ROUTES.BASEPATH} element={<LoginPage />} />
                                    <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                                    <Route path={ROUTES.LOGIN} element={<LoginPage />} />

                                    <Route
                                        path={ROUTES.FORGOT_PASSWORD}
                                        element={<ForgotPasswordPage />}
                                    />

                                    <Route
                                        path={ROUTES.NOT_AUTHORIZES}
                                        element={<NotAuthorized />}
                                    />
                                    <Route path="*" element={<NotFound />} />

                                    {/* Private routes */}

                                    {/* Protected routes for Admin only */}
                                    <Route
                                        element={
                                            <ProtectedRoute allowedRoles={[userRoles.ADMIN]} />
                                        }
                                    >
                                        <Route
                                            path={ROUTES.USERS}
                                            element={
                                                <Layout title="Users">
                                                    <UsersPage />
                                                </Layout>
                                            }
                                        />

                                        <Route
                                            path={ROUTES.PRODUCT_CATEGORIES}
                                            element={
                                                <Layout title="Product Categories">
                                                    <ProductCategoriesPage />
                                                </Layout>
                                            }
                                        />

                                        <Route
                                            path={ROUTES.PRODUCT_DOCUMENTTYPE}
                                            element={
                                                <Layout title="Product DocumentType">
                                                    <ProductDocumentTypePage />
                                                </Layout>
                                            }
                                        />

                                        <Route
                                            path={ROUTES.COUNTRIES}
                                            element={
                                                <Layout title="Countries">
                                                    <CountriesPage />
                                                </Layout>
                                            }
                                        />

                                        <Route
                                            path={ROUTES.HSN_CODES}
                                            element={
                                                <Layout title="HSN Codes">
                                                    <HsnCodesPage />
                                                </Layout>
                                            }
                                        />

                                        <Route
                                            path={ROUTES.PRODUCT_IMPORT_STATUS_DETAILS}
                                            element={
                                                <Layout title="Product Import Status Details">
                                                    <ProductImportStatusDetails />
                                                </Layout>
                                            }
                                        />
                                    </Route>

                                    {/* Protected routes for Admin, Export_Officer, Import_Officer and Manufacturer */}
                                    <Route
                                        element={
                                            <ProtectedRoute
                                                allowedRoles={[
                                                    userRoles.EXPORT_OFFICER,
                                                    userRoles.IMPORT_OFFICER,
                                                    userRoles.ADMIN,
                                                    userRoles.MANUFACTURER
                                                ]}
                                            />
                                        }
                                    >
                                        <Route
                                            path={ROUTES.PRODUCTS}
                                            element={
                                                <Layout title="Products">
                                                    <ProductsPage />
                                                </Layout>
                                            }
                                        />
                                        <Route
                                            path={ROUTES.PRODUCTDETAILS}
                                            element={
                                                <Layout title="product detail">
                                                    <ProductDetails />
                                                </Layout>
                                            }
                                        />
                                    </Route>

                                    {/* Protected routes for Admin and Manufacturer */}
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
                                            path={ROUTES.EDITPRODUCT}
                                            element={
                                                <Layout title="Edit Product">
                                                    <ProductForm />
                                                </Layout>
                                            }
                                        />
                                    </Route>

                                    {/* Protected routes for Manufacturer only */}
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
                                    </Route>
                                </Route>
                                <Route></Route>
                            </>
                        }
                    </Routes>
                </React.Suspense>
            </BrowserRouter>
            {/* ToastContainer for notifications */}
            <ToastContainer position="top-right" autoClose={2000} />
        </ErrorBoundary>
    );
}

export default App;
