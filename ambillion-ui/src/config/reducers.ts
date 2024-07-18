import { combineReducers } from 'redux';
import { authReducer } from 'Modules/auth-module/reducer/reducer';
import { userReducer } from 'Modules/user-module/reducer/reducer';

export const combinedReducer = combineReducers({
    authModule: authReducer,
    userModule: userReducer
});
