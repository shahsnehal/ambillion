import { useState, useRef } from 'react';
import { ROUTES, googleRecaptchaConfig } from 'constants/common';
import ReCAPTCHA from 'react-google-recaptcha';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { SignupData } from 'reduxSaga/modules/auth-module/type/types';
import { signupRequest } from 'reduxSaga/modules/auth-module/action/actions';
import { RootState } from 'reduxSaga/config/store';
import { Icon } from '@iconify/react';
import { trimValues } from 'utils/common';
import logo from 'assets/images/logo-icon.svg';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const SITE_KEY = googleRecaptchaConfig.captchaSiteKey ?? '';

/**
 * Registration component for user signup.
 *
 * Provides a form for users to register an account. It includes fields for personal details,
 * a reCAPTCHA challenge, and password validation. The component uses Formik for form handling,
 * Yup for validation, and Redux for managing authentication state.
 *
 * @component
 * @example
 * return <Registration />;
 */
export const Registration = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isRecaptchaValid, setIsRecaptchaValid] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const isLoading = useSelector((state: RootState) => state.authModule.isLoading);
    /**
     * Toggles the visibility of the password field.
     */
    const toggleShowPassword = () => setShowPassword(!showPassword);
    /**
     * Toggles the visibility of the confirm password field.
     */
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    /**
     * Validation schema for the registration form.
     *
     * Validates personal details, email, password, and confirm password fields using Yup.
     * - First Name and Last Name are required.
     * - Mobile Number must be exactly 10 digits.
     * - Email must be a valid email address and is required.
     * - Password must meet specific criteria: at least 8 characters, with at least one uppercase letter,
     *   one lowercase letter, one number, and one special character.
     * - Confirm Password must match the Password field.
     */
    const RegisterSchemas = Yup.object().shape({
        firstName: Yup.string().trim().required('FirstName is required !'),
        lastName: Yup.string().trim().required('LastName is required !'),
        companyName: Yup.string().trim(),
        mobileNumber: Yup.string()
            .required('Mobile Number is required !')
            .trim()
            .matches(/^\d{10}$/, 'Mobile Number must be exactly 10 digits !'),
        email: Yup.string()
            .email('Please enter a valid Email Address !')
            .trim()
            .required('Email Address is required !'),
        password: Yup.string()
            .matches(passwordRules, {
                message:
                    'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special !'
            })
            .trim()
            .required('Password is required !'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Passwords must match !')
            .trim()
            .required('Confirm Password is required !')
    });

    /**
     * Handles reCAPTCHA change event.
     *
     * Updates the state to reflect whether the reCAPTCHA challenge is completed successfully.
     *
     * @param {string | null} value - The reCAPTCHA token if successful, or null if not.
     */
    const captchaOnChange = (value: string | null) => {
        if (value) {
            setIsRecaptchaValid(true);
        } else {
            setIsRecaptchaValid(false);
        }
    };

    /**
     * Handles form submission for the registration form.
     *
     * Dispatches a signup request action with the provided user details.
     * The form values are trimmed before dispatching the action.
     *
     * @param {SignupData} values - The form values.
     * @param {string} values.firstName - The user's first name.
     * @param {string} values.lastName - The user's last name.
     * @param {string} values.companyName - The user's company name.
     * @param {string} values.mobileNumber - The user's mobile number.
     * @param {string} values.email - The user's email address.
     * @param {string} values.password - The user's password.
     */
    const handleSubmit = async (values: SignupData) => {
        const trimmedValues = trimValues(values);
        const { firstName, lastName, companyName, mobileNumber, email, password } = trimmedValues;
        dispatch(
            signupRequest({
                firstName,
                lastName,
                companyName,
                mobileNumber,
                email,
                password,
                navigate
            })
        );
    };

    return (
        <div id="main-wrapper" className="auth-customizer-none">
            <div className="position-relative overflow-hidden radial-gradient min-vh-100 w-100 d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className="row justify-content-center w-100">
                        <div className="col-md-8 col-lg-6 col-xxl-9">
                            <div className="card mb-0">
                                <div className="card-body p-5">
                                    <div className="container">
                                        <div className="row justify-content-center mb-5">
                                            <img
                                                src={logo}
                                                alt="homepage"
                                                height={80}
                                                className="logo-img"
                                            />
                                        </div>
                                    </div>
                                    <Formik
                                        initialValues={{
                                            firstName: '',
                                            lastName: '',
                                            companyName: '',
                                            mobileNumber: '',
                                            email: '',
                                            password: '',
                                            confirmPassword: ''
                                        }}
                                        validationSchema={RegisterSchemas}
                                        onSubmit={handleSubmit}
                                    >
                                        {(props) => (
                                            <Form>
                                                <div className="col-sm-12 col-md-12 col-lg-12 col-xxl-12 row">
                                                    <div className="mb-3 col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                                                        <label
                                                            htmlFor="lastName"
                                                            id="lastName"
                                                            className="col-form-label"
                                                        >
                                                            First Name{' '}
                                                            <span className="text-danger"> *</span>
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="firstName"
                                                            autoFocus
                                                            className={`form-control ${
                                                                props.touched.firstName &&
                                                                props.errors.firstName
                                                                    ? 'is-invalid'
                                                                    : ''
                                                            }`}
                                                            id="firstName"
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="firstName"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                    <div className="mb-3 col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                                                        <label
                                                            htmlFor="lastName"
                                                            className="form-label col-form-label"
                                                        >
                                                            Last Name{' '}
                                                            <span className="text-danger"> *</span>
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="lastName"
                                                            className={`form-control ${
                                                                props.touched.lastName &&
                                                                props.errors.lastName
                                                                    ? 'is-invalid'
                                                                    : ''
                                                            }`}
                                                            id="lastName"
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="lastName"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-lg-12 col-xxl-12 row">
                                                    <div className="mb-3 col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                                                        <label
                                                            htmlFor="companyName"
                                                            className="form-label col-form-label"
                                                        >
                                                            Company Name
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="companyName"
                                                            className={`form-control ${
                                                                props.touched.companyName &&
                                                                props.errors.companyName
                                                                    ? 'is-invalid'
                                                                    : ''
                                                            }`}
                                                            id="companyName"
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="companyName"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                    <div className="mb-3 col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                                                        <label
                                                            // htmlFor="mobileNumber"
                                                            className="form-label col-form-label"
                                                        >
                                                            Mobile Number{' '}
                                                            <span className="text-danger"> *</span>
                                                        </label>

                                                        <Field
                                                            type="text"
                                                            name="mobileNumber"
                                                            className={`form-control ${
                                                                props.touched.mobileNumber &&
                                                                props.errors.mobileNumber
                                                                    ? 'is-invalid'
                                                                    : ''
                                                            }`}
                                                            id="mobileNumber"
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="mobileNumber"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-lg-12 col-xxl-12 row">
                                                    <div className="mb-3 col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                                                        <label
                                                            // htmlFor="emailAddress"
                                                            className="form-label col-form-label"
                                                        >
                                                            Email Address{' '}
                                                            <span className="text-danger"> *</span>
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="email"
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
                                                    <div className="mb-3 col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                                                        <label
                                                            // htmlFor="password"
                                                            className="form-label col-form-label"
                                                        >
                                                            Password{' '}
                                                            <span className="text-danger"> *</span>
                                                        </label>
                                                        <div className="input-group">
                                                            <Field
                                                                type={
                                                                    showPassword
                                                                        ? 'text'
                                                                        : 'password'
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
                                                </div>
                                                <div className="mb-3 col-md-12 col-lg-12 col-xxl-12 row">
                                                    <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                                                        <label
                                                            // htmlFor="confirmPassword"
                                                            className="form-label col-form-label"
                                                        >
                                                            Confirm Password{' '}
                                                            <span className="text-danger"> *</span>
                                                        </label>
                                                        <div className="input-group">
                                                            <Field
                                                                type={
                                                                    showConfirmPassword
                                                                        ? 'text'
                                                                        : 'password'
                                                                }
                                                                name="confirmPassword"
                                                                className={`form-control ${props.touched.confirmPassword && props.errors.confirmPassword ? 'is-invalid' : ''}`}
                                                                id="confirmPassword"
                                                            />
                                                            <button
                                                                type="button"
                                                                className="input-group-text cursor-pointer"
                                                                onClick={toggleShowConfirmPassword}
                                                                aria-label={
                                                                    showConfirmPassword
                                                                        ? 'Hide confirm password'
                                                                        : 'Show confirm password'
                                                                }
                                                            >
                                                                <Icon
                                                                    icon={
                                                                        showConfirmPassword
                                                                            ? 'solar:eye-outline'
                                                                            : 'codicon:eye-closed'
                                                                    }
                                                                    className="fs-5"
                                                                />
                                                            </button>
                                                            <ErrorMessage
                                                                component="div"
                                                                name="confirmPassword"
                                                                className="invalid-feedback"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-3 row col-sm-12 col-md-12 col-lg-6 col-xxl-3">
                                                    <ReCAPTCHA
                                                        ref={recaptchaRef}
                                                        sitekey={SITE_KEY}
                                                        onChange={captchaOnChange}
                                                        onExpired={() => {
                                                            setIsRecaptchaValid(false);
                                                            recaptchaRef.current?.reset();
                                                        }}
                                                    />
                                                </div>
                                                <div className="p-2 row col-sm-12 col-md-12 col-lg-6 col-xxl-3">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary py-2 mb-2 rounded-2"
                                                        disabled={
                                                            !props.isValid ||
                                                            !props.dirty ||
                                                            isLoading ||
                                                            !isRecaptchaValid
                                                        }
                                                    >
                                                        {isLoading ? 'Submitting...' : 'Sign Up'}
                                                    </button>
                                                </div>
                                                <div className="d-flex  align-items-center">
                                                    <p className="fs-4 mb-0 text-dark">
                                                        Already have an Account?
                                                    </p>

                                                    <button
                                                        className="btn text-primary fw-medium ms-2"
                                                        onClick={() => navigate(ROUTES.LOGIN)}
                                                    >
                                                        Sign In
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
