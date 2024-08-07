export const FETCH_PRODUCT_CATEGORIES_REQUEST = 'FETCH_PRODUCT_CATEGORIES_REQUEST';
export const FETCH_PRODUCT_CATEGORIES_SUCCESS = 'FETCH_PRODUCT_CATEGORIES_SUCCESS';
export const FETCH_PRODUCT_CATEGORIES_FAILURE = 'FETCH_PRODUCT_CATEGORIES_FAILURE';

export const ADD_PRODUCT_CATEGORY_REQUEST = 'ADD_PRODUCT_CATEGORY_REQUEST';
export const ADD_PRODUCT_CATEGORY_SUCCESS = 'ADD_PRODUCT_CATEGORY_SUCCESS';
export const ADD_PRODUCT_CATEGORY_FAILURE = 'ADD_PRODUCT_CATEGORY_FAILURE';

export const UPDATE_PRODUCT_CATEGORY_REQUEST = 'UPDATE_PRODUCT_CATEGORY_REQUEST';
export const UPDATE_PRODUCT_CATEGORY_SUCCESS = 'UPDATE_PRODUCT_CATEGORY_SUCCESS';
export const UPDATE_PRODUCT_CATEGORY_FAILURE = 'UPDATE_PRODUCT_CATEGORY_FAILURE';

export const DELETE_PRODUCT_CATEGORY_REQUEST = 'DELETE_PRODUCT_CATEGORY_REQUEST';
export const DELETE_PRODUCT_CATEGORY_SUCCESS = 'DELETE_PRODUCT_CATEGORY_SUCCESS';
export const DELETE_PRODUCT_CATEGORY_FAILURE = 'DELETE_PRODUCT_CATEGORY_FAILURE';

export type ProductCategory = {
    category_id: number | string;
    category_name: string;
    category_description: string;
};

export type ProductCategoryFormValues = {
    categoryId: number | string;
    categoryName: string;
    categoryDescription: string;
};

export type FetchProductCategoriesRequestAction = {
    type: typeof FETCH_PRODUCT_CATEGORIES_REQUEST;
};

export type FetchProductCategoriesSuccessAction = {
    type: typeof FETCH_PRODUCT_CATEGORIES_SUCCESS;
    payload: ProductCategory[];
};

export type FetchProductCategoriesFailureAction = {
    type: typeof FETCH_PRODUCT_CATEGORIES_FAILURE;
    error: string;
};

export type AddProductCategoryRequestAction = {
    type: typeof ADD_PRODUCT_CATEGORY_REQUEST;
    payload: { categoryName: string; categoryDescription: string };
};

export type AddProductCategorySuccessAction = {
    type: typeof ADD_PRODUCT_CATEGORY_SUCCESS;
    payload: ProductCategory;
};

export type AddProductCategoryFailureAction = {
    type: typeof ADD_PRODUCT_CATEGORY_FAILURE;
    error: string;
};

export type UpdateProductCategoryRequestAction = {
    type: typeof UPDATE_PRODUCT_CATEGORY_REQUEST;
    payload: {
        categoryId: number | string;
        categoryName: string;
        categoryDescription: string;
    };
};

export type UpdateProductCategorySuccessAction = {
    type: typeof UPDATE_PRODUCT_CATEGORY_SUCCESS;
    payload: ProductCategory;
};

export type UpdateProductCategoryFailureAction = {
    type: typeof UPDATE_PRODUCT_CATEGORY_FAILURE;
    error: string;
};

export type DeleteProductCategoryRequestAction = {
    type: typeof DELETE_PRODUCT_CATEGORY_REQUEST;
    payload: {
        categoryId: number | string;
    };
};

export type DeleteProductCategorySuccessAction = {
    type: typeof DELETE_PRODUCT_CATEGORY_SUCCESS;
    payload: {
        categoryId: number | string;
    };
};

export type DeleteProductCategoryFailureAction = {
    type: typeof DELETE_PRODUCT_CATEGORY_FAILURE;
    error: string;
};

export type ProductCategoryActionTypes =
    | FetchProductCategoriesRequestAction
    | FetchProductCategoriesSuccessAction
    | FetchProductCategoriesFailureAction
    | AddProductCategoryRequestAction
    | AddProductCategorySuccessAction
    | AddProductCategoryFailureAction
    | UpdateProductCategoryRequestAction
    | UpdateProductCategorySuccessAction
    | UpdateProductCategoryFailureAction
    | DeleteProductCategoryRequestAction
    | DeleteProductCategorySuccessAction
    | DeleteProductCategoryFailureAction;
