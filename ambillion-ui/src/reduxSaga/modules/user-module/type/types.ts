import { UserDocumentProps } from 'reduxSaga/modules/userDocuments-module/type/types';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const UPDATE_USER_STATUS_REQUEST = 'UPDATE_USER_STATUS_REQUEST';
export const UPDATE_USER_STATUS_SUCCESS = 'UPDATE_USER_STATUS_SUCCESS';
export const UPDATE_USER_STATUS_FAILURE = 'UPDATE_USER_STATUS_FAILURE';

export const FETCH_USERDETAILS_REQUEST = 'FETCH_USERDETAILS_REQUEST';
export const FETCH_USERDETAILS_SUCCESS = 'FETCH_USERDETAILS_SUCCESS';
export const FETCH_USERDETAILS_FAILURE = 'FETCH_USERDETAILS_FAILURE';

export type User = {
    userprofile_id: number;
    first_name: string;
    last_name: string;
    name: string;
    email: string;
    company_name?: string;
    mobile_number: string;
    created_timestamp: string;
    status: string;
    profile_image?: string;
    role_name?: string;
};

export type UserDetailsWithDocuments = {
    user: User;
    documents: UserDocumentProps[] | null;
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

export type FetchUserDetailsRequestAction = {
    type: typeof FETCH_USERDETAILS_REQUEST;
    payload: number | string;
};

export type FetchUserDetailsSuccessAction = {
    type: typeof FETCH_USERDETAILS_SUCCESS;
    payload: UserDetailsWithDocuments;
};

export type FetchUserDetailsFailureAction = {
    type: typeof FETCH_USERDETAILS_FAILURE;
    error: string;
};

export type UserActionTypes =
    | FetchUsersRequestAction
    | FetchUsersSuccessAction
    | FetchUsersFailureAction
    | UpdateUserStatusRequestAction
    | UpdateUserStatusSuccessAction
    | UpdateUserStatusFailureAction
    | FetchUserDetailsRequestAction
    | FetchUserDetailsSuccessAction
    | FetchUserDetailsFailureAction;
