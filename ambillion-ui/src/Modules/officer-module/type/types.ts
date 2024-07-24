export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const UPDATE_PRODUCT_STATUS_REQUEST = 'UPDATE_PRODUCT_STATUS_REQUEST';
export const UPDATE_PRODUCT_STATUS_SUCCESS = 'UPDATE_PRODUCT_STATUS_SUCCESS';
export const UPDATE_PRODUCT_STATUS_FAILURE = 'UPDATE_PRODUCT_STATUS_FAILURE';

export type Product = {
    productId: number;
    originHsnCode: string;
    uploadImage: string;
    productCategory: string;
    productType: string;
    productDisplayName: string;
    customerProductDescription: string;
    manufacturerName: string;
    status: string;
};

export type FetchProductsRequestAction = {
    type: typeof FETCH_PRODUCTS_REQUEST;
};

export type FetchProductsSuccessAction = {
    type: typeof FETCH_PRODUCTS_SUCCESS;
    payload: Product[];
};

export type FetchProductsFailureAction = {
    type: typeof FETCH_PRODUCTS_FAILURE;
    error: string;
};

export type UpdateProductStatusRequestAction = {
    type: typeof UPDATE_PRODUCT_STATUS_REQUEST;
    payload: { productId: number; status: string };
};

export type UpdateProductStatusSuccessAction = {
    type: typeof UPDATE_PRODUCT_STATUS_SUCCESS;
    payload: { productId: number; status: string };
};

export type UpdateProductStatusFailureAction = {
    type: typeof UPDATE_PRODUCT_STATUS_FAILURE;
    error: string;
};

export type ProductActionTypes =
    | FetchProductsRequestAction
    | FetchProductsSuccessAction
    | FetchProductsFailureAction
    | UpdateProductStatusRequestAction
    | UpdateProductStatusSuccessAction
    | UpdateProductStatusFailureAction;
