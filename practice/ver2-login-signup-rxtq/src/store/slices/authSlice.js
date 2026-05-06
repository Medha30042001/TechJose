import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setLoggedInUser, logout } = authSlice.actions;

export default authSlice.reducer;