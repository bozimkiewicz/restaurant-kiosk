import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
  },
  reducers: {
    saveToken: (state, action) => {
      const creds = action.payload;
      state.token = creds.token;
    },
  },
});

export const { saveToken } = AuthSlice.actions;

export default AuthSlice;
