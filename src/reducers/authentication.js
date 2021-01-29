import userConstants from '../constants/user';
const { token, userId, tokenExpiration } = JSON.parse(localStorage.getItem('user') || "{}");
const initialState = userId ? {
    loggedIn: true,
    token,
    userId,
    tokenExpiration
} : {};

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                token: action.payload.token,
                userId: action.payload.userId,
                tokenExpiration: action.payload.tokenExpiration
            };
        case userConstants.LOGIN_FAILURE:
            return {
                isError: true,
                loggingError: action.payload.error
            }
        case userConstants.LOGOUT:
            return {
                loggedIn: false,
                loggingIn: false
            }
        default:
            return state;
    }
}
export default authenticationReducer;