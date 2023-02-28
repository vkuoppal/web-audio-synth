import * as React from "react";
import { Key } from "../Key/Key";

import "./style.scss";

export type Note = {
  note:
    | "C"
    | "C#"
    | "D"
    | "D#"
    | "E"
    | "F"
    | "F#"
    | "G"
    | "G#"
    | "A"
    | "A#"
    | "B";
  octave: number;
};

export const noteMap = new Map([
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
  [11, "B"],
]);

function resolveNote(index: number): Note {
  return {
    note: noteMap.get(index % 12),
    // Keybed starts from octave 2
    octave: Math.floor(index / 12) + 2,
  } as Note;
}

export const Keybed: React.FC = () => {
  let keys: Array<Note> = [];
  for (let i = 0; i < 36; ++i) {
    keys.push(resolveNote(i));
  }

  return (
    <div className="keybed">
      {keys.map((note, index) => (
        <Key key={index} note={note} />
      ))}
    </div>
  );
};
