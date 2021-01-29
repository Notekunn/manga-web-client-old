import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
const loggerMiddleware = createLogger();
const composeEnhancers = composeWithDevTools({
    shouldHotReload: true
});
const store = createStore(
    rootReducer, composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )

);
store.subscribe(() => {
    console.log(store.getState())
})
export default store;