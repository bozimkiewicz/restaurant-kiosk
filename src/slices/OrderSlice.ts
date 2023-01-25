import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: { method: "" },
  reducers: {
    setTakeaway: (state) => {
      state.method = "na wynos";
      console.log(state.method);
    },
    setTakeIn: (state) => {
      state.method = "na miejscu";
      console.log(state.method);
    },
  },
});

export const { setTakeIn, setTakeaway } = orderSlice.actions;

export default orderSlice;
