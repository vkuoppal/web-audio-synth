import * as React from "react";
import "./style.scss";

export interface ConnectionPointProps {
  connectionId: string;
  startConnection?: (x: number, y: number) => void;
  moveConnection?: (x: number, y: number) => void;
  forcedPosition?: { x: number; y: number };
}

export class ConnectionPoint extends React.Component<ConnectionPointProps> {
  private connectionPointRef;
  constructor(props: ConnectionPointProps) {
    super(props);
    this.connectionPointRef = React.createRef();
  }

  render() {
    const style = this.props.forcedPosition
      ? ({
          position: "absolute",
          left: `${this.props.forcedPosition.x - 8}px`,
          top: `${this.props.forcedPosition.y - 9}px`,
        } as React.CSSProperties)
      : {};

    const connectionPointStyle = this.props.forcedPosition
      ? {
          border: "3px solid #008c9e",
          boxShadow:
            "0px 2px 4px 2px rgba(0, 0, 0, 0.45), inset black 0 0px 2px, rgb(0, 140, 158) 0px 0px 5px 0px",
        }
      : {};
    return this.props.forcedPosition?.x !== 0 ? (
      <div
        className="connection-point-container"
        style={style}
        ref={this.connectionPointRef}
        onTouchStart={() => {
          if (this.props.startConnection && this.props.moveConnection) {
            const {
              x,
              y,
              width,
              height,
            } = this.connectionPointRef.current.getBoundingClientRect();
            this.props.startConnection(x + width / 2, y + height / 2);
            this.props.moveConnection(x + width / 2, y + height / 2);
          }
        }}
        onTouchMove={(e) => {
          if (this.props.moveConnection) {
            const touch = e.touches[0];
            this.props.moveConnection(touch.clientX, touch.clientY);
          }
        }}
      >
        <div className="connection-point" style={connectionPointStyle}></div>
      </div>
    ) : null;
  }
}
