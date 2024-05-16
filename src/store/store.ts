import rootReducer from "./store.rootReducer"; // Your root reducer
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: rootReducer,
});
