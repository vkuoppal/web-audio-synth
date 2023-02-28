import * as React from "react";
import "./style.scss";

export const Oscilloscope: React.FC = () => (
  <div className="oscilloscope-container">
    <canvas className="oscilloscope" width="200" height="130" />
  </div>
);
