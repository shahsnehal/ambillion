import { all } from 'redux-saga/effects';
import authSaga from 'reduxSaga/modules/auth-module/saga/saga';
import userSaga from 'reduxSaga/modules/user-module/saga/saga';
import productSaga from 'reduxSaga/modules/product-module/saga/saga';
import productCategorySaga from 'reduxSaga/modules/productCategories-module/saga/saga';
import ProductDocumentTypeSaga from 'reduxSaga/modules/productDocumentType-module/saga/saga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        userSaga(),
        productSaga(),
        productCategorySaga(),
        ProductDocumentTypeSaga()
    ]);
}
