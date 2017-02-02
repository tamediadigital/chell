// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import video from './video';

const rootReducer = combineReducers({
  counter,
  video,
  routing
});

export default rootReducer;
