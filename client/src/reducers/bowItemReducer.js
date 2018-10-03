import { GET_BOWITEMS, BOWITEMS_LOADING, POPUP_OPEN, POPUP_CLOSE } from '../actions/types';

const initialState = {
    bowItems: [],
    loading: false,
    popupState: false
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
        case POPUP_OPEN:
            return {
                ...state,
                popupState: true
            }
        case POPUP_CLOSE:
            return {
                ...state,
                popupState: false
            }
        default:
            return state;
    }
}