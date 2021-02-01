import userConstants from '../constants/user';

const initialState = {};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.GETME_REQUEST:
            return {
                loading: true
            }
        case userConstants.GETME_SUCCESS:
            return {
                user: action.payload.user
            }
        case userConstants.GETME_FAILURE:
            return {}
        case userConstants.GETALL_REQUEST:
            return {
                loading: true
            }
        case userConstants.GETALL_SUCCESS:
            return {
                users: action.payload.users
            }
        case userConstants.GETALL_FAILURE:
            return {}
        case userConstants.REGISTER_REQUEST:
            return {
                registerLoading: true,
                users: state.users
            }
        case userConstants.REGISTER_SUCCESS:
            return {
                registerSuccess: true,
                users: state.users
            }
        case userConstants.REGISTER_FAILURE:
            return {
                registerError: action.payload.error,
                users: state.users
            }
        case userConstants.REGISTER_RESET:
            return {
                users: state.users
            }
        case userConstants.RESET:
            return {}
        case userConstants.DELETE_USER_REQUEST:
            return state;
        case userConstants.DELETE_USER_FAILURE:
            return state;
        case userConstants.DELETE_USER_SUCCESS:
            return {
                users: state.users.filter(user => user._id !== action.payload._id)
            }
        default:
            return state
    }
}
export default userReducer;