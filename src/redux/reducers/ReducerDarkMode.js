import * as CONSTANTS from '../actions/ActionTypes';

const initialState = {
    darkMode: false
}

const ReducerDarkMode = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.CHANGE_MODE:
            return { ...state, darkMode: action.payload };
        default:
            return state;
    }
};

export default ReducerDarkMode;