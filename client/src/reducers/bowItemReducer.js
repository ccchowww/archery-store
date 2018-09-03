import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS } from '../actions/types';

const initialState = {
    bowItems: [
        {id:uuid(), price: 111, name: "tiddies123"},
        {id:uuid(), price: 111, name: "tiddies2"},
        {id:uuid(), price: 111, name: "tiddies3"},
        {id:uuid(), price: 111, name: "tiddies4"}
    ]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state
            }
        default:
            return state;
    }
}