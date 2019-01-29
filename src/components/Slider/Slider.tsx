import { connect } from 'react-redux';
import { changeGain } from '../../actions/index';
import './style.scss';

import * as React from 'react';

function mapDispatchToProps(dispatch: any) {
  return {
    changeGain: (value: number) => dispatch(changeGain(value)),
  };
}

export class ConnectedSlider extends React.Component<any, any> {
  constructor() {
    super({});
    this.state = {
      value: 50,
    };
  }

  handleChange = (event: any) => {
    const { value } = event.target;
    this.setState({ value });
    this.props.changeGain(value);
  };

  render() {
    return (
      <input
        className="slider-input"
        type="range"
        onChange={this.handleChange}
      />
    );
  }
}

export const Slider = connect(
  null,
  mapDispatchToProps
)(ConnectedSlider);
