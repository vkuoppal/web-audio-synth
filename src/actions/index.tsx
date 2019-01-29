import { CHANGE_GAIN } from '../constants/action-types';

export function changeGain(payload: any) {
  return { type: CHANGE_GAIN, payload };
}
