import React from 'react';
import { Switch, Route } from 'react-router';
// import Data from './components/Data';
import LoginPage from './containers/LoginPage';
import LoggedInPage from './containers/LoggedInPage';
import CommitGraph from './components/Graph';
import Header from './components/Header';
import * as qs from 'querystring';

export default (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/loggedin" component={LoggedInPage} />
      <Route exact path="/graph" component={
        ({location: {search}}) =>
          <CommitGraph root={qs.parse(search.substr(1)).root} />
      }/>
    </Switch>
  </div>
);
