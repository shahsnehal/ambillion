import { ROUTES } from 'constants/common';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

// import * as Yup from 'yup';
export const Login = () => {
    const navigate = useNavigate();
    const RegisterSchemas = Yup.object().shape({
        userName: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
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
                                            userName: '',
                                            password: ''
                                        }}
                                        validationSchema={RegisterSchemas}
                                        onSubmit={(values, { setSubmitting }) => {
                                            console.log(values);
                                            // Simulating asynchronous operation, like an API call
                                            setTimeout(() => {
                                                // eslint-disable-next-line no-alert
                                                alert('Login Success');
                                                setSubmitting(false);
                                                navigate(ROUTES.DASHBOARD);
                                            }, 1000);
                                        }}
                                    >
                                        {(props) => (
                                            <Form>
                                                <div className="mb-3">
                                                    <label
                                                        // htmlFor="userName"
                                                        className="form-label"
                                                    >
                                                        Username
                                                    </label>
                                                    <Field
                                                        type="userName"
                                                        name="userName"
                                                        className={`form-control ${
                                                            props.touched.userName &&
                                                            props.errors.userName
                                                                ? 'is-invalid'
                                                                : ''
                                                        }`}
                                                        id="userName"
                                                        aria-describedby="userName"
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="userName"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="exampleInputPassword1"
                                                        className="form-label"
                                                    >
                                                        Password
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
                                                        aria-describedby="password"
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="password"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mb-4">
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input primary"
                                                            type="checkbox"
                                                            value=""
                                                            id="flexCheckChecked"
                                                        />
                                                        <label
                                                            className="form-check-label text-dark"
                                                            htmlFor="flexCheckChecked"
                                                        >
                                                            Remeber this Device
                                                        </label>
                                                    </div>
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
                                                    disabled={props.isSubmitting}
                                                >
                                                    Sign In
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
