import { combineReducers } from 'redux';

import alertReducer from './alert';
import authenticationReducer from './authentication';
import userReducer from './user';
const rootReducer = {
    alert: alertReducer,
    authentication: authenticationReducer,
    user: userReducer
}
export default rootReducer;