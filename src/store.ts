import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './slices/CartSlice'
import orderSlice from "./slices/OrderSlice";

export default configureStore({
  reducer: {
    cart: cartSlice.reducer,
    order: orderSlice.reducer
  },
});
