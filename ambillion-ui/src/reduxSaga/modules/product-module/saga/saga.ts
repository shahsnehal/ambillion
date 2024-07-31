import { call, put, takeLatest } from 'redux-saga/effects';
import {
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    EDIT_PRODUCT_REQUEST,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    FETCH_PRODUCTDETAILS_REQUEST,
    FETCH_PRODUCTDETAILS_SUCCESS,
    FETCH_PRODUCTDETAILS_FAILURE,
    ProductFormValues,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    UPDATE_PRODUCT_STATUS_REQUEST,
    UPDATE_PRODUCT_STATUS_SUCCESS,
    UPDATE_PRODUCT_STATUS_FAILURE,
    UpdateProductStatusRequestAction
} from '../type/types';
import { apiUrl, ROUTES } from 'constants/common';
import axiosInstance from 'utils/global/axiosInstance';
import { AxiosResponse } from 'axios';

// Fetch ALLProducts API
const fetchProductsAPI = async (): Promise<AxiosResponse> => {
    return await axiosInstance.get(apiUrl.products);
};

function* handleFetchProducts() {
    try {
        const response: AxiosResponse = yield call(fetchProductsAPI);
        yield put({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: FETCH_PRODUCTS_FAILURE, error: errorMessage });
    }
}

// Update product status API
const updateProductStatusAPI = async (
    productId: string,
    status: string,
    comments: string
): Promise<AxiosResponse> => {
    return await axiosInstance.patch(`${apiUrl.products}`, {
        productId,
        status,
        comments
    });
};

function* handleUpdateProductStatus(action: UpdateProductStatusRequestAction) {
    try {
        const { productId, status, comments } = action.payload;
        yield call(updateProductStatusAPI, productId, status, comments);
        yield put({
            type: UPDATE_PRODUCT_STATUS_SUCCESS,
            payload: { productId, status, comments }
        });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: UPDATE_PRODUCT_STATUS_FAILURE, error: errorMessage });
    }
}

//Add Product API
const addProduct = async (productData: ProductFormValues): Promise<AxiosResponse> => {
    return await axiosInstance.post(apiUrl.products, productData);
};

function* handleAddProduct(action: {
    type: typeof ADD_PRODUCT_REQUEST;
    payload: ProductFormValues & { navigate: (path: string) => void };
}) {
    try {
        const response: AxiosResponse = yield call(addProduct, action.payload);
        yield put({ type: ADD_PRODUCT_SUCCESS, payload: response.data });
        action.payload.navigate(ROUTES.PRODUCTSLIST);
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: ADD_PRODUCT_FAILURE, error: errorMessage });
    }
}

//Edit Product API
const editProduct = async (productData: ProductFormValues): Promise<AxiosResponse> => {
    return await axiosInstance.put(`${apiUrl.products}`, productData);
};

function* handleEditProduct(action: {
    type: typeof EDIT_PRODUCT_REQUEST;
    payload: ProductFormValues & { navigate: (path: string) => void };
}) {
    try {
        const response: AxiosResponse = yield call(editProduct, action.payload);
        yield put({ type: EDIT_PRODUCT_SUCCESS, payload: response.data });
        action.payload.navigate(ROUTES.PRODUCTS);
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: EDIT_PRODUCT_FAILURE, error: errorMessage });
    }
}

//Delete Product API
const deleteProduct = async (productId: number): Promise<AxiosResponse> => {
    return await axiosInstance.delete(`${apiUrl.products}/${productId}`);
};

function* handleDeleteProduct(action: { type: typeof DELETE_PRODUCT_REQUEST; payload: number }) {
    try {
        // const response: AxiosResponse = yield call(deleteProduct, action.payload);
        yield call(deleteProduct, action.payload);
        yield put({ type: DELETE_PRODUCT_SUCCESS, payload: action.payload });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: DELETE_PRODUCT_FAILURE, error: errorMessage });
    }
}

//Fetch ProductsDetailsBy ID API
const fetchProductDetailsById = async (productId: number | string): Promise<AxiosResponse> => {
    return await axiosInstance.get(`${apiUrl.products}/${productId}`);
};

function* handleFetchProductDetails(action: {
    type: typeof FETCH_PRODUCTDETAILS_REQUEST;
    payload: number;
}) {
    try {
        const response: AxiosResponse = yield call(fetchProductDetailsById, action.payload);
        yield put({ type: FETCH_PRODUCTDETAILS_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: FETCH_PRODUCTDETAILS_FAILURE, error: errorMessage });
    }
}

export default function* productSaga() {
    yield takeLatest(FETCH_PRODUCTS_REQUEST, handleFetchProducts);
    yield takeLatest(UPDATE_PRODUCT_STATUS_REQUEST, handleUpdateProductStatus);
    yield takeLatest(ADD_PRODUCT_REQUEST, handleAddProduct);
    yield takeLatest(EDIT_PRODUCT_REQUEST, handleEditProduct);
    yield takeLatest(DELETE_PRODUCT_REQUEST, handleDeleteProduct);
    yield takeLatest(FETCH_PRODUCTDETAILS_REQUEST, handleFetchProductDetails);
}
