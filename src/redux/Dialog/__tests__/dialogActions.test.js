import { openDialog, closeDialog } from '../actions';
import dialogTypes from '../types';

describe('openDialog action', () => {
    test('should have correct type', () => {
        let action = openDialog();
        expect(action.type).toBe(dialogTypes.OPEN_DIALOG)
    })
    test('should have correct payload', () => {
        let action = openDialog({ id: '1' });
        expect(action.payload).toEqual({ id: '1' })
    })
})
describe('closeDialog action', () => {
    test('should have correct type', () => {
        let action = closeDialog();
        expect(action.type).toBe(dialogTypes.CLOSE_DIALOG)
    })

})