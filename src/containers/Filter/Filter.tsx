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

const ConnectedFilter: React.FC<FilterProps> = (props: FilterProps) => {
  return (
    <div className="filter-container">
      <Knob
        name="cutoff"
        value={props.cutoff}
        onValueChanged={(cutoff: number) =>
          props.changeFilter({ cutoff, resonance: props.resonance })
        }
      />
      <Knob
        name="resonance"
        value={props.resonance}
        onValueChanged={(resonance: number) =>
          props.changeFilter({ cutoff: props.cutoff, resonance })
        }
      />
    </div>
  );
};

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
