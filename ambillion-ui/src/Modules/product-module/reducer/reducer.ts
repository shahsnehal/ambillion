import {
    GET_PRODUCTS_BY_USER_REQUEST,
    GET_PRODUCTS_BY_USER_SUCCESS,
    GET_PRODUCTS_BY_USER_FAILURE,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    EDIT_PRODUCT_REQUEST,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    GET_PRODUCT_BY_ID_REQUEST,
    GET_PRODUCT_BY_ID_SUCCESS,
    GET_PRODUCT_BY_ID_FAILURE,
    FETCH_ALL_PRODUCTS_REQUEST,
    FETCH_ALL_PRODUCTS_SUCCESS,
    FETCH_ALL_PRODUCTS_FAILURE,
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
    selectedProduct: Product | null;
};

const initialState: ProductState = {
    isLoading: false,
    error: null,
    products: [],
    selectedProduct: null
};

export const productReducer = (state = initialState, action: ProductActionTypes): ProductState => {
    switch (action.type) {
        case GET_PRODUCTS_BY_USER_REQUEST:
        case ADD_PRODUCT_REQUEST:
        case EDIT_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
        case FETCH_ALL_PRODUCTS_REQUEST:
        case UPDATE_PRODUCT_STATUS_REQUEST:
        case GET_PRODUCT_BY_ID_REQUEST:
            return { ...state, isLoading: true, error: null };

        case FETCH_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                products: action.payload
            };

        case GET_PRODUCTS_BY_USER_SUCCESS:
            return { ...state, isLoading: false, products: action.payload, error: null };

        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: [...state.products, action.payload],
                error: null
            };

        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: state.products.map((product) =>
                    product.productId === action.payload.productId ? action.payload : product
                ),
                error: null
            };

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: state.products.filter((product) => product.productId !== action.payload),
                error: null
            };

        case GET_PRODUCT_BY_ID_SUCCESS:
            return { ...state, isLoading: false, selectedProduct: action.payload, error: null };

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

        case GET_PRODUCTS_BY_USER_FAILURE:
        case FETCH_ALL_PRODUCTS_FAILURE:
        case ADD_PRODUCT_FAILURE:
        case EDIT_PRODUCT_FAILURE:
        case DELETE_PRODUCT_FAILURE:
        case UPDATE_PRODUCT_STATUS_FAILURE:
        case GET_PRODUCT_BY_ID_FAILURE:
            return { ...state, isLoading: false, error: action.error };

        default:
            return state;
    }
};
