import presets from './presets.json';

export function fetchPreset(number: number) {
  return presets[number];
}