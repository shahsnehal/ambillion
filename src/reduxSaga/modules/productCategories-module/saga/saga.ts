import { call, put, takeLatest } from 'redux-saga/effects';
import {
    FETCH_PRODUCT_CATEGORIES_REQUEST,
    FETCH_PRODUCT_CATEGORIES_SUCCESS,
    FETCH_PRODUCT_CATEGORIES_FAILURE,
    ADD_PRODUCT_CATEGORY_REQUEST,
    ADD_PRODUCT_CATEGORY_SUCCESS,
    ADD_PRODUCT_CATEGORY_FAILURE,
    UPDATE_PRODUCT_CATEGORY_REQUEST,
    UPDATE_PRODUCT_CATEGORY_SUCCESS,
    UPDATE_PRODUCT_CATEGORY_FAILURE,
    UpdateProductCategoryRequestAction,
    AddProductCategoryRequestAction
} from '../type/types';
import { apiUrl } from 'constants/common';
import axiosInstance from 'utils/global/axiosInstance';
import { AxiosResponse } from 'axios';

// Fetch ALLProductCategories API
const fetchProductCategories = async (): Promise<AxiosResponse> => {
    return await axiosInstance.get(apiUrl.productCategories);
};

function* handleFetchProductCategories() {
    try {
        const response: AxiosResponse = yield call(fetchProductCategories);
        const { categories, documentTypes } = response.data;
        yield put({
            type: FETCH_PRODUCT_CATEGORIES_SUCCESS,
            payload: { categories, documentTypes }
        });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: FETCH_PRODUCT_CATEGORIES_FAILURE, error: errorMessage });
    }
}

// Add Product Category API
const addProductCategory = async (categoryData: {
    categoryName: string;
    categoryDescription: string;
    documentTypes: { documentTypeId: number | string; mandatory: boolean }[];
}): Promise<AxiosResponse> => {
    return await axiosInstance.post(apiUrl.productCategories, categoryData);
};

function* handleAddProductCategory(action: AddProductCategoryRequestAction) {
    try {
        const response: AxiosResponse = yield call(addProductCategory, action.payload);
        yield put({ type: ADD_PRODUCT_CATEGORY_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: ADD_PRODUCT_CATEGORY_FAILURE, error: errorMessage });
    }
}

//Update Product Category API
const updateProductCategory = async (categoryData: {
    categoryId: number | string;
    categoryName: string;
    categoryDescription: string;
    documentTypes: { documentTypeId: number | string; mandatory: boolean }[];
}): Promise<AxiosResponse> => {
    const { categoryName, categoryDescription, documentTypes } = categoryData;
    return await axiosInstance.patch(`${apiUrl.productCategories}/${categoryData.categoryId}`, {
        categoryName,
        categoryDescription,
        documentTypes
    });
};

function* handleUpdateProductCategory(action: UpdateProductCategoryRequestAction) {
    try {
        const response: AxiosResponse = yield call(updateProductCategory, action.payload);
        yield put({ type: UPDATE_PRODUCT_CATEGORY_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: UPDATE_PRODUCT_CATEGORY_FAILURE, error: errorMessage });
    }
}

export default function* productCategorySaga() {
    yield takeLatest(FETCH_PRODUCT_CATEGORIES_REQUEST, handleFetchProductCategories);
    yield takeLatest(ADD_PRODUCT_CATEGORY_REQUEST, handleAddProductCategory);
    yield takeLatest(UPDATE_PRODUCT_CATEGORY_REQUEST, handleUpdateProductCategory);
}
