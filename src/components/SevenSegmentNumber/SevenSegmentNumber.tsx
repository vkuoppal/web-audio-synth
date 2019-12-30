
import "./style.scss";

import * as React from "react";

export interface SevenSegmentNumberProps {
  number: number | undefined;
}

export const SevenSegmentNumber = (props: SevenSegmentNumberProps) => {
  const n = props.number;

  const aClassName = n !== undefined && n !== 1 && n !== 4 ? "a active" : "a";
  const bClassName = n !== undefined && n !== 5 && n !== 6 ? "b active" : "b";
  const cClassName = n !== undefined && n !== 2 ? "c active" : "c";
  const dClassName = n !== undefined && n !== 1 && n !== 4 && n !== 7 ? "d active" : "d";
  const eClassName = n !== undefined && n !== 1 && n !== 3 && n !== 4 && n !== 5 && n !== 7 && n !== 9 ? "e active" : "e";
  const fClassName = n !== undefined && n !== 1 && n !== 2 && n !== 3 && n !== 7 ? "f active" : "f";
  const gClassName = n !== undefined && n !== 0 && n !== 1 && n !== 7 ? "g active" : "g";

  return (
    <div className="seven-segment-number" >
      <div className={aClassName} />
      <div className={bClassName} />
      <div className={cClassName} />
      <div className={dClassName} />
      <div className={eClassName} />
      <div className={fClassName} />
      <div className={gClassName}>
        <div className="top" />
        <div className="bottom" />
      </div>
    </div>
  );

}