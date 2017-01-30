// @flow
import React, { Component } from 'react';
import styles from './Home.css';

type Props = { roomName: string };
type DefaultProps = { roomName: string };
type State = { roomName: string };

export default class Home extends Component<Props, DefaultProps, State> {
  constructor(props) {
    super(props);
    this.state = { roomName: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const lastVisited = {
      time: new Date(),
      room: this.state.roomName
    };
    let recentlyVisited = localStorage.getItem('recentlyVisited');
    if (recentlyVisited) {
      const items = JSON.parse(recentlyVisited);
      items.items.push(lastVisited);
      localStorage.setItem('recentlyVisited', JSON.stringify(items));
    } else {
      recentlyVisited = { items: [lastVisited] };
      localStorage.setItem('recentlyVisited', JSON.stringify(recentlyVisited));
    }

    localStorage.setItem('lastVisited', JSON.stringify(lastVisited));
    console.log('A room name was submitted: ' + this.state.roomName);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ roomName: event.target.value });
  }

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
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.roomName} onChange={this.handleChange} />
          <button type="submit">
            Join
          </button>
        </form>
      </div>
    );
  }
}
