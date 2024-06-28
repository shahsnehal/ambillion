// Routing path constants
export const ROUTES = {
    BASEPATH: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgotPassword',
    DASHBOARD: '/dashboard'
};

// Recaptcha Configuration
export const googleRecaptchaConfig = {
    captchaSiteKey: process.env.REACT_APP_RECAPTCHA_SITE_KEY
};
