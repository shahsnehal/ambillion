//Api EndPoint
export const apiUrl = {
    endPoint: process.env.REACT_APP_BACKEND_URL,

    //auth-Module
    signUp: '/auth/register',
    signIn: '/auth/login',
    tokenRefresh: '/auth/refresh-tokens',

    //user-Module
    getUserList: '/users',
    updateUserStatus: '/users',

    //Manufacture-product-Module
    productsByUserID: '/products',
    addProduct: '/products/addProduct',
    getProductById: '/products',
    updateProduct: '/products',
    deleteProduct: '/products/deleteProduct',

    //Officer-Module
    getProducts: '/products',
    updateProductStatus: '/officer'
};

// Routing path constants
export const ROUTES = {
    BASEPATH: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgotPassword',
    DASHBOARD: '/dashboard',
    USERSLIST: '/users',
    PRODUCTS: '/products',
    PRODUCTSBYUSERID: '/productsList',
    UPDATEPRODUCT: '/products',
    ADDPRODUCT: '/products/addProduct',
    EDITPRODUCT: '/products/edit/:Id',
    PRODUCTDETAILS: '/products/:productId',
    NOT_AUTHORIZES: '/unAthorized'
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
    [userRoles.ADMIN]: ROUTES.USERSLIST,
    [userRoles.MANUFACTURER]: ROUTES.PRODUCTSBYUSERID,
    [userRoles.OFFICER]: ROUTES.PRODUCTS
};
