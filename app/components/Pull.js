import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pull } from '../reducers/pull';
import { getAllRemoteBranches } from '../reducers/remoteBranch';

class Pull extends Component {

  constructor(props) {
    super(props);
    this.state={
      clicked: false,
      value: ''
    };
    this.handlePullClick = this.handlePullClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.userPath !== newProps.userPath) {
      this.props.getAllRemoteBranches(newProps.userPath);
      this.setState({
        clicked: false,
      });
    }
  }

  handlePullClick(event) {
    event.preventDefault();
    pull(this.props.userPath, this.state.value);
    this.setState({clicked: false});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({clicked: true});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        { !this.state.clicked && <button className="btn btn-mini btn-primary" onClick={this.handleSubmit}>
          <span className="icon icon-down icon-text"></span>
        Pull
        </button>}
        { this.state.clicked &&
        <form onSubmit={this.handlePullClick}>
          <label>Remote Branch to Pull From: </label>
          <select value = {this.state.value} onChange={this.handleChange}>
            <option></option>
            {
              this.props.remoteBranch.map((branch) =>
                <option key={branch} value={branch}>{branch}</option>
              )
            }
          </select>
          <button type="submit" className="btn btn-mini btn-primary">
            <span className="icon icon-down-circled icon-text"></span>
         Pull
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
    getAllRemoteBranches: (path) =>
      dispatch(getAllRemoteBranches(path))
  };
};

export default connect(mapState, mapDispatch)(Pull);
