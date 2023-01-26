import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    username: "",
    timeout: 0,
  },
  reducers: {
    saveToken: (state, action) => {
      const creds = action.payload;
      state.username = creds.username;
      state.token = creds.token;
      console.log(creds);
    },
  },
});

export const { saveToken } = AuthSlice.actions;

export default AuthSlice;
