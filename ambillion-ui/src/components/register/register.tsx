import { useState, useEffect } from 'react';
import { apiUrl } from 'constants/common';
import { ROUTES } from 'constants/common';
import ReCAPTCHA from 'react-google-recaptcha';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const SITE_KEY = apiUrl.captchaSiteKey || '';

export const Registration = () => {
    const navigate = useNavigate();
    const [siteKey, setSiteKey] = useState<string>(SITE_KEY);

    useEffect(() => {
        setSiteKey(SITE_KEY);
    }, [SITE_KEY]);

    const RegisterSchemas = Yup.object().shape({
        firstName: Yup.string().required('FirstName is required'),
        lastName: Yup.string().required('LastName is required'),
        companyName: Yup.string(),
        mobileNumber: Yup.string().required('Mobile Number is required'),
        emailAddress: Yup.string()
            .email('Please enter a valid Email Address')
            .required('Email Address is required'),
        password: Yup.string()
            .matches(passwordRules, {
                message:
                    'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
            })
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Passwords must match')
            .required('Confirm Password is required'),
        captcha: Yup.string().required('Please complete the reCAPTCHA')
    });

    const handleSubmit = (
        /* eslint-disable @typescript-eslint/no-explicit-any */
        values: any,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        console.log('Form values:', values);
        // Simulate form submission or API call here
        fetch('http://localhost:5000/submitForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then((response) => response.json())
            .then(
                // (data) => {
                () => {
                    // eslint-disable-next-line no-alert
                    alert('Form submitted successfully!');
                    setSubmitting(false);
                }
            )

            .catch((error) => {
                console.error('Error submitting form:', error);
                setSubmitting(false);
            });
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
                                                src="../assets/images/logos/logo-icon.svg"
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
                                            emailAddress: '',
                                            password: '',
                                            confirmPassword: '',
                                            captcha: ''
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
                                                            First Name
                                                            <span className="text-danger"> *</span>
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="firstName"
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
                                                            Last Name
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
                                                            Mobile Number
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
                                                            Email Address
                                                            <span className="text-danger"> *</span>
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="emailAddress"
                                                            className={`form-control ${
                                                                props.touched.emailAddress &&
                                                                props.errors.emailAddress
                                                                    ? 'is-invalid'
                                                                    : ''
                                                            }`}
                                                            id="emailAddress"
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="emailAddress"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                    <div className="mb-3 col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                                                        <label
                                                            // htmlFor="password"
                                                            className="form-label col-form-label"
                                                        >
                                                            Password
                                                            <span className="text-danger"> *</span>
                                                        </label>
                                                        <Field
                                                            type="password"
                                                            name="password"
                                                            className={`form-control ${
                                                                props.touched.password &&
                                                                props.errors.password
                                                                    ? 'is-invalid'
                                                                    : ''
                                                            }`}
                                                            id="password"
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="password"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-12 col-lg-12 col-xxl-12 row">
                                                    <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                                                        <label
                                                            // htmlFor="confirmPassword"
                                                            className="form-label col-form-label"
                                                        >
                                                            Confirm Password
                                                            <span className="text-danger"> *</span>
                                                        </label>
                                                        <Field
                                                            type="password"
                                                            name="confirmPassword"
                                                            className={`form-control ${
                                                                props.touched.confirmPassword &&
                                                                props.errors.confirmPassword
                                                                    ? 'is-invalid'
                                                                    : ''
                                                            }`}
                                                            id="confirmPassword"
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="confirmPassword"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 row col-sm-12 col-md-12 col-lg-6 col-xxl-3">
                                                    <ReCAPTCHA
                                                        sitekey={siteKey}
                                                        onChange={(value: string | null) => {
                                                            // console.log('Captcha value:', value);
                                                            props.setFieldValue(
                                                                'captcha',
                                                                value || ''
                                                            );
                                                        }}
                                                        className={`form-control ${props.touched.captcha && props.errors.captcha ? 'is-invalid' : ''}`}
                                                    />
                                                    <ErrorMessage
                                                        name="captcha"
                                                        component="div"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                                <div className="p-2 row col-sm-12 col-md-12 col-lg-6 col-xxl-3">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary py-8 mb-4 rounded-2"
                                                        disabled={
                                                            !props.isValid ||
                                                            !props.dirty ||
                                                            props.isSubmitting
                                                        }
                                                    >
                                                        {props.isSubmitting
                                                            ? 'Submitting...'
                                                            : 'Sign Up'}
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
