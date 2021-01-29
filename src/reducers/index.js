import { combineReducers } from 'redux';

import alertReducer from './alert';
import authenticationReducer from './authentication';
const rootReducer = combineReducers({
    alert: alertReducer,
    authentication: authenticationReducer
})
export default rootReducer;