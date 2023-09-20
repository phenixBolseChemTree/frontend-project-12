import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";


const store = configureStore({
  reducer: {
    app: rootReducer,
  }
});

export default store;
