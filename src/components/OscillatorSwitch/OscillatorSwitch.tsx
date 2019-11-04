import * as React from "react";

import { connect } from "react-redux";
import "./style.scss";
import { changeOscillatorType } from "../../actions/index";

export enum Waveform {
  Square = "square",
  Triangle = "triangle",
  Sine = "sine",
  Sawtooth = "sawtooth",
  Custom = "custom"
}

export interface OscillatorSwitchProps {
  waveform: Waveform;
}

function drawSine(context: CanvasRenderingContext2D) {
  const l = 100; // length
  const tf = l * 2 / 5; // two fifths of length


  context.beginPath();

  context.moveTo(0, 0);
  context.bezierCurveTo(tf, -(l - tf), l - tf, l - tf, l, 0);
  context.lineWidth = 12;

  context.strokeStyle = "rgb(0, 255, 92)";

  context.lineWidth = 28;

  context.stroke();
}

function drawSquare(context: CanvasRenderingContext2D) {
  context.beginPath();

  context.lineWidth = 28;
  context.strokeStyle = "rgb(0, 0, 0)";

  context.lineTo(10, 145);
  context.lineTo(150, 10);
  context.lineTo(290, 145);
  context.stroke();

  context.beginPath();
  context.lineWidth = 12;

  context.strokeStyle = "rgb(181, 82, 255)";
  context.lineTo(15, 141);

  context.lineTo(150, 11);
  context.lineTo(285, 141);
  context.stroke();
}

function drawTriangle(context: CanvasRenderingContext2D) {
  context.beginPath();

  context.lineWidth = 28;
  context.strokeStyle = "rgb(0, 0, 0)";

  context.lineTo(10, 145);
  context.lineTo(150, 10);
  context.lineTo(290, 145);
  context.stroke();

  context.beginPath();
  context.lineWidth = 12;

  context.strokeStyle = "rgb(181, 82, 92)";
  context.lineTo(15, 141);

  context.lineTo(150, 11);
  context.lineTo(285, 141);
  context.stroke();
}

function drawSawtooth(context: CanvasRenderingContext2D) {
  context.beginPath();

  context.lineWidth = 28;
  context.strokeStyle = "rgb(0, 0, 0)";

  context.lineTo(10, 145);
  context.lineTo(150, 10);
  context.lineTo(290, 145);
  context.stroke();

  context.beginPath();
  context.lineWidth = 12;

  context.strokeStyle = "rgb(181, 255, 32)";
  context.lineTo(15, 141);

  context.lineTo(150, 11);
  context.lineTo(285, 141);
  context.stroke();
}

function drawCustom(context: CanvasRenderingContext2D) {
  context.beginPath();

  context.lineWidth = 28;
  context.strokeStyle = "rgb(0, 0, 0)";

  context.lineTo(10, 145);
  context.lineTo(150, 10);
  context.lineTo(290, 145);
  context.stroke();

  context.beginPath();
  context.lineWidth = 12;

  context.strokeStyle = "rgb(14, 55, 222)";
  context.lineTo(15, 141);

  context.lineTo(150, 11);
  context.lineTo(285, 141);
  context.stroke();
}

export interface OscillatorSwitchState {
  selectedWaveform: Waveform;
}

function mapDispatchToProps(dispatch: Function) {
  return {
    changeOscillatorType: (state: OscillatorSwitchState) =>
      dispatch(changeOscillatorType(state))
  };
}

class ConnectedOscillatorSwitch extends React.Component<
  any,
  OscillatorSwitchState
  > {
  constructor({ }) {
    super({});
    this.state = { selectedWaveform: Waveform.Triangle };
    this.context = null;
  }

  componentDidMount() {
    const canvas = this.refs.canvas as HTMLCanvasElement;
    this.context = canvas.getContext("2d");
    this.drawWaveform();
  }

  componentDidUpdate() {
    const canvas = this.refs.canvas as HTMLCanvasElement;
    this.context = canvas.getContext("2d");
    this.drawWaveform();
    this.props.changeOscillatorType({
      oscillatorType: this.state.selectedWaveform
    });
  }

  changeWaveform = () => {
    if (!this.context) {
      return;
    }
    const { selectedWaveform } = this.state;

    if (selectedWaveform === Waveform.Sine) {
      this.setState({ selectedWaveform: Waveform.Triangle });
    } else if (selectedWaveform === Waveform.Triangle) {
      this.setState({ selectedWaveform: Waveform.Square });
    } else if (selectedWaveform === Waveform.Square) {
      this.setState({ selectedWaveform: Waveform.Sawtooth });
    } else if (selectedWaveform === Waveform.Sawtooth) {
      this.setState({ selectedWaveform: Waveform.Custom });
    } else if (selectedWaveform === Waveform.Custom) {
      this.setState({ selectedWaveform: Waveform.Sine });
    }
  };

  drawWaveform() {
    switch (this.state.selectedWaveform) {
      case Waveform.Sine:
        drawSine(this.context);
        break;
      case Waveform.Triangle:
        drawTriangle(this.context);
        break;
      case Waveform.Square:
        drawSquare(this.context);
        break;
      case Waveform.Sawtooth:
        drawSawtooth(this.context);
        break;
      case Waveform.Custom:
        drawCustom(this.context);
        break;
      default:
        drawSine(this.context);
    }
  }

  render() {
    return (
      <div className="oscillator-switch" onTouchStart={this.changeWaveform}>
        <canvas className="waveform-canvas" ref="canvas" />
      </div>
    );
  }
}

export const OscillatorSwitch = connect(
  null,
  mapDispatchToProps
)(ConnectedOscillatorSwitch);
