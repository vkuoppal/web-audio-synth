import "./style.scss";

import * as React from "react";


export interface OctaveChangerProps {
  oscillatorId: number;
  onOctaveChanged: (octave: number) => void;
}

export class OctaveChanger extends React.Component<OctaveChangerProps, any> {
  constructor(props: OctaveChangerProps) {
    super(props);
    this.state = { activeOctave: 1 };
  }


  render() {
    const activeOctave = `octave-${this.state.activeOctave}-active`;
    const containerClassName = `octave-changer-container ${activeOctave}`;
    return (
      <div
        className={containerClassName}
        onTouchStart={() => {
          const newOctave = this.state.activeOctave < 4 ? this.state.activeOctave + 1 : 1
          this.setState({ activeOctave: newOctave });
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
