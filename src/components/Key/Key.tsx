/**
 *
 * Key.tsx
 *
 */

import "./style.scss";

import * as React from "react";
import { connect } from "react-redux";
import { isNoteActive } from "../../selectors";
import { Note } from "../Keybed/Keybed";
import { audioPlayer } from "../../audio";
import { activateNote, deactivateNote } from "../../actions/index";

export interface IKeyProps {
  note: Note;
  active?: boolean;
  activateNote?: (note: string) => void;
  deactivateNote?: (note: string) => void;
}

export interface KeyState {
  active: boolean;
}

function isSharpNote(note: Note): boolean {
  return note.note.includes("#");
}

export class ConnectedKey extends React.Component<IKeyProps, KeyState> {
  constructor(props: IKeyProps) {
    super(props);
    this.state = { active: false };
  }

  onPlayNote = () => {
    const { note, octave } = this.props.note;
    audioPlayer.playNote({ note, octave });
    if (this.props.activateNote) {
      this.props.activateNote(
        `${note}${octave}`
      );
    }
  };

  onMuteNote = () => {
    const { note, octave } = this.props.note;
    audioPlayer.muteNote({ note, octave });
    if (this.props.deactivateNote) {
      this.props.deactivateNote(
        `${note}${octave}`
      );
    }
  };

  render() {
    const { note } = this.props;
    const isActive = this.state.active || this.props.active === true;
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

function mapDispatchToProps(dispatch: Function) {
  return {
    activateNote: (note: string) => dispatch(activateNote(note)),
    deactivateNote: (note: string) => dispatch(deactivateNote(note)),
  };
}

function mapStateToProps(state: any, ownProps: IKeyProps) {
  const { note, octave } = ownProps.note;
  return {
    active: isNoteActive(state, `${note}${octave}`)
  };
}

export const Key = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedKey);
