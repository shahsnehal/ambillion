import {
    FetchProductDocumentTypeRequestAction,
    FETCH_PRODUCT_DOCUMENT_TYPE_REQUEST,
    AddProductDocumentTypeRequestAction,
    ADD_PRODUCT_DOCUMENT_TYPE_REQUEST,
    UpdateProductDocumentTypeRequestAction,
    UPDATE_PRODUCT_DOCUMENT_TYPE_REQUEST
} from '../type/types';

export const fetchProductDocumentTypeRequest = (): FetchProductDocumentTypeRequestAction => ({
    type: FETCH_PRODUCT_DOCUMENT_TYPE_REQUEST
});

export const addProductDocumentTypeRequest = (
    documentTypeName: string,
    documentTypeDescription: string,
    documentTypeFormat: string,
    documentCategoryId: number | string
): AddProductDocumentTypeRequestAction => ({
    type: ADD_PRODUCT_DOCUMENT_TYPE_REQUEST,
    payload: {
        documentTypeName,
        documentTypeDescription,
        documentTypeFormat,
        documentCategoryId
    }
});

export const updateProductDocumentTypeRequest = (
    documentTypeId: number | string,
    documentTypeName: string,
    documentTypeDescription: string,
    documentTypeFormat: string,
    documentCategoryId: number | string
): UpdateProductDocumentTypeRequestAction => ({
    type: UPDATE_PRODUCT_DOCUMENT_TYPE_REQUEST,
    payload: {
        documentTypeId,
        documentTypeName,
        documentTypeDescription,
        documentTypeFormat,
        documentCategoryId
    }
});
