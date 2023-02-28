import * as React from "react";
import "./style.scss";

export interface ParamTextProps {
  text: string;
  header?: boolean;
}

export const ParamText: React.FC<ParamTextProps> = (props: ParamTextProps) => {
  const className = `param-text${props.header ? " header" : ""}`;
  return <span className={className}>{props.text}</span>;
};
