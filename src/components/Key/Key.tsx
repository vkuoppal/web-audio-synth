/**
 *
 * Key.tsx
 *
 */

import './style.scss';

import * as React from 'react';
import { Note } from '../Keybed/Keybed';
import { audioPlayer } from '../../audio';

export interface IKeyProps {
  note: Note;
}

function isSharpNote(note: Note): boolean {
  return note.note.includes('#');
}

export class Key extends React.Component<IKeyProps, any> {
  onPlayNote = () => {
    const { note, octave } = this.props.note;

    // @ts-ignore
    audioPlayer.playNote({ note, octave });
  };

  onMuteNote = () => {
    const { note, octave } = this.props.note;
    // @ts-ignore
    audioPlayer.muteNote({ note, octave });
  };

  render() {
    const { note } = this.props;
    const keyClass = isSharpNote(note) ? 'sharp' : 'flat';
    return (
      <div
        className={`key ${keyClass}`}
        onTouchStart={this.onPlayNote}
        onTouchEnd={this.onMuteNote}
      />
    );
  }
}
