import presets from "./presets.json";
import { Waveform } from "../components/OscillatorSwitch/OscillatorSwitch.jsx";

export function fetchPreset(number: number) {
  return presets[number];
}

function randomWithinInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomOsc() {
  const oscIdx = randomWithinInterval(0, 3);
  const oscillators = ["square", "triangle", "sine", "saw"];
  return oscillators[oscIdx];
}

export function randomPreset() {
  return {
    gainValue: randomWithinInterval(0, 127),
    adsrValue: {
      attack: randomWithinInterval(0, 127),
      decay: randomWithinInterval(0, 127),
      sustain: randomWithinInterval(0, 127),
      release: randomWithinInterval(0, 127),
    },
    filter: {
      cutoff: randomWithinInterval(0, 127),
      resonance: randomWithinInterval(0, 127),
    },
    oscillator: {
      "1": {
        type: randomOsc() as Waveform,
        volume: randomWithinInterval(0, 127),
        octave: randomWithinInterval(1, 4),
      },
      "2": {
        type: randomOsc() as Waveform,
        volume: randomWithinInterval(0, 127),
        octave: randomWithinInterval(1, 4),
      },
      "3": {
        type: randomOsc() as Waveform,
        volume: randomWithinInterval(0, 127),
        octave: randomWithinInterval(1, 4),
      },
      "4": {
        type: randomOsc() as Waveform,
        volume: randomWithinInterval(0, 127),
        octave: randomWithinInterval(1, 4),
      },
    },
    lfo: {
      intensity: randomWithinInterval(0, 127),
      speed: randomWithinInterval(0, 127),
      type: randomOsc() as Waveform,
    },
    delayActive: Boolean(randomWithinInterval(0, 1)),
    delayFeedback: randomWithinInterval(0, 127),
    delayTime: randomWithinInterval(0, 127),
  };
}
