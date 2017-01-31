// @flow
import React, { Component } from 'react';
import RTC from 'rtc';
import styles from './VideoLink.css';
import rtc from '../../actions/rtc';

type Props = { muted: boolean, roomName: string };
type DefaultProps = { muted: boolean, roomName: string };
type State = { muted: boolean, roomName: string };

class VideoLink extends Component<Props, DefaultProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      muted: props.muted,
      roomName: props.roomName
    };

    this.toggleMute = this.toggleMute.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const lastVisited = {
      time: new Date(),
      room: this.props.location.query.roomName
    };

    if (localStorage.getItem('lastVisited')) {//In case of app restart, recover room name from localStorage
      lastVisited.room = JSON.parse(localStorage.getItem('lastVisited')).room;
    }

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

    /* window.navigator.mediaDevices.getUserMedia({ video: true }).then(gotMedia).catch(error => console.error('getUserMedia() error:', error));

    const mediaStreamTrack = mediaStream.getVideoTracks()[0];
    mediaStreamTrack.stop();
    mediaStreamTrack.enabled = false;
    }*/

    rtc.configuration.room = lastVisited.room;
    RTC(rtc.configuration);
  }

  toggleMute() {
    this.setState(prevState => ({
      muted: !prevState.muted
    }));
  }

  goBack() {
    window.localStorage.removeItem('lastVisited');
    this.props.history.push({}, '/');
  }

  render() {
    return (
      <div className={styles.videoHolder}>
        <div className={styles.backButton}>
          <a onClick={this.goBack}>
            <i className="fa fa-arrow-left fa-3x" />
          </a>
        </div>
        <br />
        <div id="r-video" className={styles.rVideo} />
        <div id="l-video" className={styles.lVideo} />
      </div>
    );
  }
}

VideoLink.propTypes = {
  muted: React.PropTypes.bool,
  roomName: React.PropTypes.string
};
VideoLink.defaultProps = { muted: false, roomName: '' };

export default VideoLink;
