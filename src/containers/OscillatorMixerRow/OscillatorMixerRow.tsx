import "./style.scss";

import * as React from "react";
import { connect } from "react-redux";
import { changeOscillatorVolume, changeOscillatorOctave } from "../../actions/index";
import { Knob } from "../../components/Knob/Knob";
import { OscillatorSwitch } from "../../components/OscillatorSwitch/OscillatorSwitch";
import { OctaveChanger } from "../../components/OctaveChanger/OctaveChanger";

function mapDispatchToProps(dispatch: Function) {
  return {
    changeVolume: (volume: number, oscillatorId: number) => dispatch(changeOscillatorVolume({ volume, oscillatorId })),
    changeOctave: (octave: number, oscillatorId: number) => dispatch(changeOscillatorOctave({ octave, oscillatorId }))
  };
}

export interface OscillatorMixerRowProps {
  oscillatorId: number;
  changeVolume: (volume: number, oscillatorId: number) => void;
  changeOctave: (octave: number, oscillatorId: number) => void;
}


export class ConnectedOscillatorMixerRow extends React.Component<OscillatorMixerRowProps> {
  constructor(props: OscillatorMixerRowProps) {
    super(props);
  }

  render() {
    const name = `OSC${this.props.oscillatorId}`;
    return (
      <div className="oscillator-mixer-row">
        <div className="oscillator-switch-and-octave">
          <OscillatorSwitch oscillatorId={this.props.oscillatorId} />
          <OctaveChanger oscillatorId={this.props.oscillatorId} onOctaveChanged={(octave: number) => this.props.changeOctave(octave, this.props.oscillatorId)} />
        </div>

        <Knob
          name={name}
          showName={false}
          initialValue={127}
          onValueChanged={volume => this.props.changeVolume(volume, this.props.oscillatorId)}
        />
      </div>
    );
  }
}

export const OscillatorMixerRow = connect(
  null,
  mapDispatchToProps
)(ConnectedOscillatorMixerRow);
