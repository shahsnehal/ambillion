import {
    ADD_USER_DOCUMENT_REQUEST,
    AddUserDocumentRequestAction,
    FETCH_USER_DOCUMENTS_REQUEST,
    FetchUserDocumentsRequestAction,
    UPDATE_USER_DOCUMENT_REQUEST,
    UpdateUserDocumentRequestAction,
    UserDocument
} from '../type/types';

export const fetchUserDocumentsRequest = (
    userId: number | string
): FetchUserDocumentsRequestAction => ({
    type: FETCH_USER_DOCUMENTS_REQUEST,
    payload: userId
});

export const addUserDocumentRequest = (document: UserDocument): AddUserDocumentRequestAction => ({
    type: ADD_USER_DOCUMENT_REQUEST,
    payload: { ...document }
});

export const updateUserDocumentRequest = (
    userDocumentId: number | string,
    updatedDocument: UserDocument
): UpdateUserDocumentRequestAction => ({
    type: UPDATE_USER_DOCUMENT_REQUEST,
    payload: { userDocumentId, updatedDocument }
});
