import { combineReducers } from 'redux';
import cartReducer from './ReducerCart';
import roleReducer from './ReducerRole';
import darkModeReducer from './ReducerDarkMode';

const rootReducer = combineReducers({
    cartReducer,
    roleReducer,
    darkModeReducer
});

export default rootReducer;