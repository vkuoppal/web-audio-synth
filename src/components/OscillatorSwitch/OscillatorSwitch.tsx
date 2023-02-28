import * as React from "react";

import "./style.scss";

import { ReactComponent as SawtoothIcon } from "./saw.svg";
import { ReactComponent as SineIcon } from "./sine.svg";
import { ReactComponent as SquareIcon } from "./square.svg";
import { ReactComponent as TriangleIcon } from "./triangle.svg";

export enum Waveform {
  Square = "square",
  Triangle = "triangle",
  Sine = "sine",
  Sawtooth = "saw",
  Random = "random",
}

export interface OscillatorSwitchProps {
  selectedWaveform: Waveform;
  onSelectionChanged: (waveform: Waveform) => void;
}

export const OscillatorSwitch: React.FC<OscillatorSwitchProps> = (
  props: OscillatorSwitchProps
) => {
  const changeWaveform = () => {
    const { selectedWaveform } = props;

    if (selectedWaveform === Waveform.Sine) {
      props.onSelectionChanged(Waveform.Triangle);
    } else if (selectedWaveform === Waveform.Triangle) {
      props.onSelectionChanged(Waveform.Square);
    } else if (selectedWaveform === Waveform.Square) {
      props.onSelectionChanged(Waveform.Sawtooth);
    } else if (selectedWaveform === Waveform.Sawtooth) {
      props.onSelectionChanged(Waveform.Sine);
    }
  };

  const getWaveformIcon = () => {
    switch (props.selectedWaveform) {
      case Waveform.Sawtooth:
        return <SawtoothIcon />;
      case Waveform.Triangle:
        return <TriangleIcon />;
      case Waveform.Square:
        return <SquareIcon />;
      case Waveform.Sine:
        return <SineIcon />;
      case Waveform.Random:
        return <div>moi<SineIcon /></div>;
      default:
        return null;
    }
  };

  const waveFormIcon = getWaveformIcon();
  return (
    <div className="oscillator-switch" onTouchStart={changeWaveform}>
      {waveFormIcon}
    </div>
  );
};
