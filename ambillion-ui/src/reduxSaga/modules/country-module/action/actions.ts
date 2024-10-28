import {
    FetchCountryRequestAction,
    FETCH_COUNTRY_REQUEST,
    AddCountryRequestAction,
    ADD_COUNTRY_REQUEST,
    UpdateCountryRequestAction,
    UPDATE_COUNTRY_REQUEST
} from '../type/types';

// Action to fetch countries
export const fetchCountryRequest = (): FetchCountryRequestAction => ({
    type: FETCH_COUNTRY_REQUEST
});

// Action to add a new country
export const addCountryRequest = (
    countryCode: string,
    countryName: string
): AddCountryRequestAction => ({
    type: ADD_COUNTRY_REQUEST,
    payload: {
        countryCode,
        countryName
    }
});

// Action to update an existing country
export const updateCountryRequest = (
    countryId: number | string,
    countryCode: string,
    countryName: string
): UpdateCountryRequestAction => ({
    type: UPDATE_COUNTRY_REQUEST,
    payload: {
        countryId,
        countryCode,
        countryName
    }
});
