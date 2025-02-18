import {
    FetchHSNCodesRequestAction,
    FETCH_HSN_CODES_REQUEST,
    AddHSNCodeRequestAction,
    ADD_HSN_CODE_REQUEST,
    UpdateHSNCodeRequestAction,
    UPDATE_HSN_CODE_REQUEST,
    HSNDocumentTypePayload
} from '../type/types';

export const fetchHSNCodesRequest = (): FetchHSNCodesRequestAction => ({
    type: FETCH_HSN_CODES_REQUEST
});

export const addHSNCodeRequest = (
    hsnCode: string,
    hsnDescription: string,
    documentTypes: HSNDocumentTypePayload[]
): AddHSNCodeRequestAction => ({
    type: ADD_HSN_CODE_REQUEST,
    payload: {
        hsnCode,
        hsnDescription,
        documentTypes
    }
});

export const updateHSNCodeRequest = (
    hsnId: number | string,
    hsnCode: string,
    hsnDescription: string,
    documentTypes: HSNDocumentTypePayload[]
): UpdateHSNCodeRequestAction => ({
    type: UPDATE_HSN_CODE_REQUEST,
    payload: { hsnId, hsnCode, hsnDescription, documentTypes }
});
