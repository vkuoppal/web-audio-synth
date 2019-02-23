import * as React from "react";
import "./style.scss";

export interface ParamTextProps {
  text: string;
}

export const ParamText = (props: ParamTextProps) => (
  <span className="param-text">{props.text}</span>
);
