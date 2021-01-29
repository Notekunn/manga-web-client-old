import userConstants from '../constants/user';
import { showMessage, showError } from './alert';

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
        setTimeout(() => {
            if (userName === "admin" && password === "admin") {
                dispatch(loginSuccess({ name: "Cường" }));
                dispatch(showMessage("Đăng nhập thành công"))
            }
            else {
                dispatch(loginFailure("Tài khoản hoặc mật khẩu không đúng!"))
                dispatch(showError("Đăng nhập thất bại"))
            }
        }, 5000)
    }
}
export const logout = () => {
    return {
        type: userConstants.LOGOUT
    }
}