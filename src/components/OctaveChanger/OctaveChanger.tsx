import "./style.scss";

import * as React from "react";

export interface OctaveChangerProps {
  oscillatorId: string;
  onOctaveChanged: (octave: number) => void;
  activeOctave: number;
}

export class OctaveChanger extends React.Component<OctaveChangerProps> {
  constructor(props: OctaveChangerProps) {
    super(props);
  }

  render() {
    const activeOctave = `octave-${this.props.activeOctave}-active`;
    const containerClassName = `octave-changer-container ${activeOctave}`;
    return (
      <div
        className={containerClassName}
        onTouchStart={() => {
          const newOctave =
            this.props.activeOctave < 4 ? this.props.activeOctave + 1 : 1;
          this.props.onOctaveChanged(newOctave);
        }}
      >
        <div className="octave-selector octave-1" />
        <div className="octave-selector octave-2" />
        <div className="octave-selector octave-3" />
        <div className="octave-selector octave-4" />
      </div>
    );
  }
}
