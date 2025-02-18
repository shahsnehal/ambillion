import {
    ADD_HSN_CODE_FAILURE,
    ADD_HSN_CODE_REQUEST,
    ADD_HSN_CODE_SUCCESS,
    HSNDocumentType,
    FETCH_HSN_CODES_FAILURE,
    FETCH_HSN_CODES_REQUEST,
    FETCH_HSN_CODES_SUCCESS,
    HSNCode,
    HSNCodeActionTypes,
    UPDATE_HSN_CODE_FAILURE,
    UPDATE_HSN_CODE_REQUEST,
    UPDATE_HSN_CODE_SUCCESS
} from '../type/types';

type HSNCodeState = {
    isLoading: boolean;
    error: string | null;
    hsnCodes: HSNCode[];
    hsnDocumentTypes: HSNDocumentType[];
};

const initialState: HSNCodeState = {
    isLoading: false,
    error: null,
    hsnCodes: [],
    hsnDocumentTypes: []
};

export const hsnCodeReducer = (state = initialState, action: HSNCodeActionTypes): HSNCodeState => {
    switch (action.type) {
        case FETCH_HSN_CODES_REQUEST:
        case ADD_HSN_CODE_REQUEST:
        case UPDATE_HSN_CODE_REQUEST:
            return { ...state, isLoading: true, error: null };

        case FETCH_HSN_CODES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                hsnCodes: action.payload.hsnCodes,
                hsnDocumentTypes: action.payload.documentTypes,
                error: null
            };

        case ADD_HSN_CODE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                hsnCodes: [action.payload, ...state.hsnCodes],
                error: null
            };

        case UPDATE_HSN_CODE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                hsnCodes: state.hsnCodes.map((hsn) =>
                    hsn.hsn_id === action.payload.hsn_id ? action.payload : hsn
                ),
                error: null
            };

        case FETCH_HSN_CODES_FAILURE:
        case ADD_HSN_CODE_FAILURE:
        case UPDATE_HSN_CODE_FAILURE:
            return { ...state, isLoading: false, error: action.error };

        default:
            return state;
    }
};
