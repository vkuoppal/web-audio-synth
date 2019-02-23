import {
  CHANGE_GAIN,
  CHANGE_ADSR,
  CHANGE_FILTER
} from "../actions/action-types";
const initialState = {
  gainValue: 50,
  adsrValue: { attack: 0, decay: 1, sustain: 0.5, release: 0.5 },
  filter: { cutoff: 127, resonance: 0 }
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
  }

  return state;
}

export default rootReducer;
