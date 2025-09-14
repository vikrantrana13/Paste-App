// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // { email } when logged in
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload; // { email }
      try {
        localStorage.setItem("user", JSON.stringify(state.user));
      } catch {}
    },
    register(state, action) {
      state.user = action.payload; // auto-login after register
      try {
        localStorage.setItem("user", JSON.stringify(state.user));
      } catch {}
    },
    logout(state) {
      state.user = null;
      try {
        localStorage.removeItem("user");
      } catch {}
    },
  },
});

export const { login, register, logout } = authSlice.actions;
export default authSlice.reducer;
