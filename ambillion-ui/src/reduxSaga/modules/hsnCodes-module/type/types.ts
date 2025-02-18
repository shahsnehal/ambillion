export const FETCH_HSN_CODES_REQUEST = 'FETCH_HSN_CODES_REQUEST';
export const FETCH_HSN_CODES_SUCCESS = 'FETCH_HSN_CODES_SUCCESS';
export const FETCH_HSN_CODES_FAILURE = 'FETCH_HSN_CODES_FAILURE';

export const ADD_HSN_CODE_REQUEST = 'ADD_HSN_CODE_REQUEST';
export const ADD_HSN_CODE_SUCCESS = 'ADD_HSN_CODE_SUCCESS';
export const ADD_HSN_CODE_FAILURE = 'ADD_HSN_CODE_FAILURE';

export const UPDATE_HSN_CODE_REQUEST = 'UPDATE_HSN_CODE_REQUEST';
export const UPDATE_HSN_CODE_SUCCESS = 'UPDATE_HSN_CODE_SUCCESS';
export const UPDATE_HSN_CODE_FAILURE = 'UPDATE_HSN_CODE_FAILURE';

export type HSNCode = {
    hsn_id: number | string;
    hsn_code: string;
    hsn_description: string;
    documents: HSNDocumentType[];
};

export type HSNDocumentType = {
    document_type_id: number | string;
    document_type_name: string;
    document_type_description: string;
    document_type_format: string;
    mandatory: boolean;
};

export type HSNDocumentTypePayload = {
    documentTypeId: number | string;
    mandatory: boolean;
};

export type HSNDocumentTypePayloadErrors = {
    documentTypeId?: string;
    mandatory?: string;
};

export type HSNDocumentTypePayloadTouched = {
    documentTypeId?: boolean;
    mandatory?: boolean;
};

export type HSNCodeFormValues = {
    hsnId: number | string;
    hsnCode: string;
    hsnDescription: string;
    documentTypes: HSNDocumentTypePayload[];
};

export type FetchHSNCodesRequestAction = {
    type: typeof FETCH_HSN_CODES_REQUEST;
};

export type FetchHSNCodesSuccessPayload = {
    hsnCodes: HSNCode[];
    documentTypes: HSNDocumentType[];
};

export type FetchHSNCodesSuccessAction = {
    type: typeof FETCH_HSN_CODES_SUCCESS;
    payload: FetchHSNCodesSuccessPayload;
};

export type FetchHSNCodesFailureAction = {
    type: typeof FETCH_HSN_CODES_FAILURE;
    error: string;
};

export type AddHSNCodeRequestAction = {
    type: typeof ADD_HSN_CODE_REQUEST;
    payload: {
        hsnCode: string;
        hsnDescription: string;
        documentTypes: HSNDocumentTypePayload[];
    };
};

export type AddHSNCodeSuccessAction = {
    type: typeof ADD_HSN_CODE_SUCCESS;
    payload: HSNCode;
};

export type AddHSNCodeFailureAction = {
    type: typeof ADD_HSN_CODE_FAILURE;
    error: string;
};

export type UpdateHSNCodeRequestAction = {
    type: typeof UPDATE_HSN_CODE_REQUEST;
    payload: {
        hsnId: number | string;
        hsnCode: string;
        hsnDescription: string;
        documentTypes: HSNDocumentTypePayload[];
    };
};

export type UpdateHSNCodeSuccessAction = {
    type: typeof UPDATE_HSN_CODE_SUCCESS;
    payload: HSNCode;
};

export type UpdateHSNCodeFailureAction = {
    type: typeof UPDATE_HSN_CODE_FAILURE;
    error: string;
};

export type HSNCodeActionTypes =
    | FetchHSNCodesRequestAction
    | FetchHSNCodesSuccessAction
    | FetchHSNCodesFailureAction
    | AddHSNCodeRequestAction
    | AddHSNCodeSuccessAction
    | AddHSNCodeFailureAction
    | UpdateHSNCodeRequestAction
    | UpdateHSNCodeSuccessAction
    | UpdateHSNCodeFailureAction;
