import { fetchProductList, updateProduct, searchValue } from '../actions';
import productTypes from '../types


describe('fetchProductList action', () => {
    test('should have correct type', () => {
        let action = fetchProductList();
        expect(action.type).toBe(productTypes.FETCH_PRODUCTS)
    })

})
describe('updateProduct action', () => {
    test('should have correct type', () => {
        let action = updateProduct();
        expect(action.type).toBe(productTypes.UPDATE_PRODUCT)
    })
    test('should have correct payload', () => {
        let action = updateProduct({ id: '2' });
        expect(action.payload).toEqual({ id: '2' })
    })
})
describe('searchValue action', () => {
    test('should have correct type', () => {
        let action = searchValue();
        expect(action.type).toBe(productTypes.UPDATE_SEARCH_VALUE)
    })
    test('should have correct payload', () => {
        let action = searchValue('this');
        expect(action.payload).toEqual('this')
    })
})