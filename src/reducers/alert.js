import alertConstants from '../constants/alert';

const initialState = {
    type: 'info',
    message: "Chào mừng bạn đến với Manga App",
    duration: 10
};
export default function alertReducer(state = initialState, action) {
    switch (action.type) {
        case alertConstants.CLEAR:
            return {};
        case alertConstants.SUCCESS:
            return {
                type: 'success',
                message: action.payload.message,
                duration: action.payload.duration
            };
        case alertConstants.ERROR:
            return {
                type: 'error',
                message: action.payload.message,
                duration: action.payload.duration
            };
        default:
            return state;
    }
}