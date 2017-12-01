import React, { Component } from 'react';
import { connect } from 'react-redux';
import { branch } from '../reducers/localBranch';
import { remoteBranch } from '../reducers/remoteBranch';

class Branch extends Component {

  constructor(props) {
    super(props);
    this.handleBranchClick = this.handleBranchClick.bind(this);
    this.handleremoteBranchClick = this.handleremoteBranchClick.bind(this);
  }

  handleBranchClick(event) {
    event.preventDefault();
    this.props.localbranch(this.props.userPath);
  }

  handleremoteBranchClick(event) {
    event.preventDefault();
    this.props.remotebranch(this.props.userPath);
  }

  render() {
    return (
      <div>
        <button id="local-branch-button" className="btn btn-large btn-primary"  onClick={this.handleBranchClick}>
          <span className="icon icon-flow-branch icon-text"></span>
        Local Branches
        </button>
        <button className="btn btn-large btn-primary"  onClick={this.handleremoteBranchClick}>
          <span className="icon icon-flow-branch icon-text"></span>
        Remote Branches
        </button>
      </div>
    );
  }
}

const mapState = ({userPath }) => ({
  userPath
});

const mapDispatch = (dispatch) => {
  return {
    localbranch: (path) =>
      dispatch(branch(path)),
    remotebranch: (path) =>
      dispatch(remoteBranch(path))
  };
};

export default connect(mapState, mapDispatch)(Branch);
