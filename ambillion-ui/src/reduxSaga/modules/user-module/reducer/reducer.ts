import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    UPDATE_USER_STATUS_REQUEST,
    UPDATE_USER_STATUS_SUCCESS,
    UPDATE_USER_STATUS_FAILURE,
    UserActionTypes,
    User,
    FETCH_USERDETAILS_REQUEST,
    FETCH_USERDETAILS_SUCCESS,
    UserDetailsWithDocuments,
    FETCH_USERDETAILS_FAILURE
} from '../type/types';

type UserState = {
    isLoading: boolean;
    error: string | null;
    users: User[];
    selectedUserDetails: UserDetailsWithDocuments | null;
};

const initialState: UserState = {
    isLoading: false,
    error: null,
    users: [],
    selectedUserDetails: null
};

export const userReducer = (state = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return { ...state, isLoading: true, error: null };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                users: action.payload
            };
        case FETCH_USERS_FAILURE:
            return { ...state, isLoading: false, error: action.error };
        case UPDATE_USER_STATUS_REQUEST:
            return { ...state, isLoading: true, error: null };
        case UPDATE_USER_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                users: state.users.map((user) =>
                    user.userprofile_id === action.payload.userId
                        ? { ...user, status: action.payload.status }
                        : user
                )
            };
        case UPDATE_USER_STATUS_FAILURE:
            return { ...state, isLoading: false, error: action.error };
        case FETCH_USERDETAILS_REQUEST:
            return { ...state, isLoading: true, error: null };
        case FETCH_USERDETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                selectedUserDetails: {
                    user: action.payload.user,
                    documents: action.payload.documents
                },
                error: null
            };
        case FETCH_USERDETAILS_FAILURE:
            return { ...state, isLoading: false, error: action.error };
        default:
            return state;
    }
};
