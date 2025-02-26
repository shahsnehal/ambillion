// API endpoint URLs used throughout the application
export const apiUrl = {
    endPoint: process.env.REACT_APP_BACKEND_URL,

    // Auth Module
    signUp: '/auth/register',
    signIn: '/auth/login',
    tokenRefresh: '/auth/refresh-tokens',

    // User Module
    users: '/users',

    // Product Module
    products: '/products',

    // Product Categories Module
    productCategories: '/categories',

    // Product Document Type Module
    productDocumentType: '/productdocumenttype',

    // Country Module
    countries: '/countries',

    // Import Status Endpoint
    importStatus: '/products/:productId/import-status/:countryId',

    // HSN Code Module
    hsnCodes: '/hsncodes',

    // User Document Module
    userDocuments: '/userdocuments'
};

// Routing paths used throughout the application
export const ROUTES = {
    BASEPATH: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgotPassword',
    NOT_AUTHORIZES: '/unAthorized',
    USERS: '/users',
    PRODUCTS: '/products',
    ADDPRODUCT: '/products/addProduct',
    EDITPRODUCT: '/products/editProduct/:productId',
    PRODUCTDETAILS: '/products/:productId',
    PRODUCT_CATEGORIES: '/productCategories',
    PRODUCT_DOCUMENTTYPE: '/productDocumentType',
    COUNTRIES: '/countries',
    PRODUCT_IMPORT_STATUS_DETAILS: '/products/:productId/import-status/:countryId',
    HSN_CODES: '/hsnCodes',
    USER_PROFILE: '/userProfile'
};

// Keys used for storing and retrieving data in local storage
export const localStorageKey = {
    USER_PROFILE: 'userProfile',
    JWT_TOKEN: 'jwtToken',
    PRODUCT_CATEGORIES: 'productCategories',
    COUNTRIES: 'countries'
};

// Configuration for Google reCAPTCHA
export const googleRecaptchaConfig = {
    captchaSiteKey: process.env.REACT_APP_RECAPTCHA_SITE_KEY
};

// User Status Constants
export const userStatus = {
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED',
    PENDING: 'PENDING'
};

// ProductStatus Constants
export const productStatus = {
    PENDING: 'PENDING',
    UNDER_VERIFICATION: 'UNDER_VERIFICATION',
    VERIFIED: 'VERIFIED',
    INFO_NEEDED: 'INFO_NEEDED',
    SENT_FOR_EXPORT_APPROVAL: 'SENT_FOR_EXPORT_APPROVAL',
    UNDER_EXPORT_APPROVAL: 'UNDER_EXPORT_APPROVAL',
    EXPORT_INFO_NEEDED: 'EXPORT_INFO_NEEDED',
    EXPORT_APPROVED: 'EXPORT_APPROVED',
    SENT_FOR_IMPORT_APPROVAL: 'SENT_FOR_IMPORT_APPROVAL',
    UNDER_IMPORT_APPROVAL: 'UNDER_IMPORT_APPROVAL',
    IMPORT_INFO_NEEDED: 'IMPORT_INFO_NEEDED',
    IMPORT_APPROVED: 'IMPORT_APPROVED',
    IMPORT_REJECTED: 'IMPORT_REJECTED'
} as const;

// User Roles Constants
export const userRoles = {
    ADMIN: 'ADMIN',
    MANUFACTURER: 'MANUFACTURER',
    EXPORT_OFFICER: 'EXPORT_OFFICER',
    IMPORT_OFFICER: 'IMPORT_OFFICER'
};

// User Documents Constants
export const USER_DOCUMENT_TYPES = {
    PAN_CARD: 'panCard',
    GST_COPY: 'gstCopy',
    BANK_AD_CODE: 'bankAdCode',
    IEC: 'iec',
    KYC_DOCUMENTS: 'kycDocuments',
    KYC_FORMAT: 'KycFormat'
};
