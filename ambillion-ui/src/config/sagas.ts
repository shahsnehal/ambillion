import { all } from 'redux-saga/effects';
import authSaga from 'Modules/auth-module/saga/saga';
import userSaga from 'Modules/user-module/saga/saga';
import productSaga from 'Modules/product-module/saga/saga';

export default function* rootSaga() {
    yield all([authSaga(), userSaga(), productSaga()]);
}