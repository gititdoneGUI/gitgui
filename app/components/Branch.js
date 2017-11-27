import React, { Component } from 'react';
import {openDialogBox} from '../reducers/branches';
// import { connect } from 'react-redux';
// const {dialog} = require('electron').remote

const mapState = ({ repo, status, commit, userPath, branch }) => ({ repo, status, commit, userPath, branch});
const mapDispatch = (dispatch) => {
  return {
    openDialogBox: () =>
      dispatch(openDialogBox())
  };
};


export default class Branch extends Component {
  render() {
    return (
      <button className="btn btn-large btn-primary"  onClick={this.props.openDialogBox}>
        <span className="icon icon-flow-branch icon-text"></span>
        Branch
      </button>
    );
  }
}

export default connect(mapState, mapDispatch)(Branch);

