import userConstants from '../constants/user';
const user = JSON.parse(localStorage.getItem('user'));
const initialState = {
    loggedIn: !!user,
    user: user || {},
};

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.payload.user
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