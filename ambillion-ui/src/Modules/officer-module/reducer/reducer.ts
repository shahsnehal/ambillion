import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    UPDATE_PRODUCT_STATUS_REQUEST,
    UPDATE_PRODUCT_STATUS_SUCCESS,
    UPDATE_PRODUCT_STATUS_FAILURE,
    ProductActionTypes,
    Product
} from '../type/types';

type ProductState = {
    isLoading: boolean;
    error: string | null;
    products: Product[];
};

const initialState: ProductState = {
    isLoading: false,
    error: null,
    products: []
};

export const productsReducer = (state = initialState, action: ProductActionTypes): ProductState => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return { ...state, isLoading: true, error: null };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                products: action.payload
            };
        case FETCH_PRODUCTS_FAILURE:
            return { ...state, isLoading: false, error: action.error };
        case UPDATE_PRODUCT_STATUS_REQUEST:
            return { ...state, isLoading: true, error: null };
        case UPDATE_PRODUCT_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                products: state.products.map((product) =>
                    product.productId === action.payload.productId
                        ? { ...product, status: action.payload.status }
                        : product
                )
            };
        case UPDATE_PRODUCT_STATUS_FAILURE:
            return { ...state, isLoading: false, error: action.error };
        default:
            return state;
    }
};
