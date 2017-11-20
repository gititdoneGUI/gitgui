import React, { Component } from 'react';
import TestGraph from './Test';

export default class LoggedIn extends Component {
  render() {
    return (
      <div>
        <h2>Logged in as {this.props.user.username}</h2>
        <TestGraph />
      </div>
    );
  }
}
