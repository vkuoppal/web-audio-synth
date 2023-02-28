import "./style.scss";

import * as React from "react";
import { connect } from "react-redux";
import { actions } from "../../state";
import {
  getLfoIntensity,
  getLfoSpeed,
  getLfoType,
  getConnectionEndPosition,
} from "../../state/selectors";
import { Knob } from "../../components/Knob/Knob";
import { ConnectionPoint } from "../../components/ConnectionPoint/ConnectionPoint";
import {
  Waveform,
  OscillatorSwitch,
} from "../../components/OscillatorSwitch/OscillatorSwitch";
import { ConnectionWire } from "../../components/ConnectionWire/ConnectionWire";
import { ParamText } from "../../components/ParamText/ParamText";

export interface LfoProps {
  triggerLfos: () => void;
  changeLfoIntensity: (lfoIntensity: number) => void;
  changeLfoSpeed: (lfoSpeed: number) => void;
  changeLfoType: (lfoType: Waveform) => void;
  moveConnection: (lfoId: string, x: number, y: number) => void;
  setConnectionStart: (lfoId: string, x: number, y: number) => void;
  intensity: number;
  speed: number;
  lfoType: Waveform;
  lfoEndConnectionPoints: { [lfoEndId: string]: { x: number; y: number } };
}

const ConnectedLfo: React.FC<LfoProps> = (props: LfoProps) => {
  React.useEffect(() => {
    const intervalTimeout = 128 - props.speed;

    const interval = window.setInterval(() => {
      props.triggerLfos();
    }, intervalTimeout);
    return () => window.clearInterval(interval);
  }, [props.speed]);

  return (
    <div className="lfo-block">
      <div className="lfo-header">
        <ParamText text="lfo" header={true} />
        <OscillatorSwitch
          selectedWaveform={props.lfoType}
          onSelectionChanged={(value) => props.changeLfoType(value)}
        />
      </div>
      <div className="lfo-knobs">
        <Knob
          name="intensity"
          value={props.intensity}
          onValueChanged={(value) => props.changeLfoIntensity(value)}
        />
        <Knob
          name="speed"
          value={props.speed}
          onValueChanged={(value) => props.changeLfoSpeed(value)}
        />
      </div>
      <div className="lfo-connection-points">
        <ConnectionPoint
          connectionId="lfo1"
          startConnection={(x, y) => props.setConnectionStart("lfo1", x, y)}
          moveConnection={(x, y) => props.moveConnection("lfo1", x, y)}
        />
        <ConnectionWire connectionId="lfo1" />
        <ConnectionPoint
          connectionId="lfo1End"
          forcedPosition={props.lfoEndConnectionPoints["lfo1End"]}
        />

        <ConnectionPoint
          connectionId="lfo2"
          startConnection={(x, y) => props.setConnectionStart("lfo2", x, y)}
          moveConnection={(x, y) => props.moveConnection("lfo2", x, y)}
        />
        <ConnectionWire connectionId="lfo2" />
        <ConnectionPoint
          connectionId="lfo2End"
          forcedPosition={props.lfoEndConnectionPoints["lfo2End"]}
        />

        <ConnectionPoint
          connectionId="lfo3"
          startConnection={(x, y) => props.setConnectionStart("lfo3", x, y)}
          moveConnection={(x, y) => props.moveConnection("lfo3", x, y)}
        />
        <ConnectionWire connectionId="lfo3" />
        <ConnectionPoint
          connectionId="lfo3End"
          forcedPosition={props.lfoEndConnectionPoints["lfo3End"]}
        />

        <ConnectionPoint
          connectionId="lfo4"
          startConnection={(x, y) => props.setConnectionStart("lfo4", x, y)}
          moveConnection={(x, y) => props.moveConnection("lfo4", x, y)}
        />
        <ConnectionWire connectionId="lfo4" />
        <ConnectionPoint
          connectionId="lfo4End"
          forcedPosition={props.lfoEndConnectionPoints["lfo4End"]}
        />
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch: Function) {
  return {
    triggerLfos: () => dispatch(actions.triggerLfos()),
    changeLfoSpeed: (speed: number) =>
      dispatch(actions.changeLfoSpeed({ lfoSpeed: speed })),
    changeLfoIntensity: (intensity: number) =>
      dispatch(actions.changeLfoIntensity({ lfoIntensity: intensity })),
    changeLfoType: (type: Waveform) =>
      dispatch(actions.changeLfoType({ lfoType: type })),
    moveConnection: (lfoId: string, x: number, y: number) =>
      dispatch(actions.moveConnection({ connectionId: lfoId, x, y })),
    setConnectionStart: (lfoId: string, x: number, y: number) =>
      dispatch(actions.setConnectionStart({ connectionId: lfoId, x, y })),
  };
}

function mapStateToProps(state) {
  return {
    intensity: getLfoIntensity(state),
    speed: getLfoSpeed(state),
    lfoType: getLfoType(state),
    lfoEndConnectionPoints: {
      lfo1End: getConnectionEndPosition(state, "lfo1"),
      lfo2End: getConnectionEndPosition(state, "lfo2"),
      lfo3End: getConnectionEndPosition(state, "lfo3"),
      lfo4End: getConnectionEndPosition(state, "lfo3"),
    },
  };
}

export const Lfo = connect(mapStateToProps, mapDispatchToProps)(ConnectedLfo);
