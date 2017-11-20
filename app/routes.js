import React from 'react';
import { Switch, Route } from 'react-router';
import Data from './components/Data'
// import LoginPage from './containers/LoginPage';
import LoggedInPage from './containers/LoggedInPage';


export default (
  <Switch>
<<<<<<< HEAD
    <Route exact path="/" component={LoginPage} />
     <Route exact path="/login" component={LoggedInPage} /> 
=======
    <Route exact path="/" component={Data} />
>>>>>>> origin/master
    <Route exact path="/loggedin" component={LoggedInPage} />
  </Switch>
);
