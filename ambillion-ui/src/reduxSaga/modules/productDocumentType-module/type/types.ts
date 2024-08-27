export const FETCH_PRODUCT_DOCUMENT_TYPE_REQUEST = 'FETCH_PRODUCT_DOCUMENT_TYPE_REQUEST';
export const FETCH_PRODUCT_DOCUMENT_TYPE_SUCCESS = 'FETCH_PRODUCT_DOCUMENT_TYPE_SUCCESS';
export const FETCH_PRODUCT_DOCUMENT_TYPE_FAILURE = 'FETCH_PRODUCT_DOCUMENT_TYPE_FAILURE';

export const ADD_PRODUCT_DOCUMENT_TYPE_REQUEST = 'ADD_PRODUCT_DOCUMENT_TYPE_REQUEST';
export const ADD_PRODUCT_DOCUMENT_TYPE_SUCCESS = 'ADD_PRODUCT_DOCUMENT_TYPE_SUCCESS';
export const ADD_PRODUCT_DOCUMENT_TYPE_FAILURE = 'ADD_PRODUCT_DOCUMENT_TYPE_FAILURE';

export const UPDATE_PRODUCT_DOCUMENT_TYPE_REQUEST = 'UPDATE_PRODUCT_DOCUMENT_TYPE_REQUEST';
export const UPDATE_PRODUCT_DOCUMENT_TYPE_SUCCESS = 'UPDATE_PRODUCT_DOCUMENT_TYPE_SUCCESS';
export const UPDATE_PRODUCT_DOCUMENT_TYPE_FAILURE = 'UPDATE_PRODUCT_DOCUMENT_TYPE_FAILURE';

export type ProductDocumentsType = {
    document_type_id: number | string;
    document_type_name: string;
    document_type_description: string;
    document_type_format: string;
    category_id: number | string;
    category_name: string;
    mandatory: boolean;
};

export type ProductDocumentTypeFormValues = {
    documentTypeId: number | string;
    documentTypeName: string;
    documentTypeDescription: string;
    documentTypeFormat: string;
    documentCategoryId: number | string;
};

export type FetchProductDocumentTypeRequestAction = {
    type: typeof FETCH_PRODUCT_DOCUMENT_TYPE_REQUEST;
};

export type FetchProductDocumentTypeSuccessAction = {
    type: typeof FETCH_PRODUCT_DOCUMENT_TYPE_SUCCESS;
    payload: ProductDocumentsType[];
};

export type FetchProductDocumentTypeFailureAction = {
    type: typeof FETCH_PRODUCT_DOCUMENT_TYPE_FAILURE;
    error: string;
};

export type AddProductDocumentTypeRequestAction = {
    type: typeof ADD_PRODUCT_DOCUMENT_TYPE_REQUEST;
    payload: {
        documentTypeName: string;
        documentTypeDescription: string;
        documentTypeFormat: string;
        documentCategoryId: number | string;
    };
};

export type AddProductDocumentTypeSuccessAction = {
    type: typeof ADD_PRODUCT_DOCUMENT_TYPE_SUCCESS;
    payload: ProductDocumentsType;
};

export type AddProductDocumentTypeFailureAction = {
    type: typeof ADD_PRODUCT_DOCUMENT_TYPE_FAILURE;
    error: string;
};

export type UpdateProductDocumentTypeRequestAction = {
    type: typeof UPDATE_PRODUCT_DOCUMENT_TYPE_REQUEST;
    payload: {
        documentTypeId: number | string;
        documentTypeName: string;
        documentTypeDescription: string;
        documentTypeFormat: string;
        documentCategoryId: number | string;
    };
};

export type UpdateProductDocumentTypeSuccessAction = {
    type: typeof UPDATE_PRODUCT_DOCUMENT_TYPE_SUCCESS;
    payload: ProductDocumentsType;
};

export type UpdateProductDocumentTypeFailureAction = {
    type: typeof UPDATE_PRODUCT_DOCUMENT_TYPE_FAILURE;
    error: string;
};

export type ProductDocumentTypeActionTypes =
    | FetchProductDocumentTypeRequestAction
    | FetchProductDocumentTypeSuccessAction
    | FetchProductDocumentTypeFailureAction
    | AddProductDocumentTypeRequestAction
    | AddProductDocumentTypeSuccessAction
    | AddProductDocumentTypeFailureAction
    | UpdateProductDocumentTypeRequestAction
    | UpdateProductDocumentTypeSuccessAction
    | UpdateProductDocumentTypeFailureAction;
