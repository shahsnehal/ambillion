import {
    SIGNUP_REQUEST,
    SignupRequestAction,
    SignupData,
    SigninData,
    SIGNIN_REQUEST,
    SigninRequestAction
} from '../type/types';

export const signupRequest = (
    data: SignupData & { navigate: (path: string) => void }
): SignupRequestAction => ({
    type: SIGNUP_REQUEST,
    payload: data
});

export const signinRequest = (
    data: SigninData & { navigate: (path: string) => void }
): SigninRequestAction => ({
    type: SIGNIN_REQUEST,
    payload: data
});
