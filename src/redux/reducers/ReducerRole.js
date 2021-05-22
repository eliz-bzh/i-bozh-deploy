import * as CONSTANTS from "../actions/ActionTypes";

const initialState = {
    role: null
};

const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.UPDATE_ROLE: {
            return { ...state, role: action.payload };
        }
        default:
            return state;
    }
};

export default roleReducer;