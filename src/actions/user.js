import userConstants from '../constants/user';
import { showMessage , showError } from './alert';
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
                const user = response?.login || {};
                localStorage.setItem('user', JSON.stringify(user));
                dispatch(loginSuccess(user));
                dispatch(showMessage("Đăng nhập thành công"))
            })
            .catch(error => {
                dispatch(loginFailure(error.message))
            })
    }
}
export const logout = () => {
    return dispatch => {
        localStorage.removeItem('user')
        dispatch({ type: userConstants.LOGOUT })
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
const getAllRequest = () => {
    return {
        type: userConstants.GETALL_REQUEST
    }
}
const getAllSuccess = (users) => {
    return {
        type: userConstants.GETALL_SUCCESS,
        payload: {
            users
        }
    }
}
export const getAllFailure = () => {
    return {
        type: userConstants.GETALL_FAILURE
    }
}
export const getAll = (token) => {
    return dispatch => {
        dispatch(getAllRequest())
        userService.getAll(token)
            .then(response => {
                dispatch(getAllSuccess(response?.users || {}));
            }).catch(error => {
                dispatch(getAllFailure())
            })
    }
}

const registerRequest = () => {
    return {
        type: userConstants.REGISTER_REQUEST
    }
}
const registerSuccess = (user) => {
    return {
        type: userConstants.REGISTER_SUCCESS,
        payload: {
            user
        }
    }
}
export const registerFailure = (error) => {
    return {
        type: userConstants.REGISTER_FAILURE,
        payload: {
            error
        }
    }
}
export const registerReset = () => {
    return {
        type: userConstants.REGISTER_RESET
    }
}
export const register = (variables) => {
    return dispatch => {
        dispatch(registerRequest())
        userService.register(variables)
            .then(response => dispatch(registerSuccess(response?.register || {})))
            .catch(err => dispatch(registerFailure(err)))
    }
}
const deleteUserSuccess = (_id) => {
    return {
        type: userConstants.DELETE_USER_SUCCESS,
        payload: { 
            _id
        }
    }
}
export const deleteUser = (token, _id) => {
    return dispatch => {
        userService.deleteUser(token, _id)
            .then(res => {
                dispatch(deleteUserSuccess(_id))
                dispatch(showMessage("Xoá thành công "+ res.deleteUser.rowsDeleted + " người dùng!", 3))
            })
            .catch(err => dispatch(showError("Xoá thất bại", 3)))
    }
}