import "./style.scss";

import * as React from "react";
import { connect } from "react-redux";
import { actions } from "../../state";
import { Knob } from "../../components/Knob/Knob";
import { getAdsr } from "../../state/selectors";

export interface EnvelopeProps {
  changeAdsr: (state) => void;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

class ConnectedEnvelope extends React.Component<EnvelopeProps> {
  constructor(props: EnvelopeProps) {
    super(props);
  }

  render() {
    return (
      <div className="envelope-container">
        <Knob
          name="attack"
          value={this.props.attack}
          onValueChanged={(attack: number) =>
            this.props.changeAdsr({
              attack,
              decay: this.props.decay,
              sustain: this.props.sustain,
              release: this.props.release,
            })
          }
        />
        <Knob
          name="decay"
          value={this.props.decay}
          onValueChanged={(decay: number) =>
            this.props.changeAdsr({
              attack: this.props.attack,
              decay,
              sustain: this.props.sustain,
              release: this.props.release,
            })
          }
        />
        <Knob
          name="sustain"
          value={this.props.sustain}
          onValueChanged={(sustain: number) =>
            this.props.changeAdsr({
              attack: this.props.attack,
              decay: this.props.decay,
              sustain,
              release: this.props.release,
            })
          }
        />
        <Knob
          name="release"
          value={this.props.release}
          onValueChanged={(release: number) =>
            this.props.changeAdsr({
              attack: this.props.attack,
              decay: this.props.decay,
              sustain: this.props.sustain,
              release,
            })
          }
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return getAdsr(state);
}

function mapDispatchToProps(dispatch: Function) {
  return {
    changeAdsr: (state) => dispatch(actions.changeAdsr(state)),
  };
}

export const Envelope = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedEnvelope);
