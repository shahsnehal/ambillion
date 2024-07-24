export const FETCH_ALL_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_ALL_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_ALL_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const GET_PRODUCTS_BY_USER_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_BY_USER_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_BY_USER_FAILURE = 'GET_PRODUCTS_FAILURE';

export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const EDIT_PRODUCT_REQUEST = 'EDIT_PRODUCT_REQUEST';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_FAILURE = 'EDIT_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const GET_PRODUCT_BY_ID_REQUEST = 'GET_PRODUCT_BY_ID_REQUEST';
export const GET_PRODUCT_BY_ID_SUCCESS = 'GET_PRODUCT_BY_ID_SUCCESS';
export const GET_PRODUCT_BY_ID_FAILURE = 'GET_PRODUCT_BY_ID_FAILURE';

export const UPDATE_PRODUCT_STATUS_REQUEST = 'UPDATE_PRODUCT_STATUS_REQUEST';
export const UPDATE_PRODUCT_STATUS_SUCCESS = 'UPDATE_PRODUCT_STATUS_SUCCESS';
export const UPDATE_PRODUCT_STATUS_FAILURE = 'UPDATE_PRODUCT_STATUS_FAILURE';

export type Product = {
    product_id: number;
    product_category_id: number;
    product_displayname: string;
    customer_product_description: string;
    origin_hsn_code: string;
    product_feature: string;
    product_custom_fields: string;
    audit_user_id: number;
    audit_timestamp: string;
    created_date: string;
    created_by: number;
    created_by_name: string;
    inactive_date: string | null;
    country_id: number;
    status: string;
    comments: string;
};

export type ProductFormValues = {
    uploadImage?: string | null | ArrayBuffer;
    productCategory?: string;
    productType?: string;
    productDisplayName?: string;
    customerProductDescription?: string;
    brandName?: string;
    exWorkPrice?: string;
    byColor?: string;
    bySize?: string[];
    originHsnCode?: string;
    unitMeasure?: string;
    weight?: string;
    dimensions?: string;
    byGender?: string;
    material?: string;
    productFeatures?: string;
    [key: string]: unknown;
};

export type GetProductsRequestAction = {
    type: typeof GET_PRODUCTS_BY_USER_REQUEST;
};

export type GetProductsSuccessAction = {
    type: typeof GET_PRODUCTS_BY_USER_SUCCESS;
    payload: { data: Product[] };
};

export type GetProductsFailureAction = {
    type: typeof GET_PRODUCTS_BY_USER_FAILURE;
    error: string;
};

export type FetchAllProductsRequestAction = {
    type: typeof FETCH_ALL_PRODUCTS_REQUEST;
};

export type FetchAllProductsSuccessAction = {
    type: typeof FETCH_ALL_PRODUCTS_SUCCESS;
    payload: { data: Product[] };
};

export type FetchAllProductsFailureAction = {
    type: typeof FETCH_ALL_PRODUCTS_FAILURE;
    error: string;
};

export type UpdateProductStatusRequestAction = {
    type: typeof UPDATE_PRODUCT_STATUS_REQUEST;
    payload: { productId: number; userId: number; status: string; comments: string };
};

export type UpdateProductStatusSuccessAction = {
    type: typeof UPDATE_PRODUCT_STATUS_SUCCESS;
    payload: { productId: number; userId: number; status: string; comments: string };
};

export type UpdateProductStatusFailureAction = {
    type: typeof UPDATE_PRODUCT_STATUS_FAILURE;
    error: string;
};

export type AddProductRequestAction = {
    type: typeof ADD_PRODUCT_REQUEST;
    payload: ProductFormValues & { navigate: (path: string) => void };
};

export type AddProductSuccessAction = {
    type: typeof ADD_PRODUCT_SUCCESS;
    payload: Product;
};

export type AddProductFailureAction = {
    type: typeof ADD_PRODUCT_FAILURE;
    error: string;
};

export type EditProductRequestAction = {
    type: typeof EDIT_PRODUCT_REQUEST;
    payload: ProductFormValues & { navigate: (path: string) => void };
};

export type EditProductSuccessAction = {
    type: typeof EDIT_PRODUCT_SUCCESS;
    payload: Product;
};

export type EditProductFailureAction = {
    type: typeof EDIT_PRODUCT_FAILURE;
    error: string;
};

export type DeleteProductRequestAction = {
    type: typeof DELETE_PRODUCT_REQUEST;
    payload: number;
};

export type DeleteProductSuccessAction = {
    type: typeof DELETE_PRODUCT_SUCCESS;
    payload: number;
};

export type DeleteProductFailureAction = {
    type: typeof DELETE_PRODUCT_FAILURE;
    error: string;
};

export type GetProductByIdRequestAction = {
    type: typeof GET_PRODUCT_BY_ID_REQUEST;
    payload: number;
};

export type GetProductByIdSuccessAction = {
    type: typeof GET_PRODUCT_BY_ID_SUCCESS;
    payload: Product;
};

export type GetProductByIdFailureAction = {
    type: typeof GET_PRODUCT_BY_ID_FAILURE;
    error: string;
};

export type ProductActionTypes =
    | GetProductsRequestAction
    | GetProductsSuccessAction
    | GetProductsFailureAction
    | AddProductRequestAction
    | AddProductSuccessAction
    | AddProductFailureAction
    | EditProductRequestAction
    | EditProductSuccessAction
    | EditProductFailureAction
    | DeleteProductRequestAction
    | DeleteProductSuccessAction
    | DeleteProductFailureAction
    | GetProductByIdRequestAction
    | GetProductByIdSuccessAction
    | GetProductByIdFailureAction
    | FetchAllProductsRequestAction
    | FetchAllProductsSuccessAction
    | FetchAllProductsFailureAction
    | UpdateProductStatusRequestAction
    | UpdateProductStatusSuccessAction
    | UpdateProductStatusFailureAction;
