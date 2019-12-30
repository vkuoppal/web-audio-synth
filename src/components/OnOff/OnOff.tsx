import * as React from "react";
import "./style.scss";
import { ParamText } from "../ParamText/ParamText";

export interface OnOffProps {
  isOn: boolean;
  toggle: () => void;
}

export const OnOff = (props: OnOffProps) => {
  const paramText = props.isOn ? "on" : "off";
  const onIndicatorClassName = `on-indicator ${paramText}`;

  return (<div className="on-off-container" onTouchStart={props.toggle}>
    <div className="on-off-button">
      <ParamText text={paramText} />
      <div className={onIndicatorClassName} />
    </div>
  </div>);
};
