import {
    FetchProductCategoriesRequestAction,
    FETCH_PRODUCT_CATEGORIES_REQUEST,
    AddProductCategoryRequestAction,
    ADD_PRODUCT_CATEGORY_REQUEST,
    UpdateProductCategoryRequestAction,
    UPDATE_PRODUCT_CATEGORY_REQUEST,
    CategoryDocumentTypePayload
} from '../type/types';

export const fetchProductCategoriesRequest = (): FetchProductCategoriesRequestAction => ({
    type: FETCH_PRODUCT_CATEGORIES_REQUEST
});

export const addProductCategoryRequest = (
    categoryName: string,
    categoryDescription: string,
    documentTypes: CategoryDocumentTypePayload[]
): AddProductCategoryRequestAction => ({
    type: ADD_PRODUCT_CATEGORY_REQUEST,
    payload: {
        categoryName,
        categoryDescription,
        documentTypes
    }
});

export const updateProductCategoryRequest = (
    categoryId: number | string,
    categoryName: string,
    categoryDescription: string,
    documentTypes: CategoryDocumentTypePayload[]
): UpdateProductCategoryRequestAction => ({
    type: UPDATE_PRODUCT_CATEGORY_REQUEST,
    payload: { categoryId, categoryName, categoryDescription, documentTypes }
});
