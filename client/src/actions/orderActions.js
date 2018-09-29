import { GET_ORDERS, UPDATE_ORDER, ADD_ORDER, DELETE_ORDER, ORDERS_LOADING } from './types';
import axios from 'axios';

export const getOrders = () => dispatch => {
    dispatch(setOrdersLoading());
    axios.get('/api/order')
         .then(res => dispatch ({
             type: GET_ORDERS,
             payload: res.data
         }))
}

export const addOrder = newOrder => dispatch => {
    axios.post('/api/order/post', newOrder)
         .then(res => dispatch({
             type: ADD_ORDER,
             payload: res.data
         }))
}

export const updateOrder = updatedOrder => dispatch => {
    axios.post('/api/order/update', updatedOrder)
         .then(res => dispatch({
             type: UPDATE_ORDER,
             payload: res.data
         }));
}

export const deleteOrder = DeleteOrder => dispatch => {
    console.log(DeleteOrder);
    axios.delete('/api/order/delete', { data: DeleteOrder })
         .then(res => dispatch({
            type: DELETE_ORDER,
            payload: res.data
        }));
}

export const setOrdersLoading = () => {
    return {
        type: ORDERS_LOADING
    }
}