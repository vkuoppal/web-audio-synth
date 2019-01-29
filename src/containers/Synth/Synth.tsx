import * as React from 'react';
import { Keybed } from '../../components/Keybed/Keybed';
import { Slider } from '../../components/Slider/Slider';

import { connect } from 'react-redux';

import './style.scss';

const mapStateToProps = (state: any) => {
  return { articles: state.articles };
};

const ConnectedSynth = () => {
  return (
    <div className="synth-container">
      <div className="main-panel">
        <Slider />
      </div>
      <div className="keybed-container">
        <Keybed />
      </div>
    </div>
  );
};

export const Synth = connect(mapStateToProps)(ConnectedSynth);
