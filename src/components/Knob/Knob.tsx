/**
 *
 * Knob.tsx
 *
 */

import * as React from "react";
import "./style.scss";
import { ParamText } from "./../ParamText/ParamText";

export interface KnobProps {
  name: string;
  showName?: boolean;
  value: number;
  onValueChanged: (value: number) => void;
}

export interface KnobState {
  value: number;
  isActive: boolean;
}

function resolveQuarter(x: number, y: number): number {
  if (x >= 0 && y > 0) {
    return 1;
  } else if (x >= 0 && y < 0) {
    return 2;
  } else if (x < 0 && y <= 0) {
    return 3;
  }

  return 4;
}

export class Knob extends React.Component<KnobProps, KnobState> {
  private origo: { x: number; y: number };

  constructor(props: KnobProps) {
    super(props);
    this.origo = { x: 0, y: 0 };
    this.state = { value: props.value, isActive: false };
  }

  refCallback = (element: HTMLElement | null) => {
    if (!element) {
      return;
    }
    const boundingClientRect = element.getBoundingClientRect() as DOMRect;
    this.origo = {
      x: boundingClientRect.x + boundingClientRect.width / 2,
      y: boundingClientRect.y + boundingClientRect.height / 2
    };
  };

  onTouchStart = () => {
    this.setState({ isActive: true });
  };

  onTouchMove = (event: React.TouchEvent) => {
    const { touches } = event;
    let targetTouch;
    for (let i = 0; i < touches.length; i++) {
      if ((touches[i].target as HTMLElement).classList.contains(this.props.name)) {
        targetTouch = touches[i];
      }
    }

    if (!targetTouch) {
      return;
    }

    const currentY = targetTouch.pageY;
    const currentX = targetTouch.pageX;

    const yFromOrigo = this.origo.y - currentY;
    const xFromOrigo = currentX - this.origo.x;

    // Quarter in the coordinate system
    const quarter = resolveQuarter(xFromOrigo, yFromOrigo);

    const angle = Math.abs(
      Math.atan(xFromOrigo / yFromOrigo) * (180 / Math.PI)
    );

    let knobValue = 0;

    /**
     * Q1 values: 0 -> 18 (18 values relative to 35°)
     * Q2 values: 19 -> 64 (45 values relative to 90°)
     * Q3 values: 65 -> 110 (45 values relative to 90°)
     * Q4 values: 111 -> 127 (16 values relative to 35°)
     */
    if (quarter === 1) {
      const baseValue = 65;
      knobValue = baseValue + angle / 2;
    } else if (quarter === 2) {
      if (this.state.value === 0 && angle < 55) {
        return;
      }

      const baseValue = 111;
      knobValue =
        angle < 55 ? 127 : baseValue + (16 * Math.abs(90 - angle)) / 35;
    } else if (quarter === 3) {
      if (this.state.value === 127 && angle < 55) {
        return;
      }

      knobValue = angle < 55 ? 0 : (18 * Math.abs(90 - angle - 35)) / 35;
    } else if (quarter === 4) {
      const baseValue = 19;
      knobValue = baseValue + (90 - angle) / 2;
    }

    this.setState({ value: knobValue });
    this.props.onValueChanged(knobValue);
  };

  onTouchEnd = () => {
    this.setState({ isActive: false });
  };

  render() {
    const transformValue = this.props.value;
    const styles = {
      transform: `rotate(${transformValue * 2}deg)`
    };
    const knobPointerName = `knob-pointer-container ${this.props.name}`;

    const knobClass = `knob ${this.state.isActive ? "active" : ""}`;
    const showName = this.props.showName !== undefined ? this.props.showName : true;
    return (
      <div className="knob-container">
        <div
          className={knobClass}
          ref={this.refCallback}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
        >
          <div className={knobPointerName} style={styles}>
            <div className="knob-pointer" />
          </div>
        </div>

        {showName && <ParamText text={this.props.name} />}
      </div>
    );
  }
}
