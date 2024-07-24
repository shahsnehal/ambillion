export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

export type SignupRequestAction = {
    type: typeof SIGNUP_REQUEST;
    payload: SignupData & { navigate: (path: string) => void };
};

export type SignupSuccessAction = {
    type: typeof SIGNUP_SUCCESS;
};

export type SignupFailureAction = {
    type: typeof SIGNUP_FAILURE;
    error: string;
};

export type SigninRequestAction = {
    type: typeof SIGNIN_REQUEST;
    payload: SigninData & { navigate: (path: string) => void };
};

export type SigninSuccessAction = {
    type: typeof SIGNIN_SUCCESS;
    payload: {
        user: User;
    };
};

export type SigninFailureAction = {
    type: typeof SIGNIN_FAILURE;
    error: string;
};

export type AuthActionTypes =
    | SignupRequestAction
    | SignupSuccessAction
    | SignupFailureAction
    | SigninRequestAction
    | SigninSuccessAction
    | SigninFailureAction;

export type SignupData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    companyName?: string;
    mobileNumber: string;
    profileImage?: Text;
    userRoleId?: number;
    slug?: string;
    confirmPassword?: string;
};

export type SigninData = {
    email: string;
    password: string;
};

export type User = {
    userprofile_id: number;
    email: string;
    first_name: string;
    last_name: string;
    company_name: string;
    mobile_number: string;
    profile_image: string | null;
    user_role_id: number;
    slug: string | null;
    created_timestamp: string;
    created_by: string | null;
    lastlogin_timestamp: string | null;
    inactive_date: string | null;
    approved_by: string | null;
    approved_timestamp: string | null;
    status: string;
    audit_user_id: string | null;
    audit_timestamp: string;
};
