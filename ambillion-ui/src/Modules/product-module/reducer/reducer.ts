import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE,
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
        case GET_PRODUCTS_REQUEST:
        case ADD_PRODUCT_REQUEST:
        case EDIT_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
        case GET_PRODUCT_BY_ID_REQUEST:
            return { ...state, isLoading: true, error: null };

        case GET_PRODUCTS_SUCCESS:
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

        case GET_PRODUCTS_FAILURE:
        case ADD_PRODUCT_FAILURE:
        case EDIT_PRODUCT_FAILURE:
        case DELETE_PRODUCT_FAILURE:
        case GET_PRODUCT_BY_ID_FAILURE:
            return { ...state, isLoading: false, error: action.error };

        default:
            return state;
    }
};
