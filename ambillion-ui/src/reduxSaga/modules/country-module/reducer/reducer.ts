import {
    ADD_COUNTRY_FAILURE,
    ADD_COUNTRY_REQUEST,
    ADD_COUNTRY_SUCCESS,
    FETCH_COUNTRY_FAILURE,
    FETCH_COUNTRY_REQUEST,
    FETCH_COUNTRY_SUCCESS,
    UPDATE_COUNTRY_FAILURE,
    UPDATE_COUNTRY_REQUEST,
    UPDATE_COUNTRY_SUCCESS,
    CountryType,
    CountryActionTypes
} from '../type/types';

// Define the initial state for the Country module
type CountryState = {
    isLoading: boolean;
    error: string | null;
    countries: CountryType[];
};

// Initial state setup
const initialState: CountryState = {
    isLoading: false,
    error: null,
    countries: []
};

// Country reducer
export const countryReducer = (state = initialState, action: CountryActionTypes): CountryState => {
    switch (action.type) {
        case FETCH_COUNTRY_REQUEST:
        case ADD_COUNTRY_REQUEST:
        case UPDATE_COUNTRY_REQUEST:
            return { ...state, isLoading: true, error: null };

        case FETCH_COUNTRY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                countries: action.payload,
                error: null
            };

        case ADD_COUNTRY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                countries: [action.payload, ...state.countries],
                error: null
            };

        case UPDATE_COUNTRY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                countries: state.countries.map((country) =>
                    country.country_id === action.payload.country_id ? action.payload : country
                ),
                error: null
            };

        case FETCH_COUNTRY_FAILURE:
        case ADD_COUNTRY_FAILURE:
        case UPDATE_COUNTRY_FAILURE:
            return { ...state, isLoading: false, error: action.error };

        default:
            return state;
    }
};
