import {
    ADD_PRODUCT_REQUEST,
    AddProductRequestAction,
    EDIT_PRODUCT_REQUEST,
    EditProductRequestAction,
    DELETE_PRODUCT_REQUEST,
    DeleteProductRequestAction,
    FETCH_PRODUCTDETAILS_REQUEST,
    FetchProductDetailsRequestAction,
    ProductFormValues,
    FETCH_PRODUCTS_REQUEST,
    FetchProductsRequestAction,
    UPDATE_PRODUCT_STATUS_REQUEST,
    UpdateProductStatusRequestAction
} from '../type/types';

export const fetchProductsRequest = (): FetchProductsRequestAction => ({
    type: FETCH_PRODUCTS_REQUEST
});

export const updateProductStatusRequest = (
    productId: string,
    status: string,
    comments: string,
    commentFor?: string,
    countryId?: string
): UpdateProductStatusRequestAction => ({
    type: UPDATE_PRODUCT_STATUS_REQUEST,
    payload: { productId, comments, status, commentFor, countryId }
});

export const addProductRequest = (
    product: ProductFormValues,
    navigate: (path: string) => void
): AddProductRequestAction => ({
    type: ADD_PRODUCT_REQUEST,
    payload: { ...product, navigate }
});

export const editProductRequest = (
    productId: number | string,
    product: ProductFormValues,
    navigate: (path: string) => void
): EditProductRequestAction => ({
    type: EDIT_PRODUCT_REQUEST,
    payload: { productId, product, navigate }
});

export const deleteProductRequest = (productId: number): DeleteProductRequestAction => ({
    type: DELETE_PRODUCT_REQUEST,
    payload: productId
});

export const getProductDetailsRequest = (
    productId: number | string
): FetchProductDetailsRequestAction => ({
    type: FETCH_PRODUCTDETAILS_REQUEST,
    payload: productId
});
