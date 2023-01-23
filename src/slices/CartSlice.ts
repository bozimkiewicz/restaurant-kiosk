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
    incrementAmount: (state, action) => {
      const item = action.payload.product;
      const itemIdx = state.findIndex((i) => i.product.id === item.id);
      state[itemIdx].amount++;
    },
    decrementAmount: (state, action) => {
      const item = action.payload.product;
      const itemIdx = state.findIndex((i) => i.product.id === item.id);
      if (state[itemIdx].amount > 1) {
        state[itemIdx].amount--;
      } else {
        state.splice(itemIdx, 1);
      }
    },
  },
});

export const { addToCart, incrementAmount, decrementAmount } = cartSlice.actions;

export default cartSlice;
