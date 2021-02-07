import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import alertReducer from '../features/app/alertSlice';
import globalReducer from '../features/app/globalSlice';
import { createLogger } from 'redux-logger';
// eslint-disable-next-line no-unused-vars
const loggerMiddleware = createLogger();
const rootReducer = {
	auth: authReducer,
	user: userReducer,
	alert: alertReducer,
	global: globalReducer,
}
const store = configureStore({
	reducer: rootReducer,
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware)
});

export default store;
