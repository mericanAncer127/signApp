import { combineReducers } from "redux";
import signReducers from "./signSlice";

const rootReducer = combineReducers({
  event: signReducers,
});

export default rootReducer;
