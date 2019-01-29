import store from './../store';

export interface PlayParams {
  note: Note;
  octave: number;
  velocity?: number;
}

export interface MuteParams {
  note: Note;
  octave: number;
}

export type Note = {
  note:
    | 'C'
    | 'C#'
    | 'D'
    | 'D#'
    | 'E'
    | 'F'
    | 'F#'
    | 'G'
    | 'G#'
    | 'A'
    | 'A#'
    | 'B';
  octave: number;
};

export const noteMap = new Map([
  ['C', 0],
  ['C#', 1],
  ['D', 2],
  ['D#', 3],
  ['E', 4],
  ['F', 5],
  ['F#', 6],
  ['G', 7],
  ['G#', 8],
  ['A', 9],
  ['A#', 10],
  ['B', 11],
]);

class AudioPlayer {
  private audioContext: AudioContext;
  private oscillators: Map<string, any> = new Map();
  private keyToFrequency: Map<string, number> = new Map();

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
        const gainValue = store.getState().gainValue;
        osc.gainNode.gain.setValueAtTime(
          gainValue / 100,
          this.audioContext.currentTime
        );
      });
    });
  }

  playNote(params: PlayParams) {
    const gainValue = store.getState().gainValue;
    const gainNode = this.audioContext.createGain();
    const oscillator = this.audioContext.createOscillator();
    oscillator.connect(gainNode);
    gainNode.gain.value = gainValue / 100;

    oscillator.type = 'triangle';
    const { note, octave } = params;
    const frequency = this.convertNoteToFrequency(note, octave);
    oscillator.frequency.setValueAtTime(
      frequency,
      this.audioContext.currentTime
    );

    oscillator.start();
    gainNode.connect(this.audioContext.destination);
    this.oscillators.set(`${note}${octave}`, { oscillator, gainNode });
  }

  muteNote(params: MuteParams) {
    const { note, octave } = params;
    const oscToMute = this.oscillators.get(`${note}${octave}`);
    oscToMute.oscillator.stop();
    this.oscillators.delete(`${note}${octave}`);
  }

  private convertNoteToFrequency(note: any, octave: any) {
    return this.keyToFrequency.get(`${note}${octave}`) as number;
  }
}

export const audioPlayer = new AudioPlayer();
