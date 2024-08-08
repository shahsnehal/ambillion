import { ROUTES } from 'constants/common';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const RegisterSchemas = Yup.object().shape({
        email: Yup.string()
            .email('Please enter a valid Email Address !')
            .required('Email Address is required !')
    });
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
                                    <div className="mb-5">
                                        <h2 className="fw-bolder fs-7 mb-3">
                                            Forgot your password?
                                        </h2>
                                        <p className="mb-0 ">
                                            Please enter the email address associated with your
                                            account and We will email you a link to reset your your
                                            password.
                                        </p>
                                    </div>
                                    <Formik
                                        initialValues={{
                                            email: ''
                                        }}
                                        validationSchema={RegisterSchemas}
                                        onSubmit={(values, { setSubmitting }) => {
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
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="email">
                                                        Email address
                                                    </label>
                                                    <Field
                                                        // type="email"
                                                        name="email"
                                                        className={`form-control ${
                                                            props.touched.email &&
                                                            props.errors.email
                                                                ? 'is-invalid'
                                                                : ''
                                                        }`}
                                                        id="email"
                                                        aria-describedby="email"
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="email"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                                <button className="btn btn-primary w-100 py-8 mb-3">
                                                    Forgot Password
                                                </button>
                                                <button
                                                    className="btn bg-primary-subtle text-primary w-100 py-8"
                                                    onClick={() => navigate(ROUTES.LOGIN)}
                                                >
                                                    Back to Login
                                                </button>
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
