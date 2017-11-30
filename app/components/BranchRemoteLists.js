import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllLocalBranches } from '../reducers/localBranch';
import { getAllRemoteBranches } from '../reducers/remoteBranch';

class BranchRemoteLists extends Component{
  constructor(){
    super();
    this.state={
      dropdownLocal: false,
      dropdownRemote: false
    }
  }
  render() {
    return (
      <div>
        <div>

            <button id="local-branches-button" onClick={() => this.setState((prevState) => {
              console.log(prevState.dropdownLocal)
              return {dropdownLocal: !prevState.dropdownLocal};
            })}>
            <h5>Local Branches: {this.props.localBranch.length} ⌵</h5>
            </button>
              {
                this.state.dropdownLocal ? (<ul id="local-branches-list">{this.props.localBranch.map((branch) =>
                  <li key={branch} value={branch}>{branch}</li>)}</ul>)
                 : ''
              }
        </div>
        <div>
          <button id="remote-branches-button" onClick={() => this.setState((prevState) => {
            console.log(prevState.dropdownRemote);

            return {dropdownRemote: !prevState.dropdownRemote};
          })}>
          <h5>Remote Branches: {this.props.remoteBranch.length} ⌵</h5>
          </button>
              {
                this.state.dropdownRemote ? (<ul id="remote-branches-list">{this.props.remoteBranch.map((branch) =>
                  <li key={branch} value={branch}>{branch}</li>)}</ul>) : ''
              }
        </div>
      </div>
    );}
}

const mapState = ({userPath, localBranch, remoteBranch}) => ({ userPath, localBranch, remoteBranch});
const mapDispatch = (dispatch) => {
  return {
    getAllLocalBranches: (path) =>
      dispatch(getAllLocalBranches(path)),
    getAllRemoteBranches: (path) =>
      dispatch(getAllRemoteBranches(path))

  };
};

export default connect(mapState, mapDispatch)(BranchRemoteLists);
