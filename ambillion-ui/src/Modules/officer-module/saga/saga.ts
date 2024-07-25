import { call, put, takeLatest } from 'redux-saga/effects';
import axiosInstance from 'global/axiosInstance';
import { AxiosResponse } from 'axios';
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    UPDATE_PRODUCT_STATUS_REQUEST,
    UPDATE_PRODUCT_STATUS_SUCCESS,
    UPDATE_PRODUCT_STATUS_FAILURE,
    UpdateProductStatusRequestAction
} from '../type/types';
import { apiUrl } from 'constants/common';

// Fetch products API
const fetchProductsAPI = async (): Promise<AxiosResponse> => {
    return await axiosInstance.get(apiUrl.products);
};

function* handleFetchProducts() {
    try {
        const response: AxiosResponse = yield call(fetchProductsAPI);
        yield put({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data.data });
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
    productId: number,
    status: string,
    profileID: number
): Promise<AxiosResponse> => {
    return await axiosInstance.patch(`${apiUrl.products}`, {
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

export default function* productsSaga() {
    yield takeLatest(UPDATE_PRODUCT_STATUS_REQUEST, handleUpdateProductStatus);
    yield takeLatest(FETCH_PRODUCTS_REQUEST, handleFetchProducts);
}
