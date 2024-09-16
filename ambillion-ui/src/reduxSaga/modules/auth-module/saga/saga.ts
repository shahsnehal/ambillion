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
import { apiUrl, localStorageKey, ROUTES } from 'constants/common';
import axiosInstance from 'utils/global/axiosInstance';
import { AxiosResponse } from 'axios';
import { setLocalStorage } from 'utils/localStorage';

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
        const responseData = response.data;
        const userData = responseData.user;
        const { access } = responseData.tokens;
        const { productCategories } = responseData;
        yield put({ type: SIGNIN_SUCCESS, payload: responseData });

        setLocalStorage(localStorageKey.USER_PROFILE, userData);
        setLocalStorage(localStorageKey.JWT_TOKEN, access.token);
        setLocalStorage(localStorageKey.PRODUCT_CATEGORIES, productCategories);

        action.payload.navigate(ROUTES.PRODUCTS);
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
