import {
    GET_PRODUCTS_REQUEST,
    GetProductsRequestAction,
    ADD_PRODUCT_REQUEST,
    AddProductRequestAction,
    EDIT_PRODUCT_REQUEST,
    EditProductRequestAction,
    DELETE_PRODUCT_REQUEST,
    DeleteProductRequestAction,
    GET_PRODUCT_BY_ID_REQUEST,
    GetProductByIdRequestAction,
    ProductFormValues
} from '../type/types';

export const getProductsRequest = (): GetProductsRequestAction => ({
    type: GET_PRODUCTS_REQUEST
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

export const getProductByIdRequest = (productId: number): GetProductByIdRequestAction => ({
    type: GET_PRODUCT_BY_ID_REQUEST,
    payload: productId
});
