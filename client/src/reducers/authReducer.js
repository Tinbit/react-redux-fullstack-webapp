import { FETCH_USER } from '../actions/types';
//determine wheather user actionaly logedin or not
export default function(state = null, action){
 //log every single action that the reducer called with
  switch(action.type){
    case FETCH_USER:
      return action.payload || false;
    default:
     return state;
  }
}
