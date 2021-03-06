import { State } from "./slice";

export const isNoteActive = (state: State, note: string) => {
  return state.activeNotes.has(note);
};

export const getOscillatorType = (state: State, oscillatorId: string) => {
  return state.oscillator[oscillatorId].type;
};

export const getOscillatorVolume = (state: State, oscillatorId: string) => {
  return state.oscillator[oscillatorId].volume;
};

export const getOscillatorOctave = (state: State, oscillatorId: string) => {
  return state.oscillator[oscillatorId].octave;
};

export const isDelayActive = (state: State) => {
  return state.delayActive;
};

export const getDelayFeedback = (state: State) => {
  return state.delayFeedback;
};

export const getDelayTime = (state: State) => {
  return state.delayTime;
};

export const getSelectedPresetNumber = (state: State) => {
  return state.selectedPreset;
};

export const getAdsr = (state: State) => {
  return state.adsrValue;
};

export const getFilter = (state: State) => {
  return state.filter;
};

export const getModulationAmount = (state: State, note: string, modulation) => {
  return (
    state.noteModulator &&
    state.noteModulator[note] &&
    state.noteModulator[note][modulation]
  );
};

export const isRandomizing = (state: State) => {
  return state.randomizing;
};

export const getLfoIntensity = (state: State) => {
  return state.lfo.intensity;
};

export const getLfoSpeed = (state: State) => {
  return state.lfo.speed;
};

export const getLfoType = (state: State) => {
  return state.lfo.type;
};

export const getConnectionEndPosition = (
  state: State,
  connectionId: string
) => {
  return state.connection[connectionId].position;
};

export const getConnectionStartPosition = (
  state: State,
  connectionId: string
) => {
  return state.connection[connectionId].startPoint;
};

export const getKnobPositions = (state: State) => {
  return state.knobs;
};
