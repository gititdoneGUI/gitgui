import React, { Component } from 'react';
// import { connect } from 'react-redux';

export default class Stash extends Component {
  render() {
    return (
      <button className="btn btn-large btn-primary">
        <span className="icon icon-pause icon-text"></span>
        Stash
      </button>
    );
  }
}

