import {
    ADD_USER_DOCUMENT_REQUEST,
    ADD_USER_DOCUMENT_SUCCESS,
    ADD_USER_DOCUMENT_FAILURE,
    UPDATE_USER_DOCUMENT_REQUEST,
    UPDATE_USER_DOCUMENT_SUCCESS,
    UPDATE_USER_DOCUMENT_FAILURE,
    FETCH_USER_DOCUMENTS_REQUEST,
    FETCH_USER_DOCUMENTS_SUCCESS,
    FETCH_USER_DOCUMENTS_FAILURE,
    UserDocumentsActionTypes,
    UserDocumentProps
} from '../type/types';

type UserDocumentState = {
    isLoading: boolean;
    error: string | null;
    userDocuments: UserDocumentProps[];
};

const initialState: UserDocumentState = {
    isLoading: false,
    error: null,
    userDocuments: []
};

export const userDocumentsReducer = (
    state = initialState,
    action: UserDocumentsActionTypes
): UserDocumentState => {
    switch (action.type) {
        case ADD_USER_DOCUMENT_REQUEST:
        case UPDATE_USER_DOCUMENT_REQUEST:
        case FETCH_USER_DOCUMENTS_REQUEST:
            return { ...state, isLoading: true, error: null };

        case FETCH_USER_DOCUMENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                userDocuments: action.payload
            };

        case ADD_USER_DOCUMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userDocuments: [action.payload, ...state.userDocuments],
                error: null
            };

        case UPDATE_USER_DOCUMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userDocuments: state.userDocuments.map((document) =>
                    document.userdocument_id === action.payload.userdocument_id
                        ? action.payload
                        : document
                ),
                error: null
            };

        case FETCH_USER_DOCUMENTS_FAILURE:
        case ADD_USER_DOCUMENT_FAILURE:
        case UPDATE_USER_DOCUMENT_FAILURE:
            return { ...state, isLoading: false, error: action.error };

        default:
            return state;
    }
};
