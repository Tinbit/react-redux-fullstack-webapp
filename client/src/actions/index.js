import axios from "axios"; //for api ajax request
import { FETCH_USER } from "./types";
//action creator
// when action creator called it instantly return a function
//purpose of middleware/redux thunk is to inspect  whatever value we return
//from this action creator (fetchUser)
// when we call this fcn ,redux thunk will authomaticall call this and pass in as dispatch fcn
//to different reducers
export const fetchUser = () => async dispatch => {
  //dispatch an action when this api request completed
  const res = await axios.get("/api/current_user"); // we wait until we get response from api // in dev env we use proxy but not prod
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {//user model will be updated n pass to header
  //dispatch an action when this api request completed
  const res = await axios.post("/api/stripe", token); // we wait until we get response from api // in dev env we use proxy but not prod
  dispatch({ type: FETCH_USER, payload: res.data });
};
