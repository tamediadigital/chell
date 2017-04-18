import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
      recentlyVisitedList: ''
    };

    const recentlyVisited = localStorage.getItem('recentlyVisited');
    if (recentlyVisited) {
      const items = JSON.parse(recentlyVisited);
      this.state.recentlyVisitedList = items.items.map((item) => {
        return <li key={item.time}>{item.room} <i>at</i> {item.time}</li>;
      });
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    console.log('A room name was submitted: ' + this.state.roomName);

    if (this.state.roomName !== '') {
      console.log('New room name set!');
    }
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
          Enter chat room name You want to join or create
        </h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.roomName} onChange={this.handleChange} required />

          <Link to={{ pathname: '/videoLink', query: { roomName: this.state.roomName } }}>
            <button type="submit">
                Join
            </button>
          </Link>
        </form>
        <h4>
          Recently visited rooms:

          <ul>
            {this.state.recentlyVisitedList}
          </ul>
        </h4>
      </div>
    );
  }
}
