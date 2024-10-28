import {
    ADD_PRODUCT_DOCUMENT_TYPE_FAILURE,
    ADD_PRODUCT_DOCUMENT_TYPE_REQUEST,
    ADD_PRODUCT_DOCUMENT_TYPE_SUCCESS,
    FETCH_PRODUCT_DOCUMENT_TYPE_FAILURE,
    FETCH_PRODUCT_DOCUMENT_TYPE_REQUEST,
    FETCH_PRODUCT_DOCUMENT_TYPE_SUCCESS,
    ProductDocumentsType,
    ProductDocumentTypeActionTypes,
    UPDATE_PRODUCT_DOCUMENT_TYPE_FAILURE,
    UPDATE_PRODUCT_DOCUMENT_TYPE_REQUEST,
    UPDATE_PRODUCT_DOCUMENT_TYPE_SUCCESS
} from '../type/types';

type ProductDocumentTypeState = {
    isLoading: boolean;
    error: string | null;
    productDocumentsType: ProductDocumentsType[];
};

const initialState: ProductDocumentTypeState = {
    isLoading: false,
    error: null,
    productDocumentsType: []
};

export const productDocumentTypeReducer = (
    state = initialState,
    action: ProductDocumentTypeActionTypes
): ProductDocumentTypeState => {
    switch (action.type) {
        case FETCH_PRODUCT_DOCUMENT_TYPE_REQUEST:
        case ADD_PRODUCT_DOCUMENT_TYPE_REQUEST:
        case UPDATE_PRODUCT_DOCUMENT_TYPE_REQUEST:
            return { ...state, isLoading: true, error: null };

        case FETCH_PRODUCT_DOCUMENT_TYPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                productDocumentsType: action.payload,
                error: null
            };

        case ADD_PRODUCT_DOCUMENT_TYPE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                productDocumentsType: [action.payload, ...state.productDocumentsType],
                error: null
            };
        }

        case UPDATE_PRODUCT_DOCUMENT_TYPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                productDocumentsType: state.productDocumentsType.map((document) =>
                    document.document_type_id === action.payload.document_type_id
                        ? action.payload
                        : document
                ),
                error: null
            };

        case FETCH_PRODUCT_DOCUMENT_TYPE_FAILURE:
        case ADD_PRODUCT_DOCUMENT_TYPE_FAILURE:
        case UPDATE_PRODUCT_DOCUMENT_TYPE_FAILURE:
            return { ...state, isLoading: false, error: action.error };

        default:
            return state;
    }
};
