import dialogTypes from './types';

export const openDialog = (payload) => {
    return {
        type: dialogTypes.OPEN_DIALOG,
        payload
    }
}
export const closeDialog = (payload) => {
    return {
        type: dialogTypes.CLOSE_DIALOG,
    }
}