import { createSlice } from "@reduxjs/toolkit";
import ICartProducts from "../interfaces/ICartProducts";

const cartSlice = createSlice({
  name: "cart",
  initialState: new Array<ICartProducts>(),
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const itemExists = state.findIndex(
        (item) => item.product.id === newItem.product.id
      );
      if (itemExists >= 0) {
        state[itemExists] = {
          product: newItem.product,
          amount: state[itemExists].amount + newItem.amount,
        };
      } else {
        state.push(newItem);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice;
