import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import chatSlice from "./chatSlice";


const store = configureStore({
  reducer: {
    app: rootReducer,
  }
});

export default store;
