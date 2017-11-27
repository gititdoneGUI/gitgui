import React, { Component } from 'react';
// import { connect } from 'react-redux';

export default class Branch extends Component {
  render() {
    return (
      <button className="btn btn-large btn-primary">
        <span className="icon icon-flow-branch icon-text"></span>
        Branch
      </button>
    );
  }
}

