import alertConstants from '../constants/alert';

const initialState = {
    type: 'info',
    message: "Chào mừng bạn đến với Manga App"
};
export default function alertReducer(state = initialState, action) {
    switch (action.type) {
        case alertConstants.CLEAR:
            return {};
        case alertConstants.SUCCESS:
            return {
                type: 'success',
                message: action.payload.message
            };
        case alertConstants.ERROR:
            return {
                type: 'error',
                message: action.payload.message
            };
        default:
            return state;
    }
}