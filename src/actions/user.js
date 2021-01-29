import userConstants from '../constants/user';
import { showMessage, showError } from './alert';
import * as userService from '../services/user';

export const loginRequest = () => {
    return {
        type: userConstants.LOGIN_REQUEST
    }
}
export const loginSuccess = ({ token, userId, tokenExpiration }) => {
    return {
        type: userConstants.LOGIN_SUCCESS,
        payload: {
            token, userId, tokenExpiration
        }
    }
}
export const loginFailure = (error) => {
    return {
        type: userConstants.LOGIN_FAILURE,
        payload: {
            error
        }
    }
}
export const login = (userName, password) => {
    return dispatch => {
        dispatch(loginRequest())
        userService.login(userName, password)
            .then(response => {
                console.log(response);
                dispatch(loginSuccess(response?.login || {}));
                dispatch(showMessage("Đăng nhập thành công"))
            })
            .catch(error => {
                dispatch(loginFailure(error.message))
            })
    }
}
export const logout = () => {
    return {
        type: userConstants.LOGOUT
    }
}