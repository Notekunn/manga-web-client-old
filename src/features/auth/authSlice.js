import { createSlice } from '@reduxjs/toolkit';
import * as userService from '../../services/user';
const session = JSON.parse(localStorage.getItem('session') || "{}");
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: !!session.token,
        loggingIn: false,
        session
    },
    reducers: {
        loginRequest: (state, action) => {
            return {
                loggingIn: true,
                session: {}
            }
        },
        loginSuccess: (state, action) => {
            return {
                loggedIn: true,
                session: action.payload.session
            }
        },
        loginFailure: (state, action) => {
            return {
                error: action.payload.error,
                session: {}
            }
        },
        logout: (state, action) => {
            localStorage.clear();
            return {
                loggedIn: false,
                session: {}
            }
        },

    }
});
export const selectLogged = state => state.auth.loggedIn;
export const selectLogging = state => state.auth.loggingIn;
export const selectError = state => state.auth.error;
export const selectSession = state => state.auth.session;
export const selectToken = state => state.auth.session?.token;

const { loginRequest, loginSuccess, loginFailure } = authSlice.actions;

export const login = (userName, password) => dispatch => {
    dispatch(loginRequest());
    userService.login(userName, password)
        .then(session => {
            dispatch(loginSuccess(session));
            localStorage.setItem('session', JSON.stringify(session));
        })
        .catch((error) => {
            dispatch(loginFailure(error.message));
        })
}
export const { logout } = authSlice.actions;

export default authSlice.reducer;