import alertConstants from '../constants/alert';

export const showMessage = (message) => {
    return {
        type: alertConstants.SUCCESS,
        payload: {
            message
        }
    }
}
export const showError = (message) => {
    return {
        type: alertConstants.ERROR,
        payload: {
            message
        }
    }
}
export const clearMessage = () => {
    return {
        type: alertConstants.CLEAR
    }
}