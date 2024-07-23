import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_PRODUCTS_BY_USER_REQUEST,
    GET_PRODUCTS_BY_USER_SUCCESS,
    GET_PRODUCTS_BY_USER_FAILURE,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    EDIT_PRODUCT_REQUEST,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    GET_PRODUCT_BY_ID_REQUEST,
    GET_PRODUCT_BY_ID_SUCCESS,
    GET_PRODUCT_BY_ID_FAILURE,
    ProductFormValues,
    FETCH_ALL_PRODUCTS_REQUEST,
    FETCH_ALL_PRODUCTS_SUCCESS,
    FETCH_ALL_PRODUCTS_FAILURE,
    UPDATE_PRODUCT_STATUS_REQUEST,
    UPDATE_PRODUCT_STATUS_SUCCESS,
    UPDATE_PRODUCT_STATUS_FAILURE,
    UpdateProductStatusRequestAction
} from '../type/types';
import { apiUrl, ROUTES } from 'constants/common';
import axiosInstance from 'global/axiosInstance';
import { AxiosResponse } from 'axios';

const profileIDStr = localStorage.getItem('profileID');
const profileID = profileIDStr ? parseInt(profileIDStr, 10) : 0;

const getProducts = async (): Promise<AxiosResponse> => {
    return await axiosInstance.get(`apiUrl.getProductById/${profileID}`);
};

function* handleGetProducts() {
    try {
        const response: AxiosResponse = yield call(getProducts);
        yield put({ type: GET_PRODUCTS_BY_USER_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: GET_PRODUCTS_BY_USER_FAILURE, error: errorMessage });
    }
}

const addProduct = async (productData: ProductFormValues): Promise<AxiosResponse> => {
    return await axiosInstance.post(apiUrl.addProduct, productData);
};

function* handleAddProduct(action: {
    type: typeof ADD_PRODUCT_REQUEST;
    payload: ProductFormValues & { navigate: (path: string) => void };
}) {
    try {
        const response: AxiosResponse = yield call(addProduct, action.payload);
        yield put({ type: ADD_PRODUCT_SUCCESS, payload: response.data });
        action.payload.navigate(ROUTES.PRODUCTS);
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: ADD_PRODUCT_FAILURE, error: errorMessage });
    }
}

const editProduct = async (productData: ProductFormValues): Promise<AxiosResponse> => {
    return await axiosInstance.put(`${apiUrl.updateProduct}`, productData);
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

const deleteProduct = async (productId: number): Promise<AxiosResponse> => {
    return await axiosInstance.delete(`${apiUrl.deleteProduct}/${productId}`);
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

const getProductById = async (productId: number): Promise<AxiosResponse> => {
    return await axiosInstance.get(`${apiUrl.getProductById}/${productId}`);
};

function* handleGetProductById(action: {
    type: typeof GET_PRODUCT_BY_ID_REQUEST;
    payload: number;
}) {
    try {
        const response: AxiosResponse = yield call(getProductById, action.payload);
        yield put({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: GET_PRODUCT_BY_ID_FAILURE, error: errorMessage });
    }
}

// Fetch ALLProducts API
const fetchProductsAPI = async (): Promise<AxiosResponse> => {
    return await axiosInstance.get(apiUrl.getProducts);
};

function* handleFetchProducts() {
    try {
        const response: AxiosResponse = yield call(fetchProductsAPI);
        yield put({ type: FETCH_ALL_PRODUCTS_SUCCESS, payload: response.data.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: FETCH_ALL_PRODUCTS_FAILURE, error: errorMessage });
    }
}

// Update product status API
const updateProductStatusAPI = async (
    productId: number,
    status: string,
    profileID: number
): Promise<AxiosResponse> => {
    return await axiosInstance.patch(`${apiUrl.updateProductStatus}/${profileID}`, {
        productId,
        status
    });
};

function* handleUpdateProductStatus(action: UpdateProductStatusRequestAction) {
    const profileIDStr = localStorage.getItem('profileID');
    const profileID = profileIDStr ? parseInt(profileIDStr, 10) : 0;
    try {
        const { productId, status } = action.payload;
        yield call(updateProductStatusAPI, productId, status, profileID);
        yield put({ type: UPDATE_PRODUCT_STATUS_SUCCESS, payload: { productId, status } });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: UPDATE_PRODUCT_STATUS_FAILURE, error: errorMessage });
    }
}

export default function* productSaga() {
    yield takeLatest(GET_PRODUCTS_BY_USER_REQUEST, handleGetProducts);
    yield takeLatest(ADD_PRODUCT_REQUEST, handleAddProduct);
    yield takeLatest(EDIT_PRODUCT_REQUEST, handleEditProduct);
    yield takeLatest(DELETE_PRODUCT_REQUEST, handleDeleteProduct);
    yield takeLatest(GET_PRODUCT_BY_ID_REQUEST, handleGetProductById);
    yield takeLatest(UPDATE_PRODUCT_STATUS_REQUEST, handleUpdateProductStatus);
    yield takeLatest(FETCH_ALL_PRODUCTS_REQUEST, handleFetchProducts);
}
