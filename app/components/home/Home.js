// @flow
import React, { Component } from 'react';
import styles from './Home.css';


export default class Home extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1>
          Welcome to Chell!
        </h1>
        <br />
        <h3>
          Enter chat room name you want to join or create
        </h3>
        <form>
          <input type="text" />
          <button type="submit">
            Join
          </button>
        </form>
      </div>
    );
  }
}
