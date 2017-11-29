import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllLocalBranches } from '../reducers/localBranch';
import { getAllRemoteBranches } from '../reducers/remoteBranch';

class BranchRemoteLists extends Component{
  render() {
    return (
      <div>
        <div>
          <form id="branches-dropdown">
            <label>Local Branches</label>
            <select >
              {
                this.props.localBranch.map((branch) =>
                  <option key={branch} value={branch}>{branch}</option>
                )
              }
            </select>
          </form>
        </div>
        <div>
          <label>Remote Branches</label>
          <form id="branches-dropdown">
            <select>
              {
                this.props.remoteBranch.map((branch) =>
                  <option key={branch} value={branch}>{branch}</option>
                )
              }
            </select>
          </form>
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
