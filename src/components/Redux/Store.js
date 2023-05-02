import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {mopsReducer} from './Reducer'

const rootReducer = combineReducers({
        First:mopsReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));