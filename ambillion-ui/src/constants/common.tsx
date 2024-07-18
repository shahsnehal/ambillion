//Api EndPoint
export const apiUrl = {
    endPoint: process.env.REACT_APP_BACKEND_URL,

    //auth-Module
    signUp: '/auth/register',
    signIn: '/auth/login',
    tokenRefresh: '/auth/refresh-tokens',

    //user-Module
    getUserList: '/users',
    updateUserStatus: '/users'
};

// Routing path constants
export const ROUTES = {
    BASEPATH: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgotPassword',
    DASHBOARD: '/dashboard',
    PRODUCTS: '/products',
    ADDPRODUCTS: '/products/addProduct',
    PRODUCTDETAILS: '/products/:productId'
};

// Recaptcha Configuration
export const googleRecaptchaConfig = {
    captchaSiteKey: process.env.REACT_APP_RECAPTCHA_SITE_KEY
};

export const userStatus = {
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED',
    PENDING: 'PENDING'
};

export const userRoles = {
    ADMIN: 'ADMIN',
    MANUFACTURER: 'MANUFACTURER',
    OFFICER: 'OFFICER'
};
