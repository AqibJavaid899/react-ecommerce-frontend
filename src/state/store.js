import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
