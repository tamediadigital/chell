// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import VideoLink from './containers/VideoLink';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/videoLink" component={VideoLink} />
  </Route>
);
