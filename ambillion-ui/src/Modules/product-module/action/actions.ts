import {
    GET_PRODUCTSLIST_BY_USER_REQUEST,
    FetchProductsListByUserRequestAction,
    ADD_PRODUCT_REQUEST,
    AddProductRequestAction,
    EDIT_PRODUCT_REQUEST,
    EditProductRequestAction,
    DELETE_PRODUCT_REQUEST,
    DeleteProductRequestAction,
    GET_PRODUCTDETAILS_BY_ID_REQUEST,
    FetchProductDetailsByIdRequestAction,
    ProductFormValues,
    FETCH_ALL_PRODUCTS_REQUEST,
    FetchAllProductsRequestAction,
    UPDATE_PRODUCT_STATUS_REQUEST,
    UpdateProductStatusRequestAction
} from '../type/types';

export const getProductsRequest = (): FetchProductsListByUserRequestAction => ({
    type: GET_PRODUCTSLIST_BY_USER_REQUEST
});

export const fetchProductsRequest = (): FetchAllProductsRequestAction => ({
    type: FETCH_ALL_PRODUCTS_REQUEST
});

export const updateProductStatusRequest = (
    productId: string,
    status: string,
    comments: string
): UpdateProductStatusRequestAction => ({
    type: UPDATE_PRODUCT_STATUS_REQUEST,
    payload: { productId, comments, status }
});

export const addProductRequest = (
    product: ProductFormValues,
    navigate: (path: string) => void
): AddProductRequestAction => ({
    type: ADD_PRODUCT_REQUEST,
    payload: { product, navigate }
});

export const editProductRequest = (
    product: ProductFormValues,
    navigate: (path: string) => void
): EditProductRequestAction => ({
    type: EDIT_PRODUCT_REQUEST,
    payload: { product, navigate }
});

export const deleteProductRequest = (productId: number): DeleteProductRequestAction => ({
    type: DELETE_PRODUCT_REQUEST,
    payload: productId
});

export const getProductByIdRequest = (productId: number): FetchProductDetailsByIdRequestAction => ({
    type: GET_PRODUCTDETAILS_BY_ID_REQUEST,
    payload: productId
});
