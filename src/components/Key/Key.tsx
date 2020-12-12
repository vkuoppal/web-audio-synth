import "./style.scss";

import * as React from "react";
import { connect } from "react-redux";
import { isNoteActive, getModulationAmount } from "../../state/selectors";
import { Note } from "../Keybed/Keybed";
import { audioPlayer } from "../../audio";
import { actions } from "../../state";

const PITCH_SENSITIVITY = 5;
const PITCH_AMOUNT = 170;

export interface IKeyProps {
  note: Note;
  active?: boolean;
  activateNote?: (note: string) => void;
  deactivateNote?: (note: string) => void;
  changeNoteModulator?: (
    note: string,
    modulator: string,
    value: number
  ) => void;
  stopNoteModulator?: (note: string) => void;
  modulationAmount?: number;
  pitchModulation?: number;
}

export interface KeyState {
  active: boolean;
}

function isSharpNote(note: Note): boolean {
  return note.note.includes("#");
}

function convertYValue(movedY: number) {
  let movedValueY = movedY;
  if (movedY < 0) {
    movedValueY = 0;
  } else if (movedY > 127) {
    movedValueY = 127;
  }
  return movedValueY;
}

function convertXValue(movedX: number) {
  let movedValueX = movedX;
  if (movedX < PITCH_SENSITIVITY && movedX > -PITCH_SENSITIVITY) {
    movedValueX = 0;
  } else if (movedX < -PITCH_AMOUNT) {
    movedValueX = -PITCH_AMOUNT;
  } else if (movedX > PITCH_AMOUNT) {
    movedValueX = PITCH_AMOUNT;
  } else if (movedValueX >= PITCH_SENSITIVITY) {
    movedValueX = movedValueX - PITCH_SENSITIVITY;
  } else if (movedValueX <= -PITCH_SENSITIVITY) {
    movedValueX = movedValueX + PITCH_SENSITIVITY;
  }

  return movedValueX;
}

export class ConnectedKey extends React.Component<IKeyProps, KeyState> {
  private touchStartCoordinates;
  constructor(props: IKeyProps) {
    super(props);
    this.state = { active: false };
  }

  onPlayNote = (event: React.TouchEvent) => {
    const { note, octave } = this.props.note;
    audioPlayer.playNote({ note, octave });
    if (this.props.activateNote) {
      this.props.activateNote(`${note}${octave}`);
    }

    const { touches } = event;
    let targetTouch;
    for (let i = 0; i < touches.length; i++) {
      if (
        (touches[i].target as HTMLElement).classList.contains(
          `${this.props.note.note}${this.props.note.octave}`
        )
      ) {
        targetTouch = touches[i];
      }
    }

    if (!targetTouch) {
      return;
    }

    const currentY = targetTouch.pageY;
    const currentX = targetTouch.pageX;
    this.touchStartCoordinates = { x: currentX, y: currentY };
  };

  onMuteNote = () => {
    const { note, octave } = this.props.note;
    audioPlayer.muteNote({ note, octave });
    if (this.props.deactivateNote) {
      this.props.deactivateNote(`${note}${octave}`);
    }
    if (this.props.stopNoteModulator) {
      this.props.stopNoteModulator(`${note}${octave}`);
    }
  };

  onTouchMove = (event: React.TouchEvent) => {
    if (this.props.changeNoteModulator) {
      const { touches } = event;
      let targetTouch;
      for (let i = 0; i < touches.length; i++) {
        if (
          (touches[i].target as HTMLElement).classList.contains(
            `${this.props.note.note}${this.props.note.octave}`
          )
        ) {
          targetTouch = touches[i];
        }
      }

      if (!targetTouch) {
        return;
      }

      const { pageY: currentY, pageX: currentX } = targetTouch;
      const movedY = this.touchStartCoordinates.y - currentY;
      const movedX = this.touchStartCoordinates.x - currentX;

      const movedValueY = convertYValue(movedY);
      const movedValueX = convertXValue(movedX);

      const { note, octave } = this.props.note;
      this.props.changeNoteModulator(
        `${note}${octave}`,
        "resonance",
        movedValueY
      );
      this.props.changeNoteModulator(`${note}${octave}`, "pitch", movedValueX);
    }
  };

  render() {
    const { note } = this.props;
    const isActive = this.state.active || this.props.active === true;
    const keyClass = isSharpNote(note) ? "sharp" : "flat";

    let style = {};

    if (this.props.modulationAmount && this.props.modulationAmount > 0) {
      let [r, g, b] = [0, 180, 204];
      r += this.props.modulationAmount * 2;
      g -= this.props.modulationAmount / 2;
      b -= this.props.modulationAmount / 2;
      style = {
        background: `linear-gradient(-20deg, rgb(${r}, ${g}, ${b}), white, rgb(${r}, ${g}, ${b})`,
      };
    }

    if (this.props.pitchModulation !== undefined) {
      const transformAmount = this.props.pitchModulation * 0.1;
      style = {
        ...style,
        transform: `rotate(${transformAmount}deg)`,
      };
    }

    return (
      <div
        className={`key ${keyClass} ${note.note}${note.octave} ${
          isActive ? "active" : ""
        }`}
        style={style}
        onTouchStart={this.onPlayNote}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onMuteNote}
      />
    );
  }
}

function mapDispatchToProps(dispatch: Function) {
  return {
    activateNote: (note: string) => dispatch(actions.activateNote(note)),
    deactivateNote: (note: string) => dispatch(actions.deactivateNote(note)),
    changeNoteModulator: (note: string, modulator: string, value: number) =>
      dispatch(actions.changeNoteModulator({ note, modulator, value })),
    stopNoteModulator: (note: string) =>
      dispatch(actions.stopNoteModulator({ note })),
  };
}

function mapStateToProps(state: any, ownProps: IKeyProps) {
  const { note, octave } = ownProps.note;
  return {
    active: isNoteActive(state, `${note}${octave}`),
    modulationAmount: getModulationAmount(
      state,
      `${note}${octave}`,
      "resonance"
    ),
    pitchModulation: getModulationAmount(state, `${note}${octave}`, "pitch"),
  };
}

export const Key = connect(mapStateToProps, mapDispatchToProps)(ConnectedKey);
