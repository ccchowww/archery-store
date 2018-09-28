import { GET_ORDERS, UPDATE_ORDER, ADD_ORDER, DELETE_ORDER, ORDERS_LOADING } from '../actions/types';

const initialState = {
    orders: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                loading: false
            }
        case ADD_ORDER:
            return {
                ...state,
                orders: [action.payload, ...state.orders]
            }
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map(obj => obj._id === action.payload._id ?
                    { ...obj, ...action.payload} :
                    obj
                )
            }
        case ORDERS_LOADING:
            return {
                ...state,
                loading: true
            }
        case DELETE_ORDER:
        return {
            ...state,
            orders: state.orders.filter(order => order._id !== action.payload._id)
        }
        default:
            return state;
    }
}