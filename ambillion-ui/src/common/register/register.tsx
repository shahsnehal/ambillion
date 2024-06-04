import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
export const Registration = () => {
    const RegisterSchemas = Yup.object().shape({
        firstName: Yup.string().required('FirstName is required'),
        lastName: Yup.string().required('LastName is required'),
        companyName: Yup.string(),
        mobileNumber: Yup.string().required('Mobile Number is required'),
        emailAddress: Yup.string()
            .email('Please enter a valid Email Address')
            .required('Email Address is required'),
        password: Yup.string()
            .matches(passwordRules, { message: 'Please create a stronger Password' })
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Passwords must match')
            .required('Confirm Password is required')
    });
    return (
        <div id="main-wrapper">
            <div className="position-relative overflow-hidden radial-gradient min-vh-100 w-100 d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className="row justify-content-center w-100">
                        <div className="col-md-12 col-lg-12 col-xxl-6">
                            <div className="card mb-0">
                                <div className="card-body p-5">
                                    <div className="d-flex justify-content-center">
                                        <img
                                            src="../assets/images/logos/logo-icon.svg"
                                            alt="homepage"
                                            // height={250}
                                            className="light-logo"
                                        />
                                    </div>

                                    <Formik
                                        initialValues={{
                                            firstName: '',
                                            lastName: '',
                                            companyName: '',
                                            mobileNumber: '',
                                            emailAddress: '',
                                            password: '',
                                            confirmPassword: ''
                                        }}
                                        validationSchema={RegisterSchemas}
                                        onSubmit={(values, { setSubmitting }) => {
                                            console.log(values);
                                            // Simulating asynchronous operation, like an API call
                                            setTimeout(() => {
                                                // eslint-disable-next-line no-alert
                                                alert('Form is validated! Submitting the form...');
                                                setSubmitting(false);
                                            }, 1000);
                                        }}
                                    >
                                        {(props) => (
                                            <Form>
                                                <div className="mb-4 row align-items-center">
                                                    <label
                                                        htmlFor="lastName"
                                                        id="lastName"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        First Name
                                                        <span className="text-danger"> *</span>
                                                    </label>
                                                    <div className="col-sm-9">
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
                                                </div>
                                                <div className="mb-4 row align-items-center">
                                                    <label
                                                        htmlFor="lastName"
                                                        className="form-label col-sm-3 col-form-label"
                                                    >
                                                        Last Name
                                                        <span className="text-danger"> *</span>
                                                    </label>
                                                    <div className="col-sm-9">
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
                                                <div className="mb-4 row align-items-center">
                                                    <label
                                                        htmlFor="companyName"
                                                        className="form-label col-sm-3 col-form-label"
                                                    >
                                                        Company Name
                                                    </label>
                                                    <div className="col-sm-9">
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
                                                </div>
                                                <div className="mb-4 row align-items-center">
                                                    <label
                                                        htmlFor="mobileNumber"
                                                        className="form-label col-sm-3 col-form-label"
                                                    >
                                                        Mobile Number
                                                        <span className="text-danger"> *</span>
                                                    </label>
                                                    <div className="col-sm-9">
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
                                                <div className="mb-4 row align-items-center">
                                                    <label
                                                        htmlFor="emailAddress"
                                                        className="form-label col-sm-3 col-form-label"
                                                    >
                                                        Email Address
                                                        <span className="text-danger"> *</span>
                                                    </label>
                                                    <div className="col-sm-9">
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
                                                </div>
                                                <div className="mb-4 row align-items-center">
                                                    <label
                                                        htmlFor="password"
                                                        className="form-label col-sm-3 col-form-label"
                                                    >
                                                        Password
                                                        <span className="text-danger"> *</span>
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <Field
                                                            type="text"
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
                                                <div className="mb-4 row align-items-center">
                                                    <label
                                                        htmlFor="confirmPassword"
                                                        className="form-label col-sm-3 col-form-label"
                                                    >
                                                        Confirm Password
                                                        <span className="text-danger"> *</span>
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <Field
                                                            type="text"
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
                                                <button type="submit" className="btn btn-primary">
                                                    Sign Up
                                                </button>
                                                <div className="d-flex align-items-center">
                                                    <p className="fs-4 mb-0 text-dark">
                                                        Already have an Account?
                                                    </p>
                                                    <a
                                                        className="text-primary fw-medium ms-2"
                                                        href="authentication-login.html"
                                                    >
                                                        Sign In
                                                    </a>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                    {/* </form> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
