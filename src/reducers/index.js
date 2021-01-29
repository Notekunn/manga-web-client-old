import { combineReducers } from 'redux';

import alertReducer from './alert';
const rootReducer = combineReducers({
    alert: alertReducer
})
export default rootReducer;