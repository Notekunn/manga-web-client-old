import alertConstants from '../constants/alert';

export const showMessage = (message, duration = 5) => {
    return {
        type: alertConstants.SUCCESS,
        payload: {
            message,
            duration
        }
    }
}
export const showError = (message, duration = 5) => {
    return {
        type: alertConstants.ERROR,
        payload: {
            message,
            duration
        }
    }
}
export const clearMessage = () => {
    return {
        type: alertConstants.CLEAR
    }
}