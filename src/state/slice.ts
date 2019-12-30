
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPreset } from "../presets/presetUtil";
import { Waveform } from "../components/OscillatorSwitch/OscillatorSwitch";

export const initialState = { ...fetchPreset(1), noteModulator: {}, activeNotes: new Set(), selectedPreset: 1 } as State;

export interface State {
  gainValue: number,
  adsrValue: { attack: number, decay: number, sustain: number, release: number },
  filter: { cutoff: number, resonance: number },
  noteModulator: { [note: string]: { [modulator: string]: number } } | {},
  oscillator: { [oscillatorId: string]: { type: Waveform, volume: number, octave: number } },
  activeNotes: Set<string>,
  delayActive: boolean,
  delayFeedback: number,
  delayTime: number,
  selectedPreset: number,
}

interface AdsrPayloadAction {
  attack: number; decay: number; sustain: number, release: number
}

interface FilterPayloadAction {
  cutoff: number;
  resonance: number;
}

interface ChangeOscillatorPayloadAction {
  oscillatorId: string;
  oscillatorType: Waveform;
}

interface ChangeOscillatorVolumePayloadAction {
  oscillatorId: string;
  volume: number;
}

interface ChangeOscillatorOctavePayloadAction {
  oscillatorId: string;
  octave: number;
}

interface ChangeNoteModulatorPayload {
  note: string;
  modulator: string;
  value: number
}

interface StopNoteModulatorPayload {
  note: string;
}

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    changeGain(state, action: PayloadAction<number>) {
      state.gainValue = action.payload;
    },
    changeAdsr(state, action: PayloadAction<AdsrPayloadAction>) {
      state.adsrValue = action.payload;
    },
    changeFilter(state, action: PayloadAction<FilterPayloadAction>) {
      state.filter = action.payload
    },
    changeOscillatorType(state, action: PayloadAction<ChangeOscillatorPayloadAction>) {
      state.oscillator[action.payload.oscillatorId].type = action.payload.oscillatorType;
    },
    changeOscillatorVolume(state, action: PayloadAction<ChangeOscillatorVolumePayloadAction>) {
      state.oscillator[action.payload.oscillatorId].volume = action.payload.volume;
    },
    changeOscillatorOctave(state, action: PayloadAction<ChangeOscillatorOctavePayloadAction>) {
      state.oscillator[action.payload.oscillatorId].octave = action.payload.octave;
    },
    activateNote(state, action: PayloadAction<string>) {
      const newSet = new Set(state.activeNotes);
      newSet.add(action.payload);
      state.activeNotes = newSet;
    },
    deactivateNote(state, action: PayloadAction<string>) {
      const newSet = new Set(state.activeNotes);
      newSet.delete(action.payload);
      state.activeNotes = newSet;
    },
    toggleDelayActive(state) {
      state.delayActive = !state.delayActive;
    },
    changeDelayFeedback(state, action: PayloadAction<number>) {
      state.delayFeedback = action.payload;
    },
    changeDelayTime(state, action: PayloadAction<number>) {
      state.delayTime = action.payload;
    },
    changePreset(state, action: PayloadAction<number>) {
      const prevActiveNotes = new Set(state.activeNotes);
      const presetToSelect = action.payload > 5 ? 1 : action.payload;

      const newState = { ...fetchPreset(presetToSelect), activeNotes: prevActiveNotes, selectedPreset: presetToSelect } as State;
      state = newState;
      return state;
    },
    changeNoteModulator(state, action: PayloadAction<ChangeNoteModulatorPayload>) {
      const earlierModulator = state.noteModulator && state.noteModulator[action.payload.note];
      if (earlierModulator) {
        state.noteModulator[action.payload.note][action.payload.modulator] = action.payload.value;
      } else {
        if (!state.noteModulator) {
          state.noteModulator = {};
        }

        state.noteModulator[action.payload.note] = { [action.payload.modulator]: action.payload.value };
      }
    },
    stopNoteModulator(state, action: PayloadAction<StopNoteModulatorPayload>) {
      const earlierModulator = state.noteModulator && state.noteModulator[action.payload.note];
      if (earlierModulator) {
        state.noteModulator[action.payload.note] = {};
      }
    }
  }
});

