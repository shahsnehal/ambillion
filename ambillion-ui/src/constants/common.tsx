//Api EndPoint
export const apiUrl = {
    endPoint: process.env.REACT_APP_BACKEND_URL,

    //auth-Module
    signUp: '/auth/register',
    signIn: '/auth/login',
    tokenRefresh: '/auth/refresh-tokens',

    //user-Module
    getUser: '/users',
    updateUserStatus: '/users',

    //product-Module
    getAllProducts: '/products',
    PRODUCTSLIST: '/products',
    updateProductStatus: '/products',

    addProduct: '/products/addProduct',
    getProductDetailsById: '/products',
    updateProduct: '/products/updateProduct',
    deleteProduct: '/products/deleteProduct'
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
    EDITPRODUCT: '/products/edit/:Id',
    PRODUCTDETAILS: '/productsList/:productId'
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
