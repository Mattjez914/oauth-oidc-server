import { combineReducers } from 'redux';
import { clearState } from '../localStorage';


const userLoginReducer = (token=null, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return action.payload;
        case 'USER_LOGOUT':
            clearState();
            return action.payload;
        default:
            return token       
    }
};

export default combineReducers({
    token: userLoginReducer,
});