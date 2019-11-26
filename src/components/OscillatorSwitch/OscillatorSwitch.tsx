import * as React from "react";

import { connect } from "react-redux";
import "./style.scss";
import { changeOscillatorType } from "../../actions/index";

import { ReactComponent as SawtoothIcon } from "./saw.svg";
import { ReactComponent as SineIcon } from "./sine.svg";
import { ReactComponent as SquareIcon } from "./square.svg";
import { ReactComponent as TriangleIcon } from "./triangle.svg";

export enum Waveform {
  Square = "square",
  Triangle = "triangle",
  Sine = "sine",
  Sawtooth = "sawtooth",
  Custom = "custom"
}

export interface OscillatorSwitchProps {
  waveform: Waveform;
  oscillatorId: number;
}

export interface OscillatorSwitchState {
  selectedWaveform: Waveform;
}

function mapDispatchToProps(dispatch: Function) {
  return {
    changeOscillatorType: (state: OscillatorSwitchState) =>
      dispatch(changeOscillatorType(state))
  };
}

class ConnectedOscillatorSwitch extends React.Component<
  any,
  OscillatorSwitchState
  > {
  constructor({ }) {
    super({});
    this.state = { selectedWaveform: Waveform.Triangle };
    this.context = null;
  }

  componentDidUpdate() {
    this.props.changeOscillatorType({
      oscillatorType: this.state.selectedWaveform, oscillatorId: this.props.oscillatorId,
    });
  }

  changeWaveform = () => {
    const { selectedWaveform } = this.state;

    if (selectedWaveform === Waveform.Sine) {
      this.setState({ selectedWaveform: Waveform.Triangle });
    } else if (selectedWaveform === Waveform.Triangle) {
      this.setState({ selectedWaveform: Waveform.Square });
    } else if (selectedWaveform === Waveform.Square) {
      this.setState({ selectedWaveform: Waveform.Sawtooth });
    } else if (selectedWaveform === Waveform.Sawtooth) {
      this.setState({ selectedWaveform: Waveform.Sine });
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
    switch (this.state.selectedWaveform) {
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

export const OscillatorSwitch = connect(
  null,
  mapDispatchToProps
)(ConnectedOscillatorSwitch);
