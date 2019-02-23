import "./style.scss";

import * as React from "react";
import { connect } from "react-redux";
import { changeFilter } from "../../actions/index";
import { Knob } from "../../components/Knob/Knob";
import { number } from "prop-types";

function mapDispatchToProps(dispatch: Function) {
  return {
    changeFilter: (filter: any) => dispatch(changeFilter(filter))
  };
}

export interface FilterProps {
  changeFilter: (filter: FilterState) => void;
}

export interface FilterState {
  cutoff: number;
  resonance: number;
}

export class ConnectedFilter extends React.Component<FilterProps, FilterState> {
  constructor(props: FilterProps) {
    super(props);
    this.state = {
      cutoff: 127,
      resonance: 0
    };
  }

  onCutoffValueChanged = (value: number) => {
    this.setState({ cutoff: value });
  };

  onResonanceValueChanged = (value: number) => {
    this.setState({ resonance: value });
  };

  componentDidUpdate() {
    this.props.changeFilter(this.state);
  }

  render() {
    return (
      <div className="filter-container">
        <Knob name="cutoff" onValueChanged={this.onCutoffValueChanged} />
        <Knob name="resonance" onValueChanged={this.onResonanceValueChanged} />
      </div>
    );
  }
}

export const Filter = connect(
  null,
  mapDispatchToProps
)(ConnectedFilter);
