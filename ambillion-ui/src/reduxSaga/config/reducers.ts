import { combineReducers } from 'redux';
import { authReducer } from 'reduxSaga/modules/auth-module/reducer/reducer';
import { userReducer } from 'reduxSaga/modules/user-module/reducer/reducer';
import { productReducer } from 'reduxSaga/modules/product-module/reducer/reducer';

export const combinedReducer = combineReducers({
    authModule: authReducer,
    userModule: userReducer,
    productModule: productReducer
});
