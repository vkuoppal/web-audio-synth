import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

import { Provider } from "react-redux";
import App from "./App";

import store from "./store/index";

import { connectExternalMidiDevice } from "./midi/midi-api";

// Prevent context menu event
document.addEventListener("contextmenu", event => event.preventDefault());

// Prevent default touch gestures
document.addEventListener(
  "touchstart",
  (event: any) => {
    if (event.target !== null && event.target.tagName !== "INPUT") {
      event.preventDefault();
    }
  },
  {
    passive: false
  }
);

connectExternalMidiDevice();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
