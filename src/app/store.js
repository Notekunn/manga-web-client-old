import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers/';
import authReducer from '../features/auth/authSlice';
import { createLogger } from 'redux-logger';
const loggerMiddleware = createLogger();
const store = configureStore({
    reducer: {
        ...rootReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware)
});

export default store;