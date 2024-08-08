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
    DELETE_PRODUCT_CATEGORY_REQUEST,
    DELETE_PRODUCT_CATEGORY_SUCCESS,
    DELETE_PRODUCT_CATEGORY_FAILURE,
    UpdateProductCategoryRequestAction,
    DeleteProductCategoryRequestAction,
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
        yield put({ type: FETCH_PRODUCT_CATEGORIES_SUCCESS, payload: response.data });
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
}): Promise<AxiosResponse> => {
    const { categoryName, categoryDescription } = categoryData;
    return await axiosInstance.patch(`${apiUrl.productCategories}/${categoryData.categoryId}`, {
        categoryName,
        categoryDescription
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

//Delete Product Category API
const deleteProductCategory = async (categoryId: number | string): Promise<AxiosResponse> => {
    return await axiosInstance.delete(`${apiUrl.productCategories}/${categoryId}`);
};

function* handleDeleteProductCategory(action: DeleteProductCategoryRequestAction) {
    try {
        const { categoryId } = action.payload;
        yield call(deleteProductCategory, categoryId);
        yield put({ type: DELETE_PRODUCT_CATEGORY_SUCCESS, payload: { categoryId } });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: DELETE_PRODUCT_CATEGORY_FAILURE, error: errorMessage });
    }
}

export default function* productCategorySaga() {
    yield takeLatest(FETCH_PRODUCT_CATEGORIES_REQUEST, handleFetchProductCategories);
    yield takeLatest(ADD_PRODUCT_CATEGORY_REQUEST, handleAddProductCategory);
    yield takeLatest(UPDATE_PRODUCT_CATEGORY_REQUEST, handleUpdateProductCategory);
    yield takeLatest(DELETE_PRODUCT_CATEGORY_REQUEST, handleDeleteProductCategory);
}
