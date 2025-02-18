import { call, put, takeLatest } from 'redux-saga/effects';
import {
    FETCH_HSN_CODES_REQUEST,
    FETCH_HSN_CODES_SUCCESS,
    FETCH_HSN_CODES_FAILURE,
    ADD_HSN_CODE_REQUEST,
    ADD_HSN_CODE_SUCCESS,
    ADD_HSN_CODE_FAILURE,
    UPDATE_HSN_CODE_REQUEST,
    UPDATE_HSN_CODE_SUCCESS,
    UPDATE_HSN_CODE_FAILURE,
    UpdateHSNCodeRequestAction,
    AddHSNCodeRequestAction
} from '../type/types';
import { apiUrl } from 'constants/common';
import axiosInstance from 'utils/global/axiosInstance';
import { AxiosResponse } from 'axios';

// Fetch HSN Codes API
const fetchHSNCodes = async (): Promise<AxiosResponse> => {
    return await axiosInstance.get(apiUrl.hsnCodes);
};

function* handleFetchHSNCodes() {
    try {
        const response: AxiosResponse = yield call(fetchHSNCodes);
        const { hsnCodes, documentTypes } = response.data;
        yield put({
            type: FETCH_HSN_CODES_SUCCESS,
            payload: { hsnCodes, documentTypes }
        });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: FETCH_HSN_CODES_FAILURE, error: errorMessage });
    }
}

// Add HSN Code API
const addHSNCode = async (hsnData: {
    hsnCode: string;
    hsnDescription: string;
    documentTypes: { documentTypeId: number | string; mandatory: boolean }[];
}): Promise<AxiosResponse> => {
    return await axiosInstance.post(apiUrl.hsnCodes, hsnData);
};

function* handleAddHSNCode(action: AddHSNCodeRequestAction) {
    try {
        const response: AxiosResponse = yield call(addHSNCode, action.payload);
        yield put({ type: ADD_HSN_CODE_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: ADD_HSN_CODE_FAILURE, error: errorMessage });
    }
}

// Update HSN Code API
const updateHSNCode = async (hsnData: {
    hsnId: number | string;
    hsnCode: string;
    hsnDescription: string;
    documentTypes: { documentTypeId: number | string; mandatory: boolean }[];
}): Promise<AxiosResponse> => {
    const { hsnCode, hsnDescription, documentTypes } = hsnData;
    return await axiosInstance.patch(`${apiUrl.hsnCodes}/${hsnData.hsnId}`, {
        hsnCode,
        hsnDescription,
        documentTypes
    });
};

function* handleUpdateHSNCode(action: UpdateHSNCodeRequestAction) {
    try {
        const response: AxiosResponse = yield call(updateHSNCode, action.payload);
        yield put({ type: UPDATE_HSN_CODE_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: UPDATE_HSN_CODE_FAILURE, error: errorMessage });
    }
}

export default function* hsnCodeSaga() {
    yield takeLatest(FETCH_HSN_CODES_REQUEST, handleFetchHSNCodes);
    yield takeLatest(ADD_HSN_CODE_REQUEST, handleAddHSNCode);
    yield takeLatest(UPDATE_HSN_CODE_REQUEST, handleUpdateHSNCode);
}
