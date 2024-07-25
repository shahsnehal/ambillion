import {
    FETCH_USERS_REQUEST,
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
