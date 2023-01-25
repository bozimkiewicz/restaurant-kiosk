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
          amount: state[itemExists].amount + 1,
          isCustom: false
        };
      } else {
        state.push(newItem);
      }
    },
    addCustomToCart: (state, action) => {
      let newItem = action.payload;
      newItem.id += 10000
      newItem.name = '(modyfikacja) ' + newItem.name
      const newProduct = {product: newItem, amount: 1, isCustom: true}
      state.push(newProduct);
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
    removeItems: (state) => {
      state.splice(0)
    },
  },
});

export const { addToCart, addCustomToCart, incrementAmount, decrementAmount, removeItems } = cartSlice.actions;

export default cartSlice;
