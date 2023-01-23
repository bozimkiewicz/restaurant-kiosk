import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './slices/CartSlice'

export default configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
