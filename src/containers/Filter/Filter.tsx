import "./style.scss";

import * as React from "react";
import { connect } from "react-redux";
import { actions } from "../../state";
import { getFilter } from "../../state/selectors";
import { Knob } from "../../components/Knob/Knob";

export interface FilterProps {
  changeFilter: (filter: FilterState) => void;
  cutoff: number;
  resonance: number;
}

export interface FilterState {
  cutoff: number;
  resonance: number;
}

export class ConnectedFilter extends React.Component<FilterProps> {
  constructor(props: FilterProps) {
    super(props);
  }

  render() {
    return (
      <div className="filter-container">
        <Knob
          name="cutoff"
          value={this.props.cutoff}
          onValueChanged={(cutoff: number) =>
            this.props.changeFilter({ cutoff, resonance: this.props.resonance })
          }
        />
        <Knob
          name="resonance"
          value={this.props.resonance}
          onValueChanged={(resonance: number) =>
            this.props.changeFilter({ cutoff: this.props.cutoff, resonance })
          }
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return getFilter(state);
}

function mapDispatchToProps(dispatch: Function) {
  return {
    changeFilter: (filter: any) => dispatch(actions.changeFilter(filter)),
  };
}

export const Filter = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedFilter);
