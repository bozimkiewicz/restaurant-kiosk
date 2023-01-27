import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import cartSlice from './slices/CartSlice'
import orderSlice from "./slices/OrderSlice";

export default configureStore({
  reducer: {
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    auth: AuthSlice.reducer
  },
});
