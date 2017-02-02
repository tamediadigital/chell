import React, { Component } from 'react';
import RTC from 'rtc';
import styles from './VideoLink.css';
import rtc from '../../actions/rtc';

type Props = { mute: boolean, roomName: string };
type DefaultProps = { mute: boolean, roomName: string };
type State = { mute: boolean, roomName: string };

let RTCobj = {};

class VideoLink extends Component<Props, DefaultProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      mute: props.mute,
      roomName: props.roomName
    };

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

    /*
    var audioContext = new AudioContext();
    var gain = audioContext.createGain();
    window.navigator.mediaDevices.getUserMedia({ audio: true }).then(gotMedia).catch(error => console.error('getUserMedia() error:', error));
    function gotMedia(stream){
      var sourceStream = audioContext.createMediaStreamSource(stream);
      sourceStream.connect(gain);
      gain.connect(audioContext.destination);
      gain.value = 0;
    }

    var localStream = stream.getAudioTracks();
    localStream[0].enabled = false;
    localStream[0].stop();
    return localStream[0];

    */

    rtc.configuration.room = lastVisited.room;
    RTCobj = RTC(rtc.configuration);

    RTCobj.once('connected', () => {
      console.log('we have successfully connected');
      RTCobj.send('/greet', 'hello connected');
    });

    RTCobj.on('message:greet', (text) => {
      console.log('##############signaller sends greeting: ', text);
    });

    RTCobj.on('message:command', (data, id) => {
      let video = document.querySelectorAll('[data-peer=' + id.id + ']')[0];
      console.log(video);
      video.volume = video.volume ? 0 : 1;
    });

    RTCobj.on('peer:connected', (id) => {
      console.log('peer ', id, ' has connected');
    });

    RTCobj.on('disconnected', (id) => {
      console.log(id, ' is disconnected at the moment!');
    });
  }

  goBack() {
    window.localStorage.removeItem('lastVisited');
    this.props.history.push({}, '/');
  }

  props: {
    toggleMute: () => void
  }

  render() {
    const { toggleMute } = this.props;
    return (
      <div className={styles.videoHolder}>
        <div className={styles.backButton}>
          <a onClick={this.goBack} className={styles.goBack}>
            <i className="fa fa-arrow-left fa-3x" />
          </a>
          <button onClick={() => toggleMute(RTCobj)} className={styles.muteButton}>
            {this.state.mute ? 'Unmute' : 'Mute'}
          </button>
        </div>
        <div id="r-video" className={styles.rVideo} />
        <div id="l-video" className={styles.lVideo} />
      </div>
    );
  }
}

VideoLink.propTypes = {
  mute: React.PropTypes.bool,
  roomName: React.PropTypes.string
};
VideoLink.defaultProps = { mute: false, roomName: '' };

export default VideoLink;
