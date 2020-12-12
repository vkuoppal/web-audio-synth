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
import { ParamText } from "../../components/ParamText/ParamText";
import {
  Waveform,
  OscillatorSwitch,
} from "../../components/OscillatorSwitch/OscillatorSwitch";
import { ConnectionWire } from "../../components/ConnectionWire/ConnectionWire";

export interface LfoProps {
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

class ConnectedLfo extends React.Component<LfoProps> {
  private lfoType;
  private lfoSpeed;
  private lfoIntensity;
  private lfoTimer;

  constructor(props: LfoProps) {
    super(props);
    this.lfoType = props.lfoType;
    this.lfoSpeed = props.speed;
    this.lfoIntensity = props.intensity;

    this.lfoTimer = setInterval(() => {}, 10);
  }

  render() {
    return (
      <div className="lfo-block">
        <div className="lfo-header">
          <ParamText text="lfo" header={true} />
          <OscillatorSwitch
            selectedWaveform={this.props.lfoType}
            onSelectionChanged={(value) => this.props.changeLfoType(value)}
          />
        </div>
        <div className="lfo-knobs">
          <Knob
            name="intensity"
            value={this.props.intensity}
            onValueChanged={(value) => this.props.changeLfoIntensity(value)}
          />
          <Knob
            name="speed"
            value={this.props.speed}
            onValueChanged={(value) => this.props.changeLfoSpeed(value)}
          />
        </div>
        <div className="lfo-connection-points">
          <ConnectionPoint
            connectionId="lfo1"
            startConnection={(x, y) =>
              this.props.setConnectionStart("lfo1", x, y)
            }
            moveConnection={(x, y) => this.props.moveConnection("lfo1", x, y)}
          />
          <ConnectionWire connectionId="lfo1" />
          <ConnectionPoint
            connectionId="lfo1End"
            forcedPosition={this.props.lfoEndConnectionPoints["lfo1End"]}
          />

          <ConnectionPoint
            connectionId="lfo2"
            startConnection={(x, y) =>
              this.props.setConnectionStart("lfo2", x, y)
            }
            moveConnection={(x, y) => this.props.moveConnection("lfo2", x, y)}
          />
          <ConnectionWire connectionId="lfo2" />
          <ConnectionPoint
            connectionId="lfo2End"
            forcedPosition={this.props.lfoEndConnectionPoints["lfo2End"]}
          />

          <ConnectionPoint
            connectionId="lfo3"
            startConnection={(x, y) =>
              this.props.setConnectionStart("lfo3", x, y)
            }
            moveConnection={(x, y) => this.props.moveConnection("lfo3", x, y)}
          />
          <ConnectionWire connectionId="lfo3" />
          <ConnectionPoint
            connectionId="lfo3End"
            forcedPosition={this.props.lfoEndConnectionPoints["lfo3End"]}
          />

          <ConnectionPoint
            connectionId="lfo4"
            startConnection={(x, y) =>
              this.props.setConnectionStart("lfo4", x, y)
            }
            moveConnection={(x, y) => this.props.moveConnection("lfo4", x, y)}
          />
          <ConnectionWire connectionId="lfo4" />
          <ConnectionPoint
            connectionId="lfo4End"
            forcedPosition={this.props.lfoEndConnectionPoints["lfo4End"]}
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: Function) {
  return {
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
