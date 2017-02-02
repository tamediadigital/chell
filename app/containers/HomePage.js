// @flow
import React, { Component } from 'react';
import Home from '../components/home/Home';

export default class HomePage extends Component {
  componentWillMount() {
    const lastVisited = window.localStorage.getItem('lastVisited');
    if (lastVisited) {
      this.props.history.push('/videoLink', { roomName: JSON.parse(lastVisited) });
    }
  }

  render() {
    return (
      <Home />
    );
  }
}
