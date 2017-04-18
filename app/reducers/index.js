// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import video from './video';
import history from './history';

const rootReducer = combineReducers({
  history,
  video,
  routing
});

export default rootReducer;
