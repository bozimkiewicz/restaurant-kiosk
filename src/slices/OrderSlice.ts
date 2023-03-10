import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: { method: "" },
  reducers: {
    setTakeaway: (state) => {
      state.method = "na wynos";
    },
    setTakeIn: (state) => {
      state.method = "na miejscu";
    },
  },
});

export const { setTakeIn, setTakeaway } = orderSlice.actions;

export default orderSlice;
