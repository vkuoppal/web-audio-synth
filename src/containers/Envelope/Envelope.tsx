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

const ConnectedEnvelope: React.FC<EnvelopeProps> = (props: EnvelopeProps) => {
  const { attack, decay, sustain, release } = props;
  return (
    <div className="envelope-container">
      <Knob
        name="attack"
        value={attack}
        onValueChanged={(changedAttack: number) =>
          props.changeAdsr({
            attack: changedAttack,
            decay,
            sustain,
            release,
          })
        }
      />
      <Knob
        name="decay"
        value={decay}
        onValueChanged={(changedDecay: number) =>
          props.changeAdsr({
            attack,
            decay: changedDecay,
            sustain,
            release,
          })
        }
      />
      <Knob
        name="sustain"
        value={sustain}
        onValueChanged={(changedSustain: number) =>
          props.changeAdsr({
            attack,
            decay,
            sustain: changedSustain,
            release,
          })
        }
      />
      <Knob
        name="release"
        value={release}
        onValueChanged={(changedRelease: number) =>
          props.changeAdsr({
            attack,
            decay,
            sustain,
            release: changedRelease,
          })
        }
      />
    </div>
  );
};

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
