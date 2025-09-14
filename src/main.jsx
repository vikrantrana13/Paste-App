import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import "./index.css";

// 👇 Force dark mode for the whole app
document.documentElement.classList.add("dark");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster position="top-center" />
    </Provider>
  </React.StrictMode>
);
