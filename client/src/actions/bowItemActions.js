import { GET_BOWITEMS, BOWITEMS_LOADING, POPUP_OPEN, POPUP_CLOSE } from './types';
import axios from 'axios';

export const getBowItems = () => dispatch => {
    dispatch(setBowItemsLoading());
    axios
        .get('/api/bowitem/all')
        .then(res =>
            dispatch({
                type: GET_BOWITEMS,
                payload: res.data
            }));
}

export const openPopup = (popupState) => dispatch => {
    dispatch(showPopup());
        axios
            .get(`/api/bowitem/popup/${popupState}`)
            .then(res =>
                dispatch({
                    type: POPUP_CLOSE,
                    payload: res.data
                })
        )
    return;
}

//to prevent erratic popup behavior
export const showPopup = () => {
    return {
        type: POPUP_OPEN
    }
}

export const hidePopup = () => {
    return {
        type: POPUP_CLOSE
    }
}

export const setBowItemsLoading = () => {
    return {
        type: BOWITEMS_LOADING
    }
}