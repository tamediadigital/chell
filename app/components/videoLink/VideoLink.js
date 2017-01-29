// @flow
import React, { Component } from 'react';
import RTC from 'rtc';
import styles from './VideoLink.css';
import rtc from '../../actions/rtc';

type Props = { muted: boolean };
type DefaultProps = { muted: boolean };
type State = { muted: boolean };

export default class VideoLink extends Component<Props, DefaultProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = { muted: props.muted };
  }
  componentDidMount() {
    RTC(rtc.configuration);
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <div className="video-holder">
            <div id="r-video" />
            <div id="l-video" />

            <select name="" id="audioSource" />
            <select name="" id="audioOutput" />
            <select name="" id="videoSource" />
          </div>
        </div>
      </div>
    );
  }
}
VideoLink.propTypes = { muted: React.PropTypes.bool };
VideoLink.defaultProps = { muted: false };
