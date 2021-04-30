import DialogReducer from '../reducer';
import dialogTypes from '../types';

describe("Tesing DialogReducer", () => {
    test("should handle unkonwn action return defalut state", () => {
        let newState = DialogReducer({}, { type: 'jkdkjf' });
        expect(newState).toEqual({});
    })
    test("should handle OPEN_DIALOG action", () => {
        let product = { id: '1', title: "title", body: "body" }
        let newState = DialogReducer({}, { type: dialogTypes.OPEN_DIALOG, payload: product });
        expect(newState).toEqual({ isOpen: true, selectedProduct: product });
    })
    test("should handle CLOSE_DIALOG action", () => {
        let newState = DialogReducer({}, { type: dialogTypes.CLOSE_DIALOG });
        expect(newState).toEqual({ isOpen: false, selectedProduct: null });
    })
    test("should handle UPDATE_PRODUCT action", () => {
        let newState = DialogReducer({}, { type: "UPDATE_PRODUCT" });
        expect(newState).toEqual({ isOpen: false, selectedProduct: null });
    })
})