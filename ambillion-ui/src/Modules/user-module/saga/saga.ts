import { call, put, takeLatest } from 'redux-saga/effects';
import axiosInstance from 'global/axiosInstance';
import { AxiosResponse } from 'axios';
import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    UPDATE_USER_STATUS_REQUEST,
    UPDATE_USER_STATUS_SUCCESS,
    UPDATE_USER_STATUS_FAILURE,
    UpdateUserStatusRequestAction
} from '../type/types';
import { apiUrl } from 'constants/common';

const fetchUsersAPI = async (): Promise<AxiosResponse> => {
    return await axiosInstance.get(apiUrl.getUserList);
};

function* handleFetchUsers() {
    try {
        const response: AxiosResponse = yield call(fetchUsersAPI);
        yield put({ type: FETCH_USERS_SUCCESS, payload: response.data.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: FETCH_USERS_FAILURE, error: errorMessage });
    }
}

const updateUserStatusAPI = async (
    userId: number,
    status: string,
    profileID: number
): Promise<AxiosResponse> => {
    return await axiosInstance.patch(`${apiUrl.updateUserStatus}/${profileID}`, {
        userId,
        status
    });
};

function* handleUpdateUserStatus(action: UpdateUserStatusRequestAction) {
    const profileIDStr = localStorage.getItem('profileID');
    const profileID = profileIDStr ? parseInt(profileIDStr, 10) : 0;
    try {
        const { userId, status } = action.payload;
        yield call(updateUserStatusAPI, userId, status, profileID);
        yield put({ type: UPDATE_USER_STATUS_SUCCESS, payload: { userId, status } });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: UPDATE_USER_STATUS_FAILURE, error: errorMessage });
    }
}

export default function* userSaga() {
    yield takeLatest(UPDATE_USER_STATUS_REQUEST, handleUpdateUserStatus);
    yield takeLatest(FETCH_USERS_REQUEST, handleFetchUsers);
}
