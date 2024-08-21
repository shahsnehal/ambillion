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
    productCategories: '/categories',

    //document-Module
    documents: '/documents'
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
    PRODUCT_CATEGORIES: '/productCategories',
    DOCUMENTS: '/documents'
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
    PENDING: 'PENDING',
    UNDER_VERIFICATION: 'UNDER_VERIFICATION',
    VERIFIED: 'VERIFIED',
    INFO_NEEDED: 'INFO_NEEDED',
    SENT_FOR_APPROVAL: 'SENT_FOR_APPROVAL',
    UNDER_EXPORT_APPROVAL: 'UNDER_EXPORT_APPROVAL',
    EXPORT_INFO_NEEDED: 'EXPORT_INFO_NEEDED',
    APPROVED: 'APPROVED'
} as const;

export const userRoles = {
    ADMIN: 'ADMIN',
    MANUFACTURER: 'MANUFACTURER',
    OFFICER: 'OFFICER'
};
