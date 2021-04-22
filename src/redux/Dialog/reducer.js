import { dialogState } from './defaultState';
import dialogTypes from './types'
import productTypes from '../Products/types';

export default function DialogReducer(state = dialogState, action) {
    switch (action.type) {
        case dialogTypes.OPEN_DIALOG:
            return { ...state, isOpen: true, selectedProduct: action.payload }
        case dialogTypes.CLOSE_DIALOG:
            return { ...state, isOpen: false, selectedProduct: null }
        case productTypes.UPDATE_PRODUCT:
            return { ...state, isOpen: false, selectedProduct: null }
        default:
            return state;
    }
}