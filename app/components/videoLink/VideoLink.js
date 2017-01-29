// @flow
import React, { Component } from 'react';
import styles from './VideoLink.css';
import rtc from '../../actions/rtc';


export default class VideoLink extends Component {
  render() {
    console.log(rtc);
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
