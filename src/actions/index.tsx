import {
  CHANGE_GAIN,
  CHANGE_ADSR,
  CHANGE_FILTER
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
