import { call, put, takeLatest } from 'redux-saga/effects';
import {
    FETCH_COUNTRY_REQUEST,
    FETCH_COUNTRY_SUCCESS,
    FETCH_COUNTRY_FAILURE,
    ADD_COUNTRY_REQUEST,
    ADD_COUNTRY_SUCCESS,
    ADD_COUNTRY_FAILURE,
    UPDATE_COUNTRY_REQUEST,
    UPDATE_COUNTRY_SUCCESS,
    UPDATE_COUNTRY_FAILURE,
    AddCountryRequestAction,
    UpdateCountryRequestAction
} from '../type/types';
import { apiUrl } from 'constants/common';
import axiosInstance from 'utils/global/axiosInstance';
import { AxiosResponse } from 'axios';

// Fetch All Countries API
const fetchCountry = async (): Promise<AxiosResponse> => {
    return await axiosInstance.get(apiUrl.countries);
};

function* handleFetchCountry() {
    try {
        const response: AxiosResponse = yield call(fetchCountry);
        yield put({ type: FETCH_COUNTRY_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: FETCH_COUNTRY_FAILURE, error: errorMessage });
    }
}

// Add Country API
const addCountry = async (countryData: {
    countryCode: string;
    countryName: string;
}): Promise<AxiosResponse> => {
    return await axiosInstance.post(apiUrl.countries, countryData);
};

function* handleAddCountry(action: AddCountryRequestAction) {
    try {
        const response: AxiosResponse = yield call(addCountry, action.payload);
        yield put({ type: ADD_COUNTRY_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: ADD_COUNTRY_FAILURE, error: errorMessage });
    }
}

// Update Country API
const updateCountry = async (countryData: {
    countryId: number | string;
    countryCode: string;
    countryName: string;
}): Promise<AxiosResponse> => {
    const { countryCode, countryName } = countryData;
    return await axiosInstance.patch(`${apiUrl.countries}/${countryData.countryId}`, {
        countryCode,
        countryName
    });
};

function* handleUpdateCountry(action: UpdateCountryRequestAction) {
    try {
        const response: AxiosResponse = yield call(updateCountry, action.payload);
        yield put({ type: UPDATE_COUNTRY_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: UPDATE_COUNTRY_FAILURE, error: errorMessage });
    }
}

export default function* countrySaga() {
    yield takeLatest(FETCH_COUNTRY_REQUEST, handleFetchCountry);
    yield takeLatest(ADD_COUNTRY_REQUEST, handleAddCountry);
    yield takeLatest(UPDATE_COUNTRY_REQUEST, handleUpdateCountry);
}
