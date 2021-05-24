import * as CONSTANTS from './ActionTypes';
import axios from 'axios';

export const fetchBrands = () => (dispatch) => {
    axios.get(`https://localhost:5001/api/Brand/getAll`)
        .then(({ data }) => {
            console.log('fetch')
            dispatch(setBrands(data));
        })
}

export const setBrands = brands => ({
    type: CONSTANTS.FETCH_BRANDS,
    payload: brands
});

export const fetchTypes = () => (dispatch) => {
    axios.get(`https://localhost:5001/api/Type/getAll`)
        .then(({ data }) => {
            console.log('fetch')
            dispatch(setTypes(data));
        })
}

export const setTypes = types => ({
    type: CONSTANTS.FETCH_TYPES,
    payload: types
});

export const fetchSuppliers = () => (dispatch) => {
    axios.get(`https://localhost:5001/api/Supplier/getAll`)
        .then(({ data }) => {
            console.log('fetch')
            dispatch(setSuppliers(data));
        })
}

export const setSuppliers = suppliers => ({
    type: CONSTANTS.FETCH_SUPPLIERS,
    payload: suppliers
});

export const fetchSupplies = () => (dispatch) => {
    axios.get(`https://localhost:5001/api/Supply/getAll`)
        .then(({ data }) => {
            console.log('fetch')
            dispatch(setSupplies(data));
        })
}

export const setSupplies = supplies => ({
    type: CONSTANTS.FETCH_SUPPLIES,
    payload: supplies
});

export const fetchOrders = () => (dispatch) => {
    axios.get(`https://localhost:5001/api/Order/getAll`)
        .then(({ data }) => {
            console.log('fetch')
            dispatch(setOrders(data));
        })
}

export const setOrders = orders => ({
    type: CONSTANTS.FETCH_ORDERS,
    payload: orders
});

export const fetchClients = () => (dispatch) => {
    axios.get(`https://localhost:5001/api/Client/getAll`)
        .then(({ data }) => {
            console.log('fetch client')
            dispatch(setClients(data));
        })
}

export const setClients = clients => ({
    type: CONSTANTS.FETCH_CLIENTS,
    payload: clients
});

export const fetchProducts = () => (dispatch) => {
    axios.get(`https://localhost:5001/api/Product/getAll`)
        .then(({ data }) => {
            console.log('fetch')
            dispatch(setProducts(data));
        })
}

export const setProducts = products => ({
    type: CONSTANTS.FETCH_PRODUCTS,
    payload: products
});

export const fetchBaners = () => (dispatch) => {
    axios.get(`https://localhost:5001/api/Product/baners`)
        .then(({ data }) => {
            console.log('fetch')
            dispatch(setBaners(data));
        })
}

export const setBaners = baners => ({
    type: CONSTANTS.FETCH_BANERS,
    payload: baners
});