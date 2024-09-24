import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_FAILURE,
    AuthActionTypes,
    User
} from '../type/types';

type AuthState = {
    isLoading: boolean;
    error: string | null;
    user: User | null;
};

const initialState: AuthState = {
    isLoading: false,
    error: null,
    user: null
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return { ...state, isLoading: true, error: null };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null
            };
        case SIGNUP_FAILURE:
            return { ...state, isLoading: false, error: action.error };

        case SIGNIN_REQUEST:
            return { ...state, isLoading: true, error: null };
        case SIGNIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                error: null
            };
        case SIGNIN_FAILURE:
            return { ...state, isLoading: false, error: action.error };

        default:
            return state;
    }
};
