import { combineReducers } from 'redux';
import cartReducer from './ReducerCart';
import roleReducer from './ReducerRole';
import darkModeReducer from './ReducerDarkMode';
import fetchDataReducer from './ReducerFetchData';

const rootReducer = combineReducers({
    cartReducer,
    roleReducer,
    darkModeReducer,
    fetchDataReducer
});

export default rootReducer;