import { productState } from './defaultState';
import productTypes from './types'

import { returnUpdatedProducts } from './helper';

export default function ProductReducer(state = productState, action) {
    switch (action.type) {
        case productTypes.FETCH_PRODUCTS:
            return { ...state, isLoading: true, isError: false }

        case productTypes.FETCH_PRODUCTS_SUCCESS:
            return { ...state, products: action.payload, isLoading: false }
        case productTypes.FETCH_PRODUCTS_FAIL:
            return { ...state, isError: true, error: action.err, isLoading: false }

        case productTypes.UPDATE_PRODUCT:
            return { ...state, products: returnUpdatedProducts(state.products, action.payload) }
        case productTypes.UPDATE_SEARCH_VALUE:
            return { ...state, searchedValue: action.payload }
        default:
            return state;
    }
}