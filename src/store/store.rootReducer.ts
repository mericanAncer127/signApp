import { combineReducers } from "redux";
import eventReducers from "./eventSlice";

const rootReducer = combineReducers({
  event: eventReducers,
});

export default rootReducer;
