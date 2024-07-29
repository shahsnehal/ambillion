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
    products: '/products'
};

// Routing path constants
export const ROUTES = {
    BASEPATH: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgotPassword',
    NOT_AUTHORIZES: '/unAthorized',
    DASHBOARD: '/dashboard',
    USERS: '/users',
    PRODUCTS: '/products',
    PRODUCTSLIST: '/productsList',

    UPDATEPRODUCT: '/products',
    ADDPRODUCT: '/productsList/addProduct',
    EDITPRODUCT: '/productsList/editProduct',
    PRODUCTDETAILS: '/productsList/:productId'
};

// localStorageKey
export const localStorageKey = {
    USER_PROFILE: 'userProfile',
    JWT_TOKEN: 'jwtToken'
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

export const roleRedirects = {
    [userRoles.ADMIN]: ROUTES.USERS,
    [userRoles.MANUFACTURER]: ROUTES.PRODUCTSLIST,
    [userRoles.OFFICER]: ROUTES.PRODUCTS
};

export const productCategories = [
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Clothing' },
    { id: '3', name: 'Home & Garden' },
    { id: '4', name: 'Books' },
    { id: '5', name: 'Sports & Outdoors' }
];
