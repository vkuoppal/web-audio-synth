import "./style.scss";

import * as React from "react";
import { connect } from "react-redux";
import { changeAdsr } from "../../actions/index";
import { Knob } from "../../components/Knob/Knob";

export interface EnvelopeState {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

export interface EnvelopeProps {
  changeAdsr: (state: EnvelopeState) => void;
}

function mapDispatchToProps(dispatch: Function) {
  return {
    changeAdsr: (state: EnvelopeState) => dispatch(changeAdsr(state))
  };
}

export class ConnectedEnvelope extends React.Component<
  EnvelopeProps,
  EnvelopeState
> {
  constructor(props: EnvelopeProps) {
    super(props);
    this.state = {
      attack: 0,
      decay: 30,
      sustain: 30,
      release: 30
    };
  }

  onAttackValueChanged = (value: number) => {
    this.setState({ attack: value });
  };
  onDecayValueChanged = (value: number) => {
    this.setState({ decay: value });
  };
  onSustainValueChanged = (value: number) => {
    this.setState({ sustain: value });
  };
  onReleaseValueChanged = (value: number) => {
    this.setState({ release: value });
  };

  componentDidUpdate() {
    this.props.changeAdsr(this.state);
  }

  render() {
    return (
      <div className="envelope-container">
        <Knob name="attack" onValueChanged={this.onAttackValueChanged} />
        <Knob name="decay" onValueChanged={this.onDecayValueChanged} />
        <Knob name="sustain" onValueChanged={this.onSustainValueChanged} />
        <Knob name="release" onValueChanged={this.onReleaseValueChanged} />
      </div>
    );
  }
}

export const Envelope = connect(
  null,
  mapDispatchToProps
)(ConnectedEnvelope);
