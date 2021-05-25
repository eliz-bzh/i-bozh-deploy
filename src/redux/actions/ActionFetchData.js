import * as CONSTANTS from './ActionTypes';
import axios from 'axios';

export const setLoad = loader => ({
    type: CONSTANTS.SET_LOADER,
    payload: loader
});

export const fetchBrands = () => (dispatch) => {
    dispatch(setLoad(false));
    axios.get(`https://i-bozh-server.herokuapp.com/api/Brand/getAll`)
        .then(({ data }) => dispatch(setBrands(data)))
}

export const setBrands = brands => ({
    type: CONSTANTS.FETCH_BRANDS,
    payload: brands
});

export const fetchTypes = () => (dispatch) => {
    dispatch(setLoad(false));
    axios.get(`https://i-bozh-server.herokuapp.com/api/Type/getAll`)
        .then(({ data }) => dispatch(setTypes(data)))
}

export const setTypes = types => ({
    type: CONSTANTS.FETCH_TYPES,
    payload: types
});

export const fetchSuppliers = () => (dispatch) => {
    dispatch(setLoad(false));
    axios.get(`https://i-bozh-server.herokuapp.com/api/Supplier/getAll`)
        .then(({ data }) => dispatch(setSuppliers(data)))
}

export const setSuppliers = suppliers => ({
    type: CONSTANTS.FETCH_SUPPLIERS,
    payload: suppliers
});

export const fetchSupplies = () => (dispatch) => {
    dispatch(setLoad(false));
    axios.get(`https://i-bozh-server.herokuapp.com/api/Supply/getAll`)
        .then(({ data }) => dispatch(setSupplies(data)))
}

export const setSupplies = supplies => ({
    type: CONSTANTS.FETCH_SUPPLIES,
    payload: supplies
});

export const fetchOrders = () => (dispatch) => {
    dispatch(setLoad(false));
    axios.get(`https://i-bozh-server.herokuapp.com/api/Order/getAll`)
        .then(({ data }) => dispatch(setOrders(data)))
}

export const setOrders = orders => ({
    type: CONSTANTS.FETCH_ORDERS,
    payload: orders
});

export const fetchClients = () => (dispatch) => {
    dispatch(setLoad(false));
    axios.get(`https://i-bozh-server.herokuapp.com/api/Client/getAll`)
        .then(({ data }) => dispatch(setClients(data)))
}

export const setClients = clients => ({
    type: CONSTANTS.FETCH_CLIENTS,
    payload: clients
});

export const fetchProducts = () => (dispatch) => {
    dispatch(setLoad(false));
    axios.get(`https://i-bozh-server.herokuapp.com/api/Product/getAll`)
        .then(({ data }) => dispatch(setProducts(data)))
}

export const setProducts = products => ({
    type: CONSTANTS.FETCH_PRODUCTS,
    payload: products
});

export const fetchBaners = () => (dispatch) => {
    dispatch(setLoad(false));
    axios.get(`https://i-bozh-server.herokuapp.com/api/Product/baners`)
        .then(({ data }) => dispatch(setBaners(data)))
}

export const setBaners = baners => ({
    type: CONSTANTS.FETCH_BANERS,
    payload: baners
});

export const fetchUser = (login) => (dispatch) => {
    dispatch(setLoad(false));
    axios.get(`https://i-bozh-server.herokuapp.com/api/Client/getByLogin/` + login)
        .then(({ data }) => dispatch(setUser(data)))
}

export const setUser = user => ({
    type: CONSTANTS.FETCH_USER,
    payload: user
});