import {
  CHANGE_GAIN,
  CHANGE_ADSR,
  CHANGE_FILTER,
  CHANGE_OSCILLATOR,
  ACTIVATE_NOTE,
  DEACTIVATE_NOTE
} from "./action-types";

export function changeGain(payload: any) {
  return { type: CHANGE_GAIN, payload };
}

export function changeAdsr(payload: any) {
  return { type: CHANGE_ADSR, payload };
}

export function changeFilter(payload: any) {
  return { type: CHANGE_FILTER, payload };
}

export function changeOscillatorType(payload: any) {
  return { type: CHANGE_OSCILLATOR, payload };
}

export function activateNote(payload: any) {
  return { type: ACTIVATE_NOTE, payload };
}

export function deactivateNote(payload: any) {
  return { type: DEACTIVATE_NOTE, payload };
}
