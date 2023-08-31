import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from "./channelsSlice"; // Импортируйте редьюсер


const store = configureStore({
  reducer: {
    app: channelsReducer,
  }
});

export default store;
