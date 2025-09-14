// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./pasteslice";
import authReducer from "./authSlice";

let preloadedAuth = { user: null };
try {
  const saved = localStorage.getItem("user");
  if (saved) preloadedAuth.user = JSON.parse(saved);
} catch {}

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
    auth: authReducer,
  },
  preloadedState: {
    auth: preloadedAuth,
  },
});
