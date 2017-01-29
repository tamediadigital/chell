// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import VideoLink from '../videoLink/VideoLink';


export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <VideoLink />
        </div>
      </div>
    );
  }
}
