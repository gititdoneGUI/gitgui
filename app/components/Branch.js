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
    // console.log(branch(this.props.userPath));
    this.props.localbranch(this.props.userPath);
  }

  handleremoteBranchClick(event) {
    event.preventDefault();
    // console.log(branch(this.props.userPath));
    this.props.remotebranch(this.props.userPath);
  }



  render() {
    return (
      <div>
      <div>
        <button className="btn btn-large btn-primary"  onClick={this.handleBranchClick}>
          <span className="icon icon-flow-branch icon-text"></span>
        Local Branches
        </button>
        </div>
        <div>
        <button className="btn btn-large btn-primary"  onClick={this.handleremoteBranchClick}>
          <span className="icon icon-flow-branch icon-text"></span>
        Remote Branches
        </button>
        </div>
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

