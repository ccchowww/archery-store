import { GET_BOWITEMS, BOWITEMS_LOADING } from './types';
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


export const setBowItemsLoading = () => {
    return {
        type: BOWITEMS_LOADING
    }
}