/**
 *
 * Key.tsx
 *
 */

import "./style.scss";

import * as React from "react";
import { Note } from "../Keybed/Keybed";
import { audioPlayer } from "../../audio";

export interface IKeyProps {
  note: Note;
}

function isSharpNote(note: Note): boolean {
  return note.note.includes("#");
}

export class Key extends React.Component<IKeyProps, any> {
  constructor(props: IKeyProps) {
    super(props);
    this.state = { active: false };
  }

  onPlayNote = () => {
    const { note, octave } = this.props.note;
    audioPlayer.playNote({ note, octave });
    this.setState({ active: true });
  };

  onMuteNote = () => {
    const { note, octave } = this.props.note;
    audioPlayer.muteNote({ note, octave });
    this.setState({ active: false });
  };

  render() {
    const { note } = this.props;
    const isActive = this.state.active;
    const keyClass = isSharpNote(note) ? "sharp" : "flat";
    return (
      <div
        className={`key ${keyClass} ${isActive ? "active" : ""}`}
        onTouchStart={this.onPlayNote}
        onTouchEnd={this.onMuteNote}
      />
    );
  }
}
