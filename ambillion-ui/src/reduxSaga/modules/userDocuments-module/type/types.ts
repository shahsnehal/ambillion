export const FETCH_USER_DOCUMENTS_REQUEST = 'FETCH_USER_DOCUMENTS_REQUEST';
export const FETCH_USER_DOCUMENTS_SUCCESS = 'FETCH_USER_DOCUMENTS_SUCCESS';
export const FETCH_USER_DOCUMENTS_FAILURE = 'FETCH_USER_DOCUMENTS_FAILURE';

export const ADD_USER_DOCUMENT_REQUEST = 'ADD_USER_DOCUMENT_REQUEST';
export const ADD_USER_DOCUMENT_SUCCESS = 'ADD_USER_DOCUMENT_SUCCESS';
export const ADD_USER_DOCUMENT_FAILURE = 'ADD_USER_DOCUMENT_FAILURE';

export const UPDATE_USER_DOCUMENT_REQUEST = 'UPDATE_USER_DOCUMENT_REQUEST';
export const UPDATE_USER_DOCUMENT_SUCCESS = 'UPDATE_USER_DOCUMENT_SUCCESS';
export const UPDATE_USER_DOCUMENT_FAILURE = 'UPDATE_USER_DOCUMENT_FAILURE';

export type UserDocumentProps = {
    userdocument_id: string | number;
    document_name: string;
    filetype: string;
    file_path: string;
    audit_timestamp: string;
    role: string;
    base64Data?: string;
    document_type: string;
    contentpath: string;
    userprofile_id: string | number;
};

export type UserDocument = {
    documentType: string;
    documentName: string;
    documentData: string;
    auditTimestamp?: string;
};

export type UserDocumentsWrapperProps = {
    documents: UserDocument[] | null;
    className?: string;
};

export type FetchUserDocumentsRequestAction = {
    type: typeof FETCH_USER_DOCUMENTS_REQUEST;
    payload: number | string;
};

export type FetchUserDocumentsSuccessAction = {
    type: typeof FETCH_USER_DOCUMENTS_SUCCESS;
    payload: UserDocumentProps[];
};

export type FetchUserDocumentsFailureAction = {
    type: typeof FETCH_USER_DOCUMENTS_FAILURE;
    error: string;
};

export type AddUserDocumentRequestAction = {
    type: typeof ADD_USER_DOCUMENT_REQUEST;
    payload: UserDocument;
};

export type AddUserDocumentSuccessAction = {
    type: typeof ADD_USER_DOCUMENT_SUCCESS;
    payload: UserDocumentProps;
};

export type AddUserDocumentFailureAction = {
    type: typeof ADD_USER_DOCUMENT_FAILURE;
    error: string;
};

export type UpdateUserDocumentRequestAction = {
    type: typeof UPDATE_USER_DOCUMENT_REQUEST;
    payload: {
        userDocumentId: string | number;
        updatedDocument: UserDocument;
    };
};

export type UpdateUserDocumentSuccessAction = {
    type: typeof UPDATE_USER_DOCUMENT_SUCCESS;
    payload: UserDocumentProps;
};

export type UpdateUserDocumentFailureAction = {
    type: typeof UPDATE_USER_DOCUMENT_FAILURE;
    error: string;
};

export type UserDocumentsActionTypes =
    | FetchUserDocumentsRequestAction
    | FetchUserDocumentsSuccessAction
    | FetchUserDocumentsFailureAction
    | AddUserDocumentRequestAction
    | AddUserDocumentSuccessAction
    | AddUserDocumentFailureAction
    | UpdateUserDocumentRequestAction
    | UpdateUserDocumentSuccessAction
    | UpdateUserDocumentFailureAction;
