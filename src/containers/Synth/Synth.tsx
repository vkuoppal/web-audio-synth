import * as React from "react";
import { Keybed } from "../../components/Keybed/Keybed";
import { Envelope } from "./../Envelope/Envelope";
import { Filter } from "./../Filter/Filter";
import { Delay } from "./../Delay/Delay";
import { Lfo } from "./../Lfo/Lfo";
import { PresetChanger } from "./../PresetChanger/PresetChanger";
import { playNote, muteNote } from "./../../audio/midi-interface";
import { actions } from "../../state";
import { isRandomizing } from "../../state/selectors";

import { connect } from "react-redux";

import "./style.scss";
import { OscillatorMixerRow } from "../OscillatorMixerRow/OscillatorMixerRow";

export interface SynthProps {
  randomizing: boolean | undefined;
  randomized: () => void;
}

enum KeyPressDirection {
  Up = "up",
  Down = "down",
}

function onKeyPress(
  event: React.KeyboardEvent,
  keyPressDirection: KeyPressDirection
) {
  const { key } = event;
  let note;
  switch (key) {
    case "q":
      note = 60;
      break;
    case "2":
      note = 61;
      break;
    case "w":
      note = 62;
      break;
    case "3":
      note = 63;
      break;
    case "e":
      note = 64;
      break;
    case "r":
      note = 65;
      break;
    case "5":
      note = 66;
      break;
    case "t":
      note = 67;
      break;
    case "6":
      note = 68;
      break;
    case "y":
      note = 69;
      break;
    case "7":
      note = 70;
      break;
    case "u":
      note = 71;
      break;
    case "i":
      note = 72;
      break;
    case "9":
      note = 73;
      break;
    case "o":
      note = 74;
      break;
    case "0":
      note = 75;
      break;
    case "p":
      note = 76;
      break;
  }

  if (!note) {
    return;
  }

  if (keyPressDirection === KeyPressDirection.Down) {
    playNote({ note });
  } else if (keyPressDirection === KeyPressDirection.Up) {
    muteNote({ note });
  }
}

const ConnectedSynth: React.FC<SynthProps> = (props: SynthProps) => {
  const synthRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (synthRef.current) {
      synthRef.current.focus();
    }
  }, []);

  const className = props.randomizing
    ? "synth-container randomizing"
    : "synth-container";
  if (props.randomizing) {
    window.setTimeout(() => props.randomized(), 1000);
  }

  return (
    <div
      ref={synthRef}
      className={className}
      tabIndex={0}
      onKeyDown={(event) => onKeyPress(event, KeyPressDirection.Down)}
      onKeyUp={(event) => onKeyPress(event, KeyPressDirection.Up)}
    >
      <div className="main-panel">
        <div className="oscillator-mixer">
          <OscillatorMixerRow oscillatorId={1} />
          <OscillatorMixerRow oscillatorId={2} />
          <OscillatorMixerRow oscillatorId={3} />
          <OscillatorMixerRow oscillatorId={4} />
        </div>

        <Filter />
        <PresetChanger />
        <Lfo />
        <Envelope />
        <Delay />
      </div>
      <div className="bottom-divider" />
      <div className="keybed-container">
        <Keybed />
      </div>
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    randomizing: isRandomizing(state),
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    randomized: () => dispatch(actions.randomized()),
  };
}

export const Synth = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSynth);
