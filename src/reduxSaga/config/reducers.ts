import { combineReducers } from 'redux';
import { authReducer } from 'reduxSaga/modules/auth-module/reducer/reducer';
import { userReducer } from 'reduxSaga/modules/user-module/reducer/reducer';
import { productReducer } from 'reduxSaga/modules/product-module/reducer/reducer';
import { productCategoryReducer } from 'reduxSaga/modules/productCategories-module/reducer/reducer';
import { ProductDocumentTypeReducer } from 'reduxSaga/modules/productDocumentType-module/reducer/reducer';

// Combines individual reducers into a single reducer function.
export const combinedReducer = combineReducers({
    authModule: authReducer,
    userModule: userReducer,
    productModule: productReducer,
    productCategoryModule: productCategoryReducer,
    ProductDocumentTypeModule: ProductDocumentTypeReducer
});
