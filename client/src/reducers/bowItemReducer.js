import { GET_BOWITEMS, BOWITEMS_LOADING } from '../actions/types';

const initialState = {
    bowItems: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_BOWITEMS:
            return {
                ...state,
                bowItems: action.payload,
                loading: false
            }
        case BOWITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}