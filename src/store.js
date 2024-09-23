import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cardReducer from "./slices/CardSlice";
import combineReducers from "./slices/combinedSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    cards: cardReducer,
    combined: combineReducers,
  },
});
