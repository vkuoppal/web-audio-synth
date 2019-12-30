import { connect } from "react-redux";
import { actions } from "../../state";
import "./style.scss";

import * as React from "react";

interface SliderProps {
  name: string;
  changeGain: (value: number) => void;
}

function mapDispatchToProps(dispatch: Function) {
  return {
    changeGain: (value: number) => dispatch(actions.changeGain(value))
  };
}

export class ConnectedSlider extends React.Component<SliderProps, any> {
  constructor(props: SliderProps) {
    super(props);
    this.state = {
      value: 50,
      name: props.name
    };
  }

  handleChange = (event: any) => {
    const { value } = event.target;
    this.setState({ value });
    this.props.changeGain(value);
  };

  render() {
    return (
      <div className="slider-container">
        <input
          className="slider-input"
          type="range"
          min="0"
          max="127"
          onChange={this.handleChange}
        />
        <span>{this.state.name}</span>
      </div>
    );
  }
}

export const Slider = connect(
  null,
  mapDispatchToProps
)(ConnectedSlider);
