import { call, put, takeLatest } from 'redux-saga/effects';
import axiosInstance from 'utils/global/axiosInstance';
import { AxiosResponse } from 'axios';
import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    UPDATE_USER_STATUS_REQUEST,
    UPDATE_USER_STATUS_SUCCESS,
    UPDATE_USER_STATUS_FAILURE,
    UpdateUserStatusRequestAction,
    FETCH_USERDETAILS_REQUEST,
    FETCH_USERDETAILS_SUCCESS,
    FETCH_USERDETAILS_FAILURE
} from '../type/types';
import { apiUrl } from 'constants/common';

//Fetch UsersList API
const fetchUsers = async (): Promise<AxiosResponse> => {
    return await axiosInstance.get(apiUrl.users);
};

function* handleFetchUsers() {
    try {
        const response: AxiosResponse = yield call(fetchUsers);
        yield put({ type: FETCH_USERS_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: FETCH_USERS_FAILURE, error: errorMessage });
    }
}

//Update User Status API
const updateUserStatus = async (userId: number, status: string): Promise<AxiosResponse> => {
    return await axiosInstance.patch(`${apiUrl.users}`, {
        userId,
        status
    });
};

function* handleUpdateUserStatus(action: UpdateUserStatusRequestAction) {
    try {
        const { userId, status } = action.payload;
        yield call(updateUserStatus, userId, status);
        yield put({ type: UPDATE_USER_STATUS_SUCCESS, payload: { userId, status } });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: UPDATE_USER_STATUS_FAILURE, error: errorMessage });
    }
}

//Fetch UserDetailsBy ID API
const fetchUserDetailsById = async (userId: number | string): Promise<AxiosResponse> => {
    return await axiosInstance.get(`${apiUrl.users}/${userId}`);
};

function* handleFetchUserDetails(action: {
    type: typeof FETCH_USERDETAILS_REQUEST;
    payload: number;
}) {
    try {
        const response: AxiosResponse = yield call(fetchUserDetailsById, action.payload);
        const { user, documents } = response.data;
        yield put({
            type: FETCH_USERDETAILS_SUCCESS,
            payload: {
                user,
                documents
            }
        });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: FETCH_USERDETAILS_FAILURE, error: errorMessage });
    }
}

export default function* userSaga() {
    yield takeLatest(UPDATE_USER_STATUS_REQUEST, handleUpdateUserStatus);
    yield takeLatest(FETCH_USERS_REQUEST, handleFetchUsers);
    yield takeLatest(FETCH_USERDETAILS_REQUEST, handleFetchUserDetails);
}
