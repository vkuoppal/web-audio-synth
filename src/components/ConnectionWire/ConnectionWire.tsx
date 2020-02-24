import * as React from "react";
import "./style.scss";
import { connect } from "react-redux";
import { getConnectionEndPosition, getConnectionStartPosition, getKnobPositions } from "../../state/selectors";


const Path = (props: { startPoint: number[], middlePoint: number[], endPoint: number[] }) => (
  <path className="connection-path"
    d={`
      M ${props.startPoint}
      Q ${props.middlePoint} ${props.endPoint}
    `}
    fill="none"
    strokeWidth={4}
  />
)

export type ConnectionWire = ConnectionWireOwnProps & ConnectionWireStateProps;

export interface ConnectionWireOwnProps {
  connectionId: string;
}

export interface ConnectionWireStateProps {
  startPoint: { x: number, y: number }
  middlePoint: { x: number, y: number }
  endPoint: { x: number, y: number }
}

export const ConnectedConnectionWire = (props: ConnectionWire) => {
  return <div className="connection-wire-container">
    <svg className="connection-wire">
      <Path
        startPoint={[props.startPoint.x, props.startPoint.y]}
        middlePoint={[props.middlePoint.x, props.middlePoint.y]}
        endPoint={[props.endPoint.x, props.endPoint.y]} />
    </svg>
  </div>
}

function mapDispatchToProps() {

}

function mapStateToProps(state: any, ownProps: ConnectionWireOwnProps) {
  let endPointCoordinates = getConnectionEndPosition(state, ownProps.connectionId);
  const startPointCoordinates = getConnectionStartPosition(state, ownProps.connectionId);
  const middlePointCoordinates = {
    x: startPointCoordinates.x + ((endPointCoordinates.x - startPointCoordinates.x) / 2),
    y: ((endPointCoordinates.y + startPointCoordinates.y) / 2) + 150
  }

  return {
    startPoint: startPointCoordinates,
    middlePoint: middlePointCoordinates,
    endPoint: endPointCoordinates
  }
}

export const ConnectionWire = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedConnectionWire);