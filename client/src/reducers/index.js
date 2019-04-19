// allow us to simply import reducers, convention inside or react redux
import  {combineReducers } from 'redux';
import authReducer from './authReducer';

//what ever key provide to this obj, are going to represent the keys that exist inside the state
export default combineReducers({
   auth: authReducer
});
