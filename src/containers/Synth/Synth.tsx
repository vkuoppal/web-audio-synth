import * as React from "react";
import { Keybed } from "../../components/Keybed/Keybed";
import { Slider } from "../../components/Slider/Slider";
import { Oscilloscope } from "../../components/Oscilloscope/Oscilloscope";
import { Envelope } from "./../Envelope/Envelope";
import { Filter } from "./../Filter/Filter";

import { connect } from "react-redux";

import "./style.scss";

const ConnectedSynth = () => {
  return (
    <div className="synth-container">
      <div className="main-panel">
        <Slider name="gain" />
        <Filter />
        <Envelope />
        <Oscilloscope />
      </div>
      <div className="keybed-container">
        <Keybed />
      </div>
    </div>
  );
};

export const Synth = connect()(ConnectedSynth);
