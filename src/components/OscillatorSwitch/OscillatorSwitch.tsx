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
  Custom = "custom"
}

export interface OscillatorSwitchProps {
  selectedWaveform: Waveform;
  onSelectionChanged: (waveform: Waveform) => void;
}


export class OscillatorSwitch extends React.Component<
  OscillatorSwitchProps
  > {
  changeWaveform = () => {
    const { selectedWaveform } = this.props;

    if (selectedWaveform === Waveform.Sine) {
      this.props.onSelectionChanged(Waveform.Triangle);
    } else if (selectedWaveform === Waveform.Triangle) {
      this.props.onSelectionChanged(Waveform.Square);
    } else if (selectedWaveform === Waveform.Square) {
      this.props.onSelectionChanged(Waveform.Sawtooth);
    } else if (selectedWaveform === Waveform.Sawtooth) {
      this.props.onSelectionChanged(Waveform.Sine);
    }
  };

  render() {
    const waveFormComponent = this.renderWaveform();
    return (
      <div className="oscillator-switch" onTouchStart={this.changeWaveform}>
        {waveFormComponent}
      </div>
    );
  }

  private renderWaveform() {
    switch (this.props.selectedWaveform) {
      case Waveform.Sawtooth:
        return <SawtoothIcon />;
      case Waveform.Triangle:
        return <TriangleIcon />;
      case Waveform.Square:
        return <SquareIcon />;
      case Waveform.Sine:
        return <SineIcon />;
      default:
        return null;
    }
  }
}
