//Api EndPoint
export const apiUrl = {
    endPoint: process.env.REACT_APP_BACKEND_URL,

    //auth-Module
    signUp: '/auth/register',
    signIn: '/auth/login',
    tokenRefresh: '/auth/refresh-tokens',

    //user-Module
    users: '/users',

    //product-Module
    products: '/products',

    //productCategories-Module
    productCategories: '/categories'
};

// Routing path constants
export const ROUTES = {
    BASEPATH: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgotPassword',
    NOT_AUTHORIZES: '/unAthorized',
    USERS: '/users',
    PRODUCTS: '/products',
    ADDPRODUCT: '/products/addProduct',
    EDITPRODUCT: '/products/editProduct',
    PRODUCTDETAILS: '/products/:productId',
    PRODUCT_CATEGORIES: '/productCategories'
};

// localStorageKey
export const localStorageKey = {
    USER_PROFILE: 'userProfile',
    JWT_TOKEN: 'jwtToken',
    PRODUCT_CATEGORIES: 'productCategories'
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

export const productStatus = {
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    PENDING: 'PENDING',
    INREVIEW: 'INREVIEW',
    ONHOLD: 'ONHOLD'
};

export const userRoles = {
    ADMIN: 'ADMIN',
    MANUFACTURER: 'MANUFACTURER',
    OFFICER: 'OFFICER'
};
