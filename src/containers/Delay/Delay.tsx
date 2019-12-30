import "./style.scss";

import * as React from "react";
import { connect } from "react-redux";
import { actions } from "../../state";
import { isDelayActive, getDelayTime, getDelayFeedback } from "../../state/selectors";
import { Knob } from "../../components/Knob/Knob";
import { ParamText } from "../../components/ParamText/ParamText";
import { OnOff } from "../../components/OnOff/OnOff";

export interface DelayProps {
  active: boolean;
  toggleDelay: () => void;
  changeTime: (timeValue: number) => void;
  changeFeedback: (feedbackValue: number) => void;
  delayTime: number;
  delayFeedback: number;
}

class ConnectedDelay extends React.Component<DelayProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="delay-block">
        <div className="delay-header">
          <ParamText text="delay" header={true} />
          <OnOff isOn={this.props.active} toggle={this.props.toggleDelay} />
        </div>
        <div className="delay-knobs">
          <Knob
            name="time"
            value={this.props.delayTime}
            onValueChanged={value => this.props.changeTime(value)}
          />
          <Knob
            name="feedback"
            value={this.props.delayFeedback}
            onValueChanged={value => this.props.changeFeedback(value)}
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: Function) {
  return {
    toggleDelay: () => dispatch(actions.toggleDelayActive()),
    changeTime: (time: number) => dispatch(actions.changeDelayTime(time)),
    changeFeedback: (feedback: number) => dispatch(actions.changeDelayFeedback(feedback))
  };
}

function mapStateToProps(state) {
  return {
    active: isDelayActive(state),
    delayTime: getDelayTime(state),
    delayFeedback: getDelayFeedback(state)
  };
}

export const Delay = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedDelay);