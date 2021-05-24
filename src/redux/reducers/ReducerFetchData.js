import * as CONSTANTS from '../actions/ActionTypes';

const initialState = {
    brands: [],
    types: [],
    suppliers: [],
    supplies: [],
    orders: [],
    clients: [],
    products: [],
    baners: []
}

const ReducerFetchData = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.FETCH_BRANDS:
            return { ...state, brands: action.payload };
        case CONSTANTS.FETCH_TYPES:
            return { ...state, types: action.payload };
        case CONSTANTS.FETCH_SUPPLIERS:
            return { ...state, suppliers: action.payload };
        case CONSTANTS.FETCH_SUPPLIES:
            return { ...state, supplies: action.payload };
        case CONSTANTS.FETCH_ORDERS:
            return { ...state, orders: action.payload };
        case CONSTANTS.FETCH_CLIENTS:
            return { ...state, clients: action.payload };
        case CONSTANTS.FETCH_PRODUCTS:
            return { ...state, products: action.payload };
        case CONSTANTS.FETCH_BANERS:
            return { ...state, baners: action.payload };
        default:
            return state;
    }
};

export default ReducerFetchData;