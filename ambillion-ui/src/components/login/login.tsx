import { useState } from 'react';
import { ROUTES } from 'constants/common';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { SigninData } from 'reduxSaga/modules/auth-module/type/types';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signinRequest } from 'reduxSaga/modules/auth-module/action/actions';
import { RootState } from 'reduxSaga/config/store';
import { Icon } from '@iconify/react';
import { trimValues } from 'utils/common';

/**
 * Login component for user authentication.
 *
 * Provides a form for users to sign in to their accounts. It uses Formik for form handling,
 * Yup for validation, and Redux for managing authentication state. Users can toggle password visibility,
 * navigate to the Forgot Password page, or create a new account.
 *
 * @component
 * @example
 * return <Login />;
 */
export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const isLoading = useSelector((state: RootState) => state.authModule.isLoading);

    /**
     * Toggles the visibility of the password field.
     */
    const toggleShowPassword = () => setShowPassword(!showPassword);

    /**
     * Validation schema for the signin form.
     *
     * Validates email and password fields using Yup.
     * - Email must be a valid email address and is required.
     * - Password is required.
     */
    const SigninSchema = Yup.object().shape({
        email: Yup.string()
            .email('Please enter a valid Email Address !')
            .required('Email is required !')
            .trim(),
        password: Yup.string().required('Password is required !').trim()
    });

    /**
     * Handles form submission for the login form.
     *
     * Dispatches a signin request action with the provided email and password.
     * The form values are trimmed before dispatching the action.
     *
     * @param {SigninData} values - The form values.
     * @param {string} values.email - The user's email address.
     * @param {string} values.password - The user's password.
     */
    const handleSubmit = async (values: SigninData) => {
        const trimmedValues = trimValues(values);
        const { email, password } = trimmedValues;
        dispatch(signinRequest({ email, password, navigate }));
    };

    return (
        <div id="main-wrapper" className="auth-customizer-none">
            <div className="position-relative overflow-hidden radial-gradient min-vh-100 w-100">
                <div className="position-relative z-3">
                    <div className="row">
                        <div className="col-xl-7 col-xxl-8">
                            <div className="d-none d-xl-flex align-items-center justify-content-center h-n80">
                                <img
                                    src="../assets/images/backgrounds/loginbg.png"
                                    alt="ample-img"
                                    className="img-fluid"
                                    width="500"
                                />
                            </div>
                        </div>
                        <div className="col-xl-5 col-xxl-4">
                            <div className="authentication-login min-vh-100 bg-body row justify-content-center align-items-center p-4">
                                <div className="auth-max-width col-sm-8 col-md-6 col-xl-9">
                                    <h2 className="mb-1 fs-7 fw-bolder d-flex justify-content-center aligh-item-center">
                                        Welcome to ambillion
                                    </h2>
                                    <div className="position-relative text-center my-4">
                                        <p className="mb-0 fs-4 px-3 d-inline-block bg-body text-dark z-3 position-relative">
                                            sign in with
                                        </p>
                                        <span className="border-top border-dark-subtle opacity-25 w-100 position-absolute top-50 start-50 translate-middle"></span>
                                    </div>
                                    <Formik
                                        initialValues={{
                                            email: '',
                                            password: ''
                                        }}
                                        validationSchema={SigninSchema}
                                        onSubmit={handleSubmit}
                                    >
                                        {(props) => (
                                            <Form>
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Email{' '}
                                                        <span className="text-danger"> *</span>
                                                    </label>
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        autoFocus
                                                        className={`form-control ${
                                                            props.touched.email &&
                                                            props.errors.email
                                                                ? 'is-invalid'
                                                                : ''
                                                        }`}
                                                        id="email"
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="email"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="form-label">
                                                        Password{' '}
                                                        <span className="text-danger"> *</span>
                                                    </label>
                                                    <div className="input-group">
                                                        <Field
                                                            type={
                                                                showPassword ? 'text' : 'password'
                                                            }
                                                            name="password"
                                                            className={`form-control ${props.touched.password && props.errors.password ? 'is-invalid' : ''}`}
                                                            id="password"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="input-group-text cursor-pointer"
                                                            onClick={toggleShowPassword}
                                                            aria-label={
                                                                showPassword
                                                                    ? 'Hide password'
                                                                    : 'Show password'
                                                            }
                                                        >
                                                            <Icon
                                                                icon={
                                                                    showPassword
                                                                        ? 'solar:eye-outline'
                                                                        : 'codicon:eye-closed'
                                                                }
                                                                className="fs-5"
                                                            />
                                                        </button>
                                                        <ErrorMessage
                                                            component="div"
                                                            name="password"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mb-4">
                                                    <button
                                                        className="btn text-primary fw-medium"
                                                        type="button"
                                                        onClick={() =>
                                                            navigate(ROUTES.FORGOT_PASSWORD)
                                                        }
                                                    >
                                                        Forgot Password ?
                                                    </button>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-100 py-8 mb-4 rounded-2"
                                                    disabled={
                                                        !props.isValid || !props.dirty || isLoading
                                                    }
                                                >
                                                    {isLoading ? 'Submitting...' : 'Sign In'}
                                                </button>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <p className="fs-4 mb-0 fw-medium">
                                                        New to Ambillion?
                                                    </p>
                                                    <button
                                                        className="text-primary btn fw-medium ms-2"
                                                        onClick={() => navigate(ROUTES.REGISTER)}
                                                    >
                                                        Create an account
                                                    </button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
