import userConstants from '../constants/user';
import { showMessage } from './alert';
import * as userService from '../services/user';

const loginRequest = () => {
    return {
        type: userConstants.LOGIN_REQUEST
    }
}
const loginSuccess = ({ token, userId, tokenExpiration }) => {
    return {
        type: userConstants.LOGIN_SUCCESS,
        payload: {
            token, userId, tokenExpiration
        }
    }
}
const loginFailure = (error) => {
    return {
        type: userConstants.LOGIN_FAILURE,
        payload: {
            error
        }
    }
}
const getMeRequest = () => {
    return {
        type: userConstants.GETME_REQUEST
    }
}
const getMeSuccess = (user) => {
    return {
        type: userConstants.GETME_SUCCESS,
        payload: {
            user
        }
    }
}
export const getMeFailure = () => {
    return {
        type: userConstants.GETME_FAILURE
    }
}
export const login = (userName, password) => {
    return dispatch => {
        dispatch(loginRequest())
        userService.login(userName, password)
            .then(response => {
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
export const getMe = (token) => {
    return dispatch => {
        dispatch(getMeRequest())
        userService.getMe(token)
            .then(response => {
                dispatch(getMeSuccess(response?.me || {}));
            }).catch(error => {
                dispatch(getMeFailure())
            })
    }
}