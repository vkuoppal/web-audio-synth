import { audioPlayer, Note } from "./";
import { actions } from "./../state";
import { store } from "../state";

export interface PlayMidiParams {
  note: number;
  velocity?: number;
}

export interface MuteMidiParams {
  note: number;
}

export const noteMap = new Map<number, Note>([
  [0, "C"],
  [1, "C#"],
  [2, "D"],
  [3, "D#"],
  [4, "E"],
  [5, "F"],
  [6, "F#"],
  [7, "G"],
  [8, "G#"],
  [9, "A"],
  [10, "A#"],
  [11, "B"]
]);

function calculateNote(midiNote: number) {
  // Lowest supported note: 24 = C1
  const noteToRelativeNumber = midiNote - 24;
  const octave = Math.floor(noteToRelativeNumber / 12) + 1;
  const note = noteMap.get(noteToRelativeNumber % 12)!;

  return { note, octave };
}

export function playNote(params: PlayMidiParams) {
  const noteToPlay = calculateNote(params.note);
  audioPlayer.playNote(noteToPlay);
  store.dispatch(actions.activateNote(`${noteToPlay.note}${noteToPlay.octave}`))
}

export function muteNote(params: MuteMidiParams) {
  const noteToPlay = calculateNote(params.note);
  audioPlayer.muteNote(noteToPlay);
  store.dispatch(actions.deactivateNote(`${noteToPlay.note}${noteToPlay.octave}`))
}
