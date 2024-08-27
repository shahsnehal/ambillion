import { call, put, takeLatest } from 'redux-saga/effects';
import {
    FETCH_PRODUCT_DOCUMENT_TYPE_REQUEST,
    FETCH_PRODUCT_DOCUMENT_TYPE_SUCCESS,
    FETCH_PRODUCT_DOCUMENT_TYPE_FAILURE,
    ADD_PRODUCT_DOCUMENT_TYPE_REQUEST,
    ADD_PRODUCT_DOCUMENT_TYPE_SUCCESS,
    ADD_PRODUCT_DOCUMENT_TYPE_FAILURE,
    UPDATE_PRODUCT_DOCUMENT_TYPE_REQUEST,
    UPDATE_PRODUCT_DOCUMENT_TYPE_SUCCESS,
    UPDATE_PRODUCT_DOCUMENT_TYPE_FAILURE,
    UpdateProductDocumentTypeRequestAction,
    AddProductDocumentTypeRequestAction
} from '../type/types';
import { apiUrl } from 'constants/common';
import axiosInstance from 'utils/global/axiosInstance';
import { AxiosResponse } from 'axios';

// Fetch All ProductDocumentType API
const fetchProductDocumentType = async (): Promise<AxiosResponse> => {
    return await axiosInstance.get(apiUrl.productDocumentType);
};

function* handleFetchProductDocumentType() {
    try {
        const response: AxiosResponse = yield call(fetchProductDocumentType);
        yield put({ type: FETCH_PRODUCT_DOCUMENT_TYPE_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: FETCH_PRODUCT_DOCUMENT_TYPE_FAILURE, error: errorMessage });
    }
}

// Add ProductDocumentType API
const addProductDocumentType = async (documentData: {
    documentTypeName: string;
    documentTypeDescription: string;
    documentTypeFormat: string;
    documentCategoryId: number | string;
}): Promise<AxiosResponse> => {
    return await axiosInstance.post(apiUrl.productDocumentType, documentData);
};

function* handleAddProductDocumentType(action: AddProductDocumentTypeRequestAction) {
    try {
        const response: AxiosResponse = yield call(addProductDocumentType, action.payload);
        yield put({ type: ADD_PRODUCT_DOCUMENT_TYPE_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: ADD_PRODUCT_DOCUMENT_TYPE_FAILURE, error: errorMessage });
    }
}

// Update ProductDocumentType API
const updateProductDocumentType = async (documentData: {
    documentTypeId: number | string;
    documentTypeName: string;
    documentTypeDescription: string;
    documentTypeFormat: string;
    documentCategoryId: number | string;
}): Promise<AxiosResponse> => {
    const { documentTypeName, documentTypeDescription, documentTypeFormat, documentCategoryId } =
        documentData;
    return await axiosInstance.patch(
        `${apiUrl.productDocumentType}/${documentData.documentTypeId}`,
        {
            documentTypeName,
            documentTypeDescription,
            documentTypeFormat,
            documentCategoryId
        }
    );
};

function* handleUpdateProductDocumentType(action: UpdateProductDocumentTypeRequestAction) {
    try {
        const response: AxiosResponse = yield call(updateProductDocumentType, action.payload);
        yield put({ type: UPDATE_PRODUCT_DOCUMENT_TYPE_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: UPDATE_PRODUCT_DOCUMENT_TYPE_FAILURE, error: errorMessage });
    }
}

export default function* ProductDocumentTypeSaga() {
    yield takeLatest(FETCH_PRODUCT_DOCUMENT_TYPE_REQUEST, handleFetchProductDocumentType);
    yield takeLatest(ADD_PRODUCT_DOCUMENT_TYPE_REQUEST, handleAddProductDocumentType);
    yield takeLatest(UPDATE_PRODUCT_DOCUMENT_TYPE_REQUEST, handleUpdateProductDocumentType);
}
