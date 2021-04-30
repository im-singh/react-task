import productReducer from '../reducer';
import productTypes from '../types';

describe("Testing ProductReducer", () => {
    let mockProd = [{ id: '1', title: 'title 1' }, { id: '2', title: 'title 2' }]
    test("should handle unkonwn action return defalut state", () => {
        let newState = productReducer({}, { type: 'jkdkjf' });
        expect(newState).toEqual({});
    })
    test("should handle FETCH_PRODUCTS_SUCCESS action", () => {
        let newState = productReducer({}, { type: productTypes.FETCH_PRODUCTS_SUCCESS, payload: mockProd });
        expect(newState).toEqual({ isLoading: false, isError: false, products: mockProd });
    })
    test("should handle FETCH_PRODUCTS_FAIL action", () => {
        let newState = productReducer({}, { type: productTypes.FETCH_PRODUCTS_FAIL, err: 'server error' });
        expect(newState).toEqual({ isLoading: false, isError: true, error: "server error" });
    })
    test("should handle UPDATE_PRODUCT action", () => {
        let updatedProd = { id: '2', title: "title changed" };
        let newState = productReducer({ products: mockProd }, { type: productTypes.UPDATE_PRODUCT, payload: updatedProd });
        expect(newState).toEqual({ products: [mockProd[0], updatedProd] });
    })
    test("should handle UPDATE_SEARCH_VALUE action", () => {
        let newState = productReducer({}, { type: productTypes.UPDATE_SEARCH_VALUE, payload: "this" });
        expect(newState).toEqual({ searchedValue: "this" });
    })
})