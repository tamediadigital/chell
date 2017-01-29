// @flow
import React, { Component } from 'react';
import RTC from 'rtc';
import styles from './VideoLink.css';
import rtc from '../../actions/rtc';

type Props = { muted: boolean, micOptions: Array<string> };
type DefaultProps = { muted: boolean, micOptions: Array<string> };
type State = { muted: boolean, micOptions: Array<string> };

export default class VideoLink extends Component<Props, DefaultProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      muted: props.muted,
      micOptions: props.micOptions
    };

    this.toggleMute = this.toggleMute.bind(this);
    this.optionsGenerator = this.optionsGenerator.bind(this);

    this.micSelect = this.optionsGenerator(this.state.micOptions);
  }

  componentDidMount() {
    RTC(rtc.configuration);
  }

  toggleMute() {
    this.setState(prevState => ({
      muted: !prevState.muted
    }));
  }

  optionsGenerator(arr) {
    return arr.map((number) =>
      <option key={number} value={number}>{number}</option>
    );
  }

  render() {
    return (
      <div className={styles.videoHolder}>
        <div id="r-video" className={styles.rVideo} />
        <div id="l-video" className={styles.lVideo} />

        {/*
        <select name="" id="audioSource">
          {this.micSelect}
         </select>
         <select name="" id="videoSource" />

        <button onClick={this.toggleMute}>
          {this.state.muted ? 'UNMUTE' : 'MUTE'}
        </button>
        */}
      </div>
    );
  }
}
VideoLink.propTypes = {
  muted: React.PropTypes.bool,
  micOptions: React.PropTypes.instanceOf(Array)
};
VideoLink.defaultProps = { muted: false, micOptions: ['opt 1', 'opt 2', 'opt 3'] };
