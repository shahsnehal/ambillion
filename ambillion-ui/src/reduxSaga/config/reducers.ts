import { combineReducers } from 'redux';
import { authReducer } from 'reduxSaga/modules/auth-module/reducer/reducer';
import { userReducer } from 'reduxSaga/modules/user-module/reducer/reducer';
import { productReducer } from 'reduxSaga/modules/product-module/reducer/reducer';
import { productCategoryReducer } from 'reduxSaga/modules/productCategories-module/reducer/reducer';
import { productDocumentTypeReducer } from 'reduxSaga/modules/productDocumentType-module/reducer/reducer';
import { countryReducer } from 'reduxSaga/modules/country-module/reducer/reducer';
import { hsnCodeReducer } from 'reduxSaga/modules/hsnCodes-module/reducer/reducer';

// Combines individual reducers into a single reducer function.
export const combinedReducer = combineReducers({
    authModule: authReducer,
    userModule: userReducer,
    productModule: productReducer,
    productCategoryModule: productCategoryReducer,
    productDocumentTypeModule: productDocumentTypeReducer,
    countryModule: countryReducer,
    hsnCodeModule: hsnCodeReducer
});
