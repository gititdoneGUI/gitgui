import React, { Component } from 'react';
import Data from './Data';

export default class LoggedIn extends Component {
  render() {
    return (
      <div>
        <h2>Logged in as {this.props.user.username}</h2>
        <Data />
      </div>
    );
  }
}
