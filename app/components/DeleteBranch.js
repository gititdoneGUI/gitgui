import React, { Component } from 'react';
import {openDialogBox} from '../reducers/branches';
// import { connect } from 'react-redux';
// const {dialog} = require('electron').remote



export default class DeleteBranch extends Component {
  render() {
    return (
      <button className="btn btn-large btn-primary">
        <span className="icon icon-flow-branch icon-text"></span>
        Delete Branch
      </button>
    );
  }
}


