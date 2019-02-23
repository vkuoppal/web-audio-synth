import { convertRelation } from "./utils";

export function createResonanceFilter(
  audioContext: AudioContext,
  resonanceValue: number,
  maxResonance: number
) {
  const resonanceFilter = audioContext.createBiquadFilter();

  resonanceFilter.frequency.value = convertRelation(
    resonanceValue,
    maxResonance
  );
  resonanceFilter.type = "peaking";
  resonanceFilter.Q.value = 1;
  resonanceFilter.gain.value = 10;
  return resonanceFilter;
}
