import { combineReducers } from 'redux';
import bowItemReducer from './bowItemReducer';
import orderReducer from './orderReducer';

export default combineReducers({
    bowItems: bowItemReducer,
    orders: orderReducer
});