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
                data: action.payload.user
            }
        case userConstants.GETME_FAILURE:
            return {}
        case userConstants.GETALL_REQUEST:
            return {
                loading: true
            }
        case userConstants.GETALL_SUCCESS:
            return {
                data: action.payload.users
            }
        case userConstants.GETALL_FAILURE:
            return {}
        default:
            return state
    }
}
export default userReducer;