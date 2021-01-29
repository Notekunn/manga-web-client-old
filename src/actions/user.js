import userConstants from '../constants/user';
import { showMessage, showError } from './alert';
import * as userService from '../services/user';

export const loginRequest = () => {
    return {
        type: userConstants.LOGIN_REQUEST
    }
}
export const loginSuccess = (user) => {
    return {
        type: userConstants.LOGIN_SUCCESS,
        payload: {
            user
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
                dispatch(loginSuccess({ name: "Cường" }));
                dispatch(showMessage("Đăng nhập thành công"))
            })
            .catch(error => {
                console.log(error);
                dispatch(loginFailure("Tài khoản hoặc mật khẩu không đúng!"))
                dispatch(showError("Đăng nhập thất bại"))
            })
    }
}
export const logout = () => {
    return {
        type: userConstants.LOGOUT
    }
}