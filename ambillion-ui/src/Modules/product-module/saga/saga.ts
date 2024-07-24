import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_PRODUCTSLIST_BY_USER_REQUEST,
    GET_PRODUCTSLIST_BY_USER_SUCCESS,
    GET_PRODUCTSLIST_BY_USER_FAILURE,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    EDIT_PRODUCT_REQUEST,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    GET_PRODUCTDETAILS_BY_ID_REQUEST,
    GET_PRODUCTDETAILS_BY_ID_SUCCESS,
    GET_PRODUCTDETAILS_BY_ID_FAILURE,
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

// Fetch ALLProducts API
const fetchAllProductsAPI = async (): Promise<AxiosResponse> => {
    return await axiosInstance.get(apiUrl.getAllProducts);
};

function* handleFetchAllProducts() {
    try {
        const response: AxiosResponse = yield call(fetchAllProductsAPI);
        yield put({ type: FETCH_ALL_PRODUCTS_SUCCESS, payload: { data: response.data.data } });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: FETCH_ALL_PRODUCTS_FAILURE, error: errorMessage });
    }
}

//Fetch ProductsList For Particular User
const fetchProductsListByUser = async (userID: number): Promise<AxiosResponse> => {
    return await axiosInstance.get(`${apiUrl.PRODUCTSLIST}/${userID}`);
};

function* handleFetchProductsListByUser() {
    try {
        const userIDStr = localStorage.getItem('profileID');
        const userID = userIDStr ? parseInt(userIDStr, 10) : 0;
        const response: AxiosResponse = yield call(fetchProductsListByUser, userID);
        yield put({ type: GET_PRODUCTSLIST_BY_USER_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: GET_PRODUCTSLIST_BY_USER_FAILURE, error: errorMessage });
    }
}

// Update product status API
const updateProductStatusAPI = async (
    productId: string,
    userId: string,
    status: string,
    comments: string
): Promise<AxiosResponse> => {
    return await axiosInstance.patch(`${apiUrl.updateProductStatus}`, {
        productId,
        userId,
        status,
        comments
    });
};

function* handleUpdateProductStatus(action: UpdateProductStatusRequestAction) {
    try {
        const { productId, userId, status, comments } = action.payload;
        yield call(updateProductStatusAPI, productId, userId, status, comments);
        yield put({
            type: UPDATE_PRODUCT_STATUS_SUCCESS,
            payload: { productId, userId, status, comments }
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

//Edit Product API
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

//Delete Product API
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

//Fetch ProductsDetailsBy ID API
const fetchProductDetailsById = async (productId: number): Promise<AxiosResponse> => {
    return await axiosInstance.get(`${apiUrl.getProductDetailsById}/${productId}`);
};

function* handleFetchProductDetailsById(action: {
    type: typeof GET_PRODUCTDETAILS_BY_ID_REQUEST;
    payload: number;
}) {
    try {
        const response: AxiosResponse = yield call(fetchProductDetailsById, action.payload);
        yield put({ type: GET_PRODUCTDETAILS_BY_ID_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: GET_PRODUCTDETAILS_BY_ID_FAILURE, error: errorMessage });
    }
}

export default function* productSaga() {
    yield takeLatest(GET_PRODUCTSLIST_BY_USER_REQUEST, handleFetchProductsListByUser);
    yield takeLatest(FETCH_ALL_PRODUCTS_REQUEST, handleFetchAllProducts);
    yield takeLatest(UPDATE_PRODUCT_STATUS_REQUEST, handleUpdateProductStatus);
    yield takeLatest(ADD_PRODUCT_REQUEST, handleAddProduct);
    yield takeLatest(EDIT_PRODUCT_REQUEST, handleEditProduct);
    yield takeLatest(DELETE_PRODUCT_REQUEST, handleDeleteProduct);
    yield takeLatest(GET_PRODUCTDETAILS_BY_ID_REQUEST, handleFetchProductDetailsById);
}
