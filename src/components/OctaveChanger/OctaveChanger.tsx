import "./style.scss";
import * as React from "react";

export interface OctaveChangerProps {
  oscillatorId: string;
  onOctaveChanged: (octave: number) => void;
  activeOctave: number;
}

export const OctaveChanger: React.FC<OctaveChangerProps> = (
  props: OctaveChangerProps
) => {
  const activeOctave = `octave-${props.activeOctave}-active`;
  const containerClassName = `octave-changer-container ${activeOctave}`;
  return (
    <div
      className={containerClassName}
      onTouchStart={() => {
        const newOctave = props.activeOctave < 4 ? props.activeOctave + 1 : 1;
        props.onOctaveChanged(newOctave);
      }}
    >
      <div className="octave-selector octave-1" />
      <div className="octave-selector octave-2" />
      <div className="octave-selector octave-3" />
      <div className="octave-selector octave-4" />
    </div>
  );
};
