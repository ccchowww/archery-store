import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import bowItemReducer from './bowItemReducer';

export default combineReducers({
    item: itemReducer,
    bowItem: bowItemReducer
});