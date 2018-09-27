import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import axios from 'axios';

export const getBowItems = () => dispatch => {
    dispatch(setBowItemsLoading());
    axios
        .get('/api/bowitem/all')
        .then(res =>
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            }));
}

export const deleteBowItem = (id) => {
    return {
        type: DELETE_ITEM,
        payload: id
    }
}

export const addBowItem = (item) => {
    return {
        type: ADD_ITEM,
        payload: item
    }
}

export const setBowItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}