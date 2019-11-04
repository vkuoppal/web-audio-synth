import {
  CHANGE_GAIN,
  CHANGE_ADSR,
  CHANGE_FILTER,
  CHANGE_OSCILLATOR,
  ACTIVATE_NOTE,
  DEACTIVATE_NOTE,
} from "../actions/action-types";

export const initialState = {
  gainValue: 50,
  adsrValue: { attack: 0, decay: 30, sustain: 30, release: 30 },
  filter: { cutoff: 127, resonance: 0 },
  oscillatorType: "triangle",
  activeNotes: new Set(),
};

function rootReducer(state = initialState, action: any) {
  const { type } = action;
  if (type === CHANGE_GAIN) {
    return Object.assign({}, state, {
      gainValue: action.payload
    });
  } else if (type === CHANGE_ADSR) {
    return Object.assign({}, state, {
      adsrValue: action.payload
    });
  } else if (type === CHANGE_FILTER) {
    return Object.assign({}, state, {
      filter: action.payload
    });
  } else if (type === CHANGE_OSCILLATOR) {
    return Object.assign({}, state, {
      oscillatorType: action.payload.oscillatorType
    });
  } else if (type === ACTIVATE_NOTE) {
    const { activeNotes } = state;
    activeNotes.add(action.payload);
    return Object.assign({}, state, {
      activeNotes,
    });
  } else if (type === DEACTIVATE_NOTE) {
    const { activeNotes } = state;
    activeNotes.delete(action.payload);
    return Object.assign({}, state, {
      activeNotes,
    });
  }

  return state;
}

export default rootReducer;
