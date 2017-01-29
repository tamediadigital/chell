// @flow
import React, { Component } from 'react';
import RTC from 'rtc';
import styles from './VideoLink.css';
import rtc from '../../actions/rtc';


export default class VideoLink extends Component {
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
