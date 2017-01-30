// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import RTC from 'rtc';
import styles from './VideoLink.css';
import rtc from '../../actions/rtc';

type Props = { muted: boolean, micOptions: Array<string>, roomName: string };
type DefaultProps = { muted: boolean, micOptions: Array<string>, roomName: string };
type State = { muted: boolean, micOptions: Array<string>, roomName: string };

class VideoLink extends Component<Props, DefaultProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      muted: props.muted,
      micOptions: props.micOptions,
      roomName: props.roomName
    };

    this.toggleMute = this.toggleMute.bind(this);
    this.optionsGenerator = this.optionsGenerator.bind(this);

    this.micSelect = this.optionsGenerator(this.state.micOptions);
  }

  componentDidMount() {
    rtc.configuration.room = this.props.location.query.roomName;
    RTC(rtc.configuration);

    const lastVisited = {
      time: new Date(),
      room: this.props.location.query.roomName
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

    {/*
    window.navigator.mediaDevices.getUserMedia({ video: true }).then(gotMedia).catch(error => console.error('getUserMedia() error:', error));

    const mediaStreamTrack = mediaStream.getVideoTracks()[0];
    mediaStreamTrack.stop();
    mediaStreamTrack.enabled = false;
    }
  }
  */}

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
        {
        <div className={styles.backButton}>
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        }
        <br />
        <div id="r-video" className={styles.rVideo} />
        <div id="l-video" className={styles.lVideo} />
      </div>
    );
  }
}

VideoLink.propTypes = {
  muted: React.PropTypes.bool,
  micOptions: React.PropTypes.instanceOf(Array),
  roomName: React.PropTypes.string
};
VideoLink.defaultProps = { muted: false, micOptions: ['opt 1', 'opt 2', 'opt 3'], roomName: '' };

export default VideoLink;
