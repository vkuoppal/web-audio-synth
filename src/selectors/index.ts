export const isNoteActive = (state: any, note: string) => {
  return state.activeNotes.has(note);
};

export const getOscillatorType = (state: any, oscillatorId: number) => {
  return state.oscillator[oscillatorId].type;
}

export const getOscillatorVolume = (state: any, oscillatorId: number) => {
  return state.oscillator[oscillatorId].volume;
}

export const getOscillatorOctave = (state: any, oscillatorId: number) => {
  return state.oscillator[oscillatorId].octave;
}