import * as React from "react";
import "./style.scss";

export const Oscilloscope = () => (
  <div className="oscilloscope-container">
    <canvas className="oscilloscope" width="200" height="130" />
  </div>
);
