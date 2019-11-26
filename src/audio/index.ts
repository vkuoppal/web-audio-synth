import store from "./../store";
// @ts-ignore
import ADSREnvelope from "adsr-envelope";
import { convertRelation } from "./utils";
import { createResonanceFilter } from "./resonance";
import { getOscillatorType, getOscillatorVolume, getOscillatorOctave } from "./../selectors";

export interface PlayParams {
  note: Note;
  octave: number;
  velocity?: number;
}

export interface OscillatorParams extends PlayParams {
  oscillatorId: number;
}

export interface MuteParams {
  note: Note;
  octave: number;
}

export type Note =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B";

export const noteMap = new Map([
  ["C", 0],
  ["C#", 1],
  ["D", 2],
  ["D#", 3],
  ["E", 4],
  ["F", 5],
  ["F#", 6],
  ["G", 7],
  ["G#", 8],
  ["A", 9],
  ["A#", 10],
  ["B", 11]
]);

class AudioPlayer {
  private audioContext: AudioContext;
  private oscillators: Map<string, any> = new Map();
  private keyToFrequency: Map<string, number> = new Map();
  private oscilloscopeOff = true;

  constructor() {
    const A4 = 440;
    const A = [];
    for (let i = -4; i < 4; i++) {
      let a = A4 * Math.pow(2, i);
      A.push(a);
    }

    A.forEach((a, index) => {
      this.keyToFrequency.set(`B${index}`, a * Math.pow(2, 2 / 12));
      this.keyToFrequency.set(`A#${index}`, a * Math.pow(2, 1 / 12));
      this.keyToFrequency.set(`A${index}`, a);
      this.keyToFrequency.set(`G#${index}`, a * Math.pow(2, -1 / 12));
      this.keyToFrequency.set(`G${index}`, a * Math.pow(2, -2 / 12));
      this.keyToFrequency.set(`F#${index}`, a * Math.pow(2, -3 / 12));
      this.keyToFrequency.set(`F${index}`, a * Math.pow(2, -4 / 12));
      this.keyToFrequency.set(`E${index}`, a * Math.pow(2, -5 / 12));
      this.keyToFrequency.set(`D#${index}`, a * Math.pow(2, -6 / 12));
      this.keyToFrequency.set(`D${index}`, a * Math.pow(2, -7 / 12));
      this.keyToFrequency.set(`C#${index}`, a * Math.pow(2, -8 / 12));
      this.keyToFrequency.set(`C${index}`, a * Math.pow(2, -9 / 12));
    });

    this.audioContext = new AudioContext();

    store.subscribe(() => {
      this.oscillators.forEach(osc => {
        /*const gainValue = store.getState().gainValue;
        osc.gainNode.gain.setValueAtTime(
          gainValue / 150 / (this.oscillators.size + 1),
          this.audioContext.currentTime
        );*/

        const { cutoff, resonance } = store.getState().filter;

        osc.cutoffFilter.frequency.value = convertRelation(cutoff, 20000, 100);
        osc.resonanceFilter.frequency.value = convertRelation(
          resonance,
          osc.cutoffFilter.frequency.value
        );
      });
    });
  }

  playNote(params: PlayParams) {
    if (this.noteActive(params.note, params.octave)) {
      return;
    }

    this.createOscillator(params, 1);
    this.createOscillator(params, 2);
    this.createOscillator(params, 3);
    this.createOscillator(params, 4);
  }

  muteNote(params: MuteParams) {
    this.muteOscillator(params, 1);
    this.muteOscillator(params, 2);
    this.muteOscillator(params, 3);
    this.muteOscillator(params, 4);
  }

  private createOscillator(params: PlayParams, oscillatorId: number) {
    const gainNode = this.audioContext.createGain();
    const oscillator = this.audioContext.createOscillator();

    const cutoffFilter = this.audioContext.createBiquadFilter();

    const { cutoff, resonance } = store.getState().filter;

    cutoffFilter.frequency.value = convertRelation(cutoff, 14000);
    const resonanceFilter = createResonanceFilter(
      this.audioContext,
      resonance,
      cutoffFilter.frequency.value
    );

    const oscillatorType = getOscillatorType(store.getState(), oscillatorId);

    if (oscillatorType !== "custom") {
      oscillator.type = oscillatorType as OscillatorType;
    }
    const { note, octave } = params;
    const octaveSetOff = getOscillatorOctave(store.getState(), oscillatorId);
    const frequency = this.convertNoteToFrequency(note, (octave - 1) + (octaveSetOff - 1));
    oscillator.frequency.setValueAtTime(
      frequency,
      this.audioContext.currentTime
    );

    const startTime = this.audioContext.currentTime;

    const oscillatorVolume = getOscillatorVolume(store.getState(), oscillatorId);
    const relationalVolume = convertRelation(oscillatorVolume, 0.04, 0);

    if (relationalVolume === 0) {
      return;
    }

    const peakLevel = relationalVolume;
    const adsrValue = store.getState().adsrValue;
    const envelope = new ADSREnvelope({
      attackTime: convertRelation(adsrValue.attack, 4),
      decayTime: convertRelation(adsrValue.decay, 4),
      sustainLevel: convertRelation(adsrValue.sustain, 4),
      releaseTime: convertRelation(adsrValue.release, 4),
      gateTime: 4,
      releaseCurve: "exp",
      peakLevel,
    });

    envelope.gateTime = Infinity;
    envelope.applyTo(gainNode.gain, startTime);

    oscillator.connect(cutoffFilter);
    cutoffFilter.connect(resonanceFilter);
    resonanceFilter.connect(gainNode);

    gainNode.connect(this.audioContext.destination);

    oscillator.start();
    this.oscillators.set(`${note}${octave}${oscillatorId}`, {
      oscillator,
      gainNode,
      startTime,
      envelope,
      cutoffFilter,
      resonanceFilter
    });
  }

  private muteOscillator(params: MuteParams, oscillatorId: number) {
    const { note, octave } = params;
    const oscToMute = this.oscillators.get(`${note}${octave}${oscillatorId}`);
    if (!oscToMute) {
      return;
    }

    const muteTime = this.audioContext.currentTime;
    oscToMute.gainNode.gain.cancelScheduledValues(oscToMute.startTime);

    oscToMute.envelope.gateTime = muteTime - oscToMute.startTime;

    oscToMute.envelope.applyTo(oscToMute.gainNode.gain, oscToMute.startTime);
    oscToMute.oscillator.stop(
      oscToMute.startTime + oscToMute.envelope.duration
    );
    this.oscillators.delete(`${note}${octave}${oscillatorId}`);
  }

  private convertNoteToFrequency(note: Note, octave: number) {
    return this.keyToFrequency.get(`${note}${octave}`) as number;
  }

  private noteActive(note: Note, octave: number) {
    return this.oscillators.get(`${note}${octave}`) !== undefined;
  }
}

export const audioPlayer = new AudioPlayer();
