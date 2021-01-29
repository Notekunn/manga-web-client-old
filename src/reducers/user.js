import userConstants from '../constants/user';

const initialState = {
    loading: false,
    data: {}
};
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
            return {
            }
        default:
            return state
    }
}
export default userReducer;