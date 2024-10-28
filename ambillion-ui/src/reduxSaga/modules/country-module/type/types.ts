// Action Types
export const FETCH_COUNTRY_REQUEST = 'FETCH_COUNTRY_REQUEST';
export const FETCH_COUNTRY_SUCCESS = 'FETCH_COUNTRY_SUCCESS';
export const FETCH_COUNTRY_FAILURE = 'FETCH_COUNTRY_FAILURE';

export const ADD_COUNTRY_REQUEST = 'ADD_COUNTRY_REQUEST';
export const ADD_COUNTRY_SUCCESS = 'ADD_COUNTRY_SUCCESS';
export const ADD_COUNTRY_FAILURE = 'ADD_COUNTRY_FAILURE';

export const UPDATE_COUNTRY_REQUEST = 'UPDATE_COUNTRY_REQUEST';
export const UPDATE_COUNTRY_SUCCESS = 'UPDATE_COUNTRY_SUCCESS';
export const UPDATE_COUNTRY_FAILURE = 'UPDATE_COUNTRY_FAILURE';

// Country Type
export type CountryType = {
    country_id: number | string;
    country_code: string;
    country_name: string;
};

// Form Values Type for Adding/Updating
export type CountryFormValues = {
    countryId: number | string;
    countryCode: string;
    countryName: string;
};

// Action Types for Fetching Countries
export type FetchCountryRequestAction = {
    type: typeof FETCH_COUNTRY_REQUEST;
};

export type FetchCountrySuccessAction = {
    type: typeof FETCH_COUNTRY_SUCCESS;
    payload: CountryType[];
};

export type FetchCountryFailureAction = {
    type: typeof FETCH_COUNTRY_FAILURE;
    error: string;
};

// Action Types for Adding a Country
export type AddCountryRequestAction = {
    type: typeof ADD_COUNTRY_REQUEST;
    payload: {
        countryCode: string;
        countryName: string;
    };
};

export type AddCountrySuccessAction = {
    type: typeof ADD_COUNTRY_SUCCESS;
    payload: CountryType;
};

export type AddCountryFailureAction = {
    type: typeof ADD_COUNTRY_FAILURE;
    error: string;
};

// Action Types for Updating a Country
export type UpdateCountryRequestAction = {
    type: typeof UPDATE_COUNTRY_REQUEST;
    payload: {
        countryId: number | string;
        countryCode: string;
        countryName: string;
    };
};

export type UpdateCountrySuccessAction = {
    type: typeof UPDATE_COUNTRY_SUCCESS;
    payload: CountryType;
};

export type UpdateCountryFailureAction = {
    type: typeof UPDATE_COUNTRY_FAILURE;
    error: string;
};

// Combined Action Types
export type CountryActionTypes =
    | FetchCountryRequestAction
    | FetchCountrySuccessAction
    | FetchCountryFailureAction
    | AddCountryRequestAction
    | AddCountrySuccessAction
    | AddCountryFailureAction
    | UpdateCountryRequestAction
    | UpdateCountrySuccessAction
    | UpdateCountryFailureAction;
