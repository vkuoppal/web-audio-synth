import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

import { Provider } from "react-redux";
import App from "./App";

import store from "../src/store/index";

// Prevent context menu event
document.addEventListener("contextmenu", event => event.preventDefault());

// Prevent default touch gestures
document.addEventListener(
  "touchstart",
  event => {
    if (event.target.tagName !== "INPUT") {
      event.preventDefault();
    }
  },
  {
    passive: false
  }
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
