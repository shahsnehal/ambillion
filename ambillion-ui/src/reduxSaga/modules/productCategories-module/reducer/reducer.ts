import {
    ADD_PRODUCT_CATEGORY_FAILURE,
    ADD_PRODUCT_CATEGORY_REQUEST,
    ADD_PRODUCT_CATEGORY_SUCCESS,
    DELETE_PRODUCT_CATEGORY_FAILURE,
    DELETE_PRODUCT_CATEGORY_REQUEST,
    DELETE_PRODUCT_CATEGORY_SUCCESS,
    FETCH_PRODUCT_CATEGORIES_FAILURE,
    FETCH_PRODUCT_CATEGORIES_REQUEST,
    FETCH_PRODUCT_CATEGORIES_SUCCESS,
    ProductCategory,
    ProductCategoryActionTypes,
    UPDATE_PRODUCT_CATEGORY_FAILURE,
    UPDATE_PRODUCT_CATEGORY_REQUEST,
    UPDATE_PRODUCT_CATEGORY_SUCCESS
} from '../type/types';

type ProductCategoryState = {
    isLoading: boolean;
    error: string | null;
    productCategories: ProductCategory[];
};

const initialState: ProductCategoryState = {
    isLoading: false,
    error: null,
    productCategories: []
};

export const productCategoryReducer = (
    state = initialState,
    action: ProductCategoryActionTypes
): ProductCategoryState => {
    switch (action.type) {
        case FETCH_PRODUCT_CATEGORIES_REQUEST:
        case ADD_PRODUCT_CATEGORY_REQUEST:
        case UPDATE_PRODUCT_CATEGORY_REQUEST:
        case DELETE_PRODUCT_CATEGORY_REQUEST:
            return { ...state, isLoading: true, error: null };

        case FETCH_PRODUCT_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                productCategories: action.payload,
                error: null
            };

        case ADD_PRODUCT_CATEGORY_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                productCategories: [action.payload, ...state.productCategories],
                error: null
            };
        }

        case UPDATE_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                productCategories: state.productCategories.map((category) =>
                    category.category_id === action.payload.category_id ? action.payload : category
                ),
                error: null
            };

        case DELETE_PRODUCT_CATEGORY_SUCCESS: {
            const updatedProductCategories = state.productCategories.filter((category) => {
                return category.category_id !== action.payload.categoryId;
            });
            return {
                ...state,
                isLoading: false,
                productCategories: updatedProductCategories,
                error: null
            };
        }

        case FETCH_PRODUCT_CATEGORIES_FAILURE:
        case ADD_PRODUCT_CATEGORY_FAILURE:
        case UPDATE_PRODUCT_CATEGORY_FAILURE:
        case DELETE_PRODUCT_CATEGORY_FAILURE:
            return { ...state, isLoading: false, error: action.error };

        default:
            return state;
    }
};
