import "./style.scss";

import * as React from "react";
import { connect } from "react-redux";
import { actions } from "../../state";
import { Knob } from "../../components/Knob/Knob";
import { OscillatorSwitch, Waveform } from "../../components/OscillatorSwitch/OscillatorSwitch";
import { OctaveChanger } from "../../components/OctaveChanger/OctaveChanger";
import { getOscillatorVolume, getOscillatorOctave, getOscillatorType } from "../../state/selectors";

export interface OscillatorMixerRowProps {
  oscillatorId: string;
  changeVolume: (volume: number, oscillatorId: string) => void;
  changeOctave: (octave: number, oscillatorId: string) => void;
  changeOscillatorType: (waveform: Waveform, oscillatorId: string) => void;
  volume: number;
  octave: number;
  oscillatorType: Waveform;
}

class ConnectedOscillatorMixerRow extends React.Component<OscillatorMixerRowProps> {
  constructor(props: OscillatorMixerRowProps) {
    super(props);
  }

  render() {
    const name = `OSC${this.props.oscillatorId}`;
    return (
      <div className="oscillator-mixer-row">
        <div className="oscillator-switch-and-octave">
          <OscillatorSwitch
            onSelectionChanged={(waveform: Waveform) => this.props.changeOscillatorType(waveform, this.props.oscillatorId)}
            selectedWaveform={this.props.oscillatorType} />
          <OctaveChanger oscillatorId={this.props.oscillatorId} onOctaveChanged={(octave: number) => this.props.changeOctave(octave, this.props.oscillatorId)} activeOctave={this.props.octave} />
        </div>

        <Knob
          name={name}
          showName={false}
          value={this.props.volume}
          onValueChanged={volume => this.props.changeVolume(volume, this.props.oscillatorId)}
        />
      </div>
    );
  } x
}

function mapStateToProps(state, ownProps) {
  return {
    volume: getOscillatorVolume(state, ownProps.oscillatorId),
    octave: getOscillatorOctave(state, ownProps.oscillatorId),
    oscillatorType: getOscillatorType(state, ownProps.oscillatorId),
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    changeVolume: (volume: number, oscillatorId: string) => dispatch(actions.changeOscillatorVolume({ volume, oscillatorId })),
    changeOctave: (octave: number, oscillatorId: string) => dispatch(actions.changeOscillatorOctave({ octave, oscillatorId })),
    changeOscillatorType: (waveform: Waveform, oscillatorId: string) => dispatch(actions.changeOscillatorType({ oscillatorType: waveform, oscillatorId }))
  };
}

export const OscillatorMixerRow = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedOscillatorMixerRow);
