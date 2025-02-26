import { call, put, takeLatest } from 'redux-saga/effects';
import {
    ADD_USER_DOCUMENT_REQUEST,
    ADD_USER_DOCUMENT_SUCCESS,
    ADD_USER_DOCUMENT_FAILURE,
    FETCH_USER_DOCUMENTS_REQUEST,
    FETCH_USER_DOCUMENTS_SUCCESS,
    FETCH_USER_DOCUMENTS_FAILURE,
    UserDocument,
    UPDATE_USER_DOCUMENT_FAILURE,
    UPDATE_USER_DOCUMENT_REQUEST,
    UPDATE_USER_DOCUMENT_SUCCESS,
    UpdateUserDocumentRequestAction
} from '../type/types';
import { apiUrl } from 'constants/common';
import axiosInstance from 'utils/global/axiosInstance';
import { AxiosResponse } from 'axios';

// Fetch User Documents API
const fetchUserDocumentsAPI = async (userId: number | string): Promise<AxiosResponse> => {
    return await axiosInstance.get(`${apiUrl.userDocuments}/${userId}`);
};

function* handleFetchUserDocuments(action: {
    type: typeof FETCH_USER_DOCUMENTS_REQUEST;
    payload: number;
}) {
    try {
        const response: AxiosResponse = yield call(fetchUserDocumentsAPI, action.payload);
        yield put({ type: FETCH_USER_DOCUMENTS_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: FETCH_USER_DOCUMENTS_FAILURE, error: errorMessage });
    }
}

// Add User Document API
const addUserDocumentAPI = async (documentData: UserDocument): Promise<AxiosResponse> => {
    return await axiosInstance.post(apiUrl.userDocuments, documentData);
};

function* handleAddUserDocument(action: {
    type: typeof ADD_USER_DOCUMENT_REQUEST;
    payload: UserDocument;
}) {
    try {
        const response: AxiosResponse = yield call(addUserDocumentAPI, action.payload);
        yield put({ type: ADD_USER_DOCUMENT_SUCCESS, payload: response.data.document });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: ADD_USER_DOCUMENT_FAILURE, error: errorMessage });
    }
}

// Update User Document API
const updateUserDocumentAPI = async (updatedDocument: {
    userDocumentId: string | number;
    documentName: string;
    documentType: string;
    documentData: string;
}): Promise<AxiosResponse> => {
    const { userDocumentId, documentName, documentType, documentData } = updatedDocument;
    return await axiosInstance.patch(`${apiUrl.userDocuments}/${userDocumentId}`, {
        documentName,
        documentType,
        documentData
    });
};

function* handleUpdateUserDocument(action: UpdateUserDocumentRequestAction) {
    try {
        const { userDocumentId, updatedDocument } = action.payload;
        const response: AxiosResponse = yield call(updateUserDocumentAPI, {
            userDocumentId,
            documentName: updatedDocument.documentName,
            documentType: updatedDocument.documentType,
            documentData: updatedDocument.documentData
        });
        yield put({
            type: UPDATE_USER_DOCUMENT_SUCCESS,
            payload: response.data.document
        });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: UPDATE_USER_DOCUMENT_FAILURE, error: errorMessage });
    }
}

export default function* userDocumentsSaga() {
    yield takeLatest(FETCH_USER_DOCUMENTS_REQUEST, handleFetchUserDocuments);
    yield takeLatest(ADD_USER_DOCUMENT_REQUEST, handleAddUserDocument);
    yield takeLatest(UPDATE_USER_DOCUMENT_REQUEST, handleUpdateUserDocument);
}
