import * as CONSTANTS from '../actions/ActionTypes';

const initialState = {
    brands: [],
    types: [],
    suppliers: [],
    supplies: [],
    orders: [],
    clients: [],
    products: [],
    baners: [],
    user: {},
    loading: false
}

const ReducerFetchData = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.FETCH_BRANDS:
            return { ...state, brands: action.payload, loading: true };
        case CONSTANTS.FETCH_TYPES:
            return { ...state, types: action.payload, loading: true };
        case CONSTANTS.FETCH_SUPPLIERS:
            return { ...state, suppliers: action.payload, loading: true };
        case CONSTANTS.FETCH_SUPPLIES:
            return { ...state, supplies: action.payload, loading: true };
        case CONSTANTS.FETCH_ORDERS:
            return { ...state, orders: action.payload, loading: true };
        case CONSTANTS.FETCH_CLIENTS:
            return { ...state, clients: action.payload, loading: true };
        case CONSTANTS.FETCH_PRODUCTS:
            return { ...state, products: action.payload, loading: true };
        case CONSTANTS.FETCH_BANERS:
            return { ...state, baners: action.payload, loading: true };
        case CONSTANTS.FETCH_USER:
            return { ...state, user: action.payload, loading: true };
        case (CONSTANTS.SET_LOADER): {
            return { ...state, loading: action.payload };
        }
        default:
            return state;
    }
};

export default ReducerFetchData;