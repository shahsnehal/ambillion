import { call, put, takeLatest } from 'redux-saga/effects';
import {
    SIGNUP_REQUEST,
    SignupData,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    SigninData,
    SIGNIN_SUCCESS,
    SIGNIN_FAILURE,
    SIGNIN_REQUEST
} from '../type/types';
import { apiUrl, ROUTES } from 'constants/common';
import axiosInstance from 'global/axiosInstance';
import { AxiosResponse } from 'axios';

const signup = async (signupData: SignupData): Promise<AxiosResponse> => {
    return await axiosInstance.post(apiUrl.signUp, signupData);
};

function* handleSignup(action: {
    type: string;
    payload: SignupData & { navigate: (path: string) => void };
}) {
    try {
        const response: AxiosResponse = yield call(signup, action.payload);
        yield put({ type: SIGNUP_SUCCESS, payload: response.data });
        action.payload.navigate(ROUTES.LOGIN);
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: SIGNUP_FAILURE, error: errorMessage });
    }
}

const signin = async (SigninData: SigninData): Promise<AxiosResponse> => {
    return await axiosInstance.post(apiUrl.signIn, SigninData);
};

function* handleSignin(action: {
    type: string;
    payload: SigninData & { navigate: (path: string) => void };
}) {
    try {
        const response: AxiosResponse = yield call(signin, action.payload);
        const responseData = response.data.data;
        const { userprofile_id: userProfileID } = responseData.user;
        const { access, refresh } = responseData.tokens;

        yield put({ type: SIGNIN_SUCCESS, payload: responseData });

        localStorage.setItem('profileID', userProfileID);
        localStorage.setItem('accessToken', access.token);
        localStorage.setItem('refreshToken', refresh.token);

        action.payload.navigate(ROUTES.DASHBOARD);
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: SIGNIN_FAILURE, error: errorMessage });
    }
}

export default function* authSaga() {
    yield takeLatest(SIGNUP_REQUEST, handleSignup);
    yield takeLatest(SIGNIN_REQUEST, handleSignin);
}
