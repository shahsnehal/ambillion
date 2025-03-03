import {
    FETCH_USERDETAILS_REQUEST,
    FETCH_USERS_REQUEST,
    FetchUserDetailsRequestAction,
    FetchUsersRequestAction,
    UPDATE_USER_STATUS_REQUEST,
    UpdateUserStatusRequestAction
} from '../type/types';

export const fetchUsersRequest = (): FetchUsersRequestAction => ({
    type: FETCH_USERS_REQUEST
});

export const updateUserStatusRequest = (
    userId: number,
    status: string
): UpdateUserStatusRequestAction => ({
    type: UPDATE_USER_STATUS_REQUEST,
    payload: { userId, status }
});

export const fetchUserDetailsRequest = (
    userId: number | string
): FetchUserDetailsRequestAction => ({
    type: FETCH_USERDETAILS_REQUEST,
    payload: userId
});
