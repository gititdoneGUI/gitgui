import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllLocalBranches } from '../reducers/localBranch';
import { getAllRemoteBranches } from '../reducers/remoteBranch';
import { mergeFromTo } from '../reducers/merge';
import { pull } from '../reducers/pull';


class Merge extends Component {

  constructor(props) {
    super(props);
    this.state={
      mergeClicked: false,
      mergeLocalClicked: false,
      mergeRemoteClicked: false,
      from: '',
      to: '',
      remote: ''
    };
    this.handleMergeClick = this.handleMergeClick.bind(this);
    this.handleLocalClick = this.handleLocalClick.bind(this);
    this.handleRemoteClick = this.handleRemoteClick.bind(this);


    this.handleLocalMerge = this.handleLocalMerge.bind(this);
    this.handleRemoteMerge = this.handleRemoteMerge.bind(this);

    this.handleChange= this.handleChange.bind(this);
    this.handleChangeFrom= this.handleChangeFrom.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);

  }


  componentWillReceiveProps(newProps) {
    if (this.props.userPath !== newProps.userPath) {
      this.props.getAllLocalBranches(newProps.userPath);
      this.props.getAllRemoteBranches(newProps.userPath);
      this.setState({
        mergeClicked: false,
        mergeLocalClicked: false,
        mergeRemoteClicked: false

      });
    }
  }

  handleLocalMerge(event) {
    event.preventDefault();
    mergeFromTo(this.props.userPath, this.state.from, this.state.to);
    this.props.getAllLocalBranches(this.props.userPath);
    this.setState({
      mergeClicked: false,
      mergeLocalClicked: false,
    });
  }

  handleRemoteMerge(event) {
    event.preventDefault();
    pull(this.props.userPath, this.state.remote);
    this.props.getAllRemoteBranches(this.props.userPath);
    this.setState({
      mergeClicked: false,
      mergeRemoteClicked: false,
    });
  }
  handleChange(event) {
    this.setState({remote: event.target.value});
  }

  handleChangeFrom(event) {
    this.setState({from: event.target.value});
  }

  handleChangeTo(event) {
    this.setState({to: event.target.value});
  }

  handleMergeClick(event) {
    event.preventDefault();
    this.setState({mergeClicked: true});
  }

  handleLocalClick(event) {
    event.preventDefault();
    this.setState({
      mergeLocalClicked: true,
      mergeRemoteClicked: false
    });
  }

  handleRemoteClick(event) {
    event.preventDefault();
    this.props.getAllRemoteBranches(this.props.userPath);
    this.setState({
      mergeLocalClicked: false,
      mergeRemoteClicked: true
    });  }

  render() {
    return (
      <div>
        { !this.state.mergeClicked && <button className="btn btn-mini btn-primary" onClick={this.handleMergeClick}>
          <span className="icon icon-switch icon-text"></span>
        Merge
        </button>}
        { this.state.mergeClicked &&
        <div>
          <button className="btn btn-mini btn-primary" onClick={this.handleLocalClick}>
            <span className="icon icon-switch icon-text"></span>
            Merge Local Branches
          </button>

          <button className="btn btn-mini btn-primary" onClick={this.handleRemoteClick}>
            <span className="icon icon-switch icon-text"></span>
            Merge From Remote Branch
          </button>
        </div>
        }

        { this.state.mergeClicked && this.state.mergeLocalClicked &&
          <form  className="form-group" onSubmit={this.handleLocalMerge}>
            <label>Merge From: </label>
            <select value = {this.state.from} onChange={this.handleChangeFrom}>
              <option></option>
              {
                this.props.localBranch.map((branch) =>
                  <option key={branch} value={branch}>{branch}</option>
                )
              }
            </select>
            <label>Merge To: </label>
            <select value = {this.state.to} onChange={this.handleChangeTo}>
              <option></option>
              {
                this.props.localBranch.map((branch) =>
                  <option key={branch} value={branch}>{branch}</option>
                )
              }
            </select>
            <button type="submit" className="btn btn-mini btn-primary">
              <span className="icon icon-switch icon-text"></span>
            Merge
            </button>
          </form>
        }

        { this.state.mergeClicked && this.state.mergeRemoteClicked &&
          <form  className="form-group" onSubmit={this.handleRemoteMerge}>
            <label>Branch to Merge with Current: </label>
            <select value = {this.state.remote} onChange={this.handleChange}>
              <option></option>
              {
                this.props.remoteBranch.map((branch) =>
                  <option key={branch} value={branch}>{branch}</option>
                )
              }
            </select>

            <button type="submit" className="btn btn-mini btn-primary">
              <span className="icon icon-switch icon-text"></span>
            Merge
            </button>
          </form>
        }
      </div>
    );

  }
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
export default connect(mapState, mapDispatch)(Merge);





