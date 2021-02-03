import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import alertReducer from '../features/app/alertSlice';
import { createLogger } from 'redux-logger';
const loggerMiddleware = createLogger();

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        alert: alertReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware)
});

export default store;