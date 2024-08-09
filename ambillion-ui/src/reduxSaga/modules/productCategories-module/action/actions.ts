import {
    FetchProductCategoriesRequestAction,
    FETCH_PRODUCT_CATEGORIES_REQUEST,
    AddProductCategoryRequestAction,
    ADD_PRODUCT_CATEGORY_REQUEST,
    UpdateProductCategoryRequestAction,
    UPDATE_PRODUCT_CATEGORY_REQUEST,
    DeleteProductCategoryRequestAction,
    DELETE_PRODUCT_CATEGORY_REQUEST
} from '../type/types';

export const fetchProductCategoriesRequest = (): FetchProductCategoriesRequestAction => ({
    type: FETCH_PRODUCT_CATEGORIES_REQUEST
});

export const addProductCategoryRequest = (
    categoryName: string,
    categoryDescription: string
): AddProductCategoryRequestAction => ({
    type: ADD_PRODUCT_CATEGORY_REQUEST,
    payload: {
        categoryName,
        categoryDescription
    }
});

export const updateProductCategoryRequest = (
    categoryId: number | string,
    categoryName: string,
    categoryDescription: string
): UpdateProductCategoryRequestAction => ({
    type: UPDATE_PRODUCT_CATEGORY_REQUEST,
    payload: { categoryId, categoryName, categoryDescription }
});

export const deleteProductCategoryRequest = (
    categoryId: number | string
): DeleteProductCategoryRequestAction => ({
    type: DELETE_PRODUCT_CATEGORY_REQUEST,
    payload: { categoryId }
});
