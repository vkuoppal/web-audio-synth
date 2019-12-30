import "./style.scss";

import * as React from "react";
import { connect } from "react-redux";
import { actions } from "../../state";
import { getSelectedPresetNumber } from "../../state/selectors";
import { SevenSegmentNumber } from "../../components/SevenSegmentNumber/SevenSegmentNumber";
import { ParamText } from "../../components/ParamText/ParamText";

export interface PresetChangerProps {
  presetNumber: number;
  changePreset: (presetNumber: number) => void;
}

export class ConnectedPresetChanger extends React.Component<PresetChangerProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const presetNumberStr = String(this.props.presetNumber);

    return (
      <div className="preset-changer-container" onTouchStart={() => this.props.changePreset(this.props.presetNumber + 1)}>
        <div className="seven-segment-display-container">
          <div className="seven-segment-display">
            <SevenSegmentNumber number={presetNumberStr.length === 2 ? Number(presetNumberStr[0]) : undefined} />
            <SevenSegmentNumber number={presetNumberStr.length === 2 ? Number(presetNumberStr[1]) : Number(presetNumberStr[0])} />
          </div>
        </div>
        <ParamText text="program" />
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    presetNumber: getSelectedPresetNumber(state)
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    changePreset: (presetNumber: number) => dispatch(actions.changePreset(presetNumber)),
  };
}

export const PresetChanger = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedPresetChanger);
