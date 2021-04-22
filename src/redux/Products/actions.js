import productTypes from './types';

export const fetchProductList = () => {
    return {
        type: productTypes.FETCH_PRODUCTS
    }
}
export const updateProduct = (payload) => {
    return {
        type: productTypes.UPDATE_PRODUCT,
        payload,
    }
}