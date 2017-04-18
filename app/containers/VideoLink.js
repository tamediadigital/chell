import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VideoLink from '../components/videoLink/VideoLink';
import * as VideoLinkActions from '../actions/video';

const VideoLinkPage = () => {
  return (
    <div id="videoLink">
      <VideoLink />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    videoLink: state.videoLink
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(VideoLinkActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoLinkPage);
