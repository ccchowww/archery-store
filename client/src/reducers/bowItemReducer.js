import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from '../actions/types';

const initialState = {
    bowItems: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                bowItems: action.payload,
                loading: false
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}