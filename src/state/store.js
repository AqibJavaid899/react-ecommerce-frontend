import { configureStore } from "@reduxjs/toolkit";

import cardReducer from "./slices";

export const store = configureStore({
  reducer: {
    cart: cardReducer,
  },
});
