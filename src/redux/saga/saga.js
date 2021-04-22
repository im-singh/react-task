import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { fetchProductList } from '../api/api';

import productTypes from '../Products/types';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchProducts(action) {
    try {
        let list = yield call(fetchProductList, '')

        yield put({ type: productTypes.FETCH_PRODUCTS_SUCCESS, payload: list });
    } catch (e) {
        yield put({ type: productTypes.FETCH_PRODUCTS_FAIL, err: e });
    }
}

export default function* mySaga() {
    yield takeEvery(productTypes.FETCH_PRODUCTS, fetchProducts);
}