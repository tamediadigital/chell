import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/home/Home';
import * as actions from '../actions/homePageActions';

// componentWillMount() {
//   const lastVisited = window.localStorage.getItem('lastVisited');
//   if (lastVisited) {
//     this.props.history.push('/videoLink', { roomName: JSON.parse(lastVisited) });
//   }
// }

const HomePage = (props) => {
  return (
    <div id="homePage">
      <Home location={props.history} />
    </div>
  );
};

HomePage.propTypes = {
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    history: state.history
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
