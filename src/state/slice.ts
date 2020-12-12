import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPreset, randomPreset } from "../presets/presetUtil";
import { Waveform } from "../components/OscillatorSwitch/OscillatorSwitch";

export const initialState = {
  ...fetchPreset(1),
  noteModulator: {},
  activeNotes: new Set(),
  selectedPreset: 1,
  knobs: {},
} as State;

export interface State {
  gainValue: number;
  adsrValue: {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
  };
  filter: { cutoff: number; resonance: number };
  lfo: { speed: number; intensity: number; type: Waveform };
  noteModulator: { [note: string]: { [modulator: string]: number } } | {};
  oscillator: {
    [oscillatorId: string]: { type: Waveform; volume: number; octave: number };
  };
  activeNotes: Set<string>;
  delayActive: boolean;
  delayFeedback: number;
  delayTime: number;
  selectedPreset: number;
  randomizing?: boolean;
  connection: {
    [connectionId: string]: {
      position: { x: number; y: number };
      startPoint: { x: number; y: number };
    };
  };
  knobs: {
    [knobName: string]: { origo?: { x: number; y: number } };
  };
}

interface AdsrPayloadAction {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
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
  value: number;
}

interface StopNoteModulatorPayload {
  note: string;
}

interface ChangeLfoSpeedPayload {
  lfoSpeed: number;
}

interface ChangeLfoIntensityPayload {
  lfoIntensity: number;
}

interface ChangeLfoTypePayload {
  lfoType: Waveform;
}

interface MoveConnectionPayload {
  connectionId: string;
  x: number;
  y: number;
}

interface SetConnectionStartPayload {
  connectionId: string;
  x: number;
  y: number;
}

interface SetKnobOrigoPayload {
  name: string;
  origo: {
    x: number;
    y: number;
  };
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
      state.filter = action.payload;
    },
    changeOscillatorType(
      state,
      action: PayloadAction<ChangeOscillatorPayloadAction>
    ) {
      state.oscillator[action.payload.oscillatorId].type =
        action.payload.oscillatorType;
    },
    changeOscillatorVolume(
      state,
      action: PayloadAction<ChangeOscillatorVolumePayloadAction>
    ) {
      state.oscillator[action.payload.oscillatorId].volume =
        action.payload.volume;
    },
    changeOscillatorOctave(
      state,
      action: PayloadAction<ChangeOscillatorOctavePayloadAction>
    ) {
      state.oscillator[action.payload.oscillatorId].octave =
        action.payload.octave;
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

      const newState = {
        ...fetchPreset(presetToSelect),
        activeNotes: prevActiveNotes,
        selectedPreset: presetToSelect,
      } as State;
      state = newState;
      return state;
    },
    randomizeAll(state) {
      const prevActiveNotes = new Set(state.activeNotes);
      const presetToSelect = 99;

      const newState = {
        connection: {
          "1": { position: { x: 0, y: 0 }, startPoint: { x: 0, y: 0 } },
        },
        randomizing: true,
        ...randomPreset(),
        activeNotes: prevActiveNotes,
        selectedPreset: presetToSelect,
        noteModulator: {},
      };
      // @ts-ignore
      state = newState;
      return state;
    },
    randomized(state) {
      state.randomizing = false;
    },
    changeNoteModulator(
      state,
      action: PayloadAction<ChangeNoteModulatorPayload>
    ) {
      const earlierModulator =
        state.noteModulator && state.noteModulator[action.payload.note];
      if (earlierModulator) {
        state.noteModulator[action.payload.note][action.payload.modulator] =
          action.payload.value;
      } else {
        if (!state.noteModulator) {
          state.noteModulator = {};
        }

        state.noteModulator[action.payload.note] = {
          [action.payload.modulator]: action.payload.value,
        };
      }
    },
    stopNoteModulator(state, action: PayloadAction<StopNoteModulatorPayload>) {
      const earlierModulator =
        state.noteModulator && state.noteModulator[action.payload.note];
      if (earlierModulator) {
        state.noteModulator[action.payload.note] = {};
      }
    },
    changeLfoSpeed(state, action: PayloadAction<ChangeLfoSpeedPayload>) {
      state.lfo.speed = action.payload.lfoSpeed;
    },

    changeLfoIntensity(
      state,
      action: PayloadAction<ChangeLfoIntensityPayload>
    ) {
      state.lfo.intensity = action.payload.lfoIntensity;
    },

    changeLfoType(state, action: PayloadAction<ChangeLfoTypePayload>) {
      state.lfo.type = action.payload.lfoType;
    },

    moveConnection(state, action: PayloadAction<MoveConnectionPayload>) {
      const endX = action.payload.x;
      const endY = action.payload.y;
      const knobPositions = state.knobs;

      let endPointCoordinates = { x: endX, y: endY };
      // Snap to knobs
      Object.keys(knobPositions).forEach((key) => {
        const { origo } = knobPositions[key];
        if (origo) {
          const xDistance = endX > origo.x ? endX - origo.x : origo.x - endX;

          const yDistance = endY > origo.y ? endY - origo.y : origo.y - endY;

          if (yDistance < 32 && xDistance < 32) {
            endPointCoordinates = origo;
          }
        }
      });

      state.connection[
        action.payload.connectionId
      ].position = endPointCoordinates;
    },

    setConnectionStart(
      state,
      action: PayloadAction<SetConnectionStartPayload>
    ) {
      state.connection[action.payload.connectionId].startPoint = {
        x: action.payload.x,
        y: action.payload.y,
      };
    },

    setKnobOrigo(state, action: PayloadAction<SetKnobOrigoPayload>) {
      if (!state.knobs[action.payload.name]) {
        state.knobs[action.payload.name] = {};
      }
      state.knobs[action.payload.name].origo = action.payload.origo;
    },
  },
});
