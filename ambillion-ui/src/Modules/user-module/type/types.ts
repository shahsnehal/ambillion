export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const UPDATE_USER_STATUS_REQUEST = 'UPDATE_USER_STATUS_REQUEST';
export const UPDATE_USER_STATUS_SUCCESS = 'UPDATE_USER_STATUS_SUCCESS';
export const UPDATE_USER_STATUS_FAILURE = 'UPDATE_USER_STATUS_FAILURE';

export type User = {
    userprofile_id: number;
    first_name: string;
    last_name: string;
    email: string;
    company_name?: string;
    mobile_number: string;
    status: string;
};

export type FetchUsersRequestAction = {
    type: typeof FETCH_USERS_REQUEST;
};

export type FetchUsersSuccessAction = {
    type: typeof FETCH_USERS_SUCCESS;
    payload: User[];
};

export type FetchUsersFailureAction = {
    type: typeof FETCH_USERS_FAILURE;
    error: string;
};

export type UpdateUserStatusRequestAction = {
    type: typeof UPDATE_USER_STATUS_REQUEST;
    payload: { userId: number; status: string };
};

export type UpdateUserStatusSuccessAction = {
    type: typeof UPDATE_USER_STATUS_SUCCESS;
    payload: { userId: number; status: string };
};

export type UpdateUserStatusFailureAction = {
    type: typeof UPDATE_USER_STATUS_FAILURE;
    error: string;
};

export type UserActionTypes =
    | FetchUsersRequestAction
    | FetchUsersSuccessAction
    | FetchUsersFailureAction
    | UpdateUserStatusRequestAction
    | UpdateUserStatusSuccessAction
    | UpdateUserStatusFailureAction;
